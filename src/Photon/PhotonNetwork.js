import { PacketBuilder, createPacket } from '../MeowEngine/Photon/protocol_reader/PacketBuilder';
import { EventCaching } from "./Enums/EventCaching";
import { ReceiverGroup } from "./Enums/ReceiverGroup";
import { RaiseEventOptions } from "./StaticDefinitions/RaiseEventOptions";
import { SendOptions } from "./StaticDefinitions/SendOptions";
import { PacketType, DataType, ParameterCode, OperationCode } from '../MeowEngine/Photon/protocol_reader/constants';

/**
 * Creates a new PhotonClient instance.
 * @param {Object} options - The configuration options.
 * @param {Function} options.originalSend - The original send function to use.
 * @param {WebSocket} options.socket - The WebSocket connection to use.
 */
export class PhotonClient {
    constructor({ originalSend, socket }) {
        this.opParameters = new Map();
        this.socket = socket;
        this.originalSend = originalSend;
        this.packetBuilder = new PacketBuilder();
        this.viewIdCounter = 1;
        this.photonView = {
            Owner: {
                ActorNumber: 1 // Default value, should be set later on when connecting to an instance
            }
        };
    }

    /**
     * Sends an operation to the Photon server
     * @param {number} operationCode - The operation code
     * @param {Map<number, any>} parameters - The parameters for the operation
     * @param {SendOptions} sendOptions - Options for the send operation
     * @returns {boolean} True if operation was sent successfully
     */
    SendOperation(operationCode, parameters, sendOptions) {
        try {
            // Create a new packet builder
            const builder = createPacket().operation(operationCode);
            
            // Add each parameter
            for (const [key, value] of parameters.entries()) {
                builder.withParam(key, value);
            }
            
            // Build the packet
            const packet = builder.build();
            
            // Send the packet
            if (this.originalSend) {
                this.originalSend(packet);
            } else if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(packet);
            } else {
                console.error("No valid send method available");
                return false;
            }
            
            return true;
        } catch (error) {
            console.error("Error sending operation:", error);
            return false;
        }
    }

    /**
     * Raises an event to be sent to other clients or cached for new clients
     * @param {number} eventCode - Identifies the type of event
     * @param {Object} customEventContent - The custom content/data to be sent with the event
     * @param {RaiseEventOptions} raiseEventOptions - Options that control the behavior of the event
     * @param {SendOptions} sendOptions - Options for the send operation
     * @returns {boolean} True if operation was sent successfully
     */
    OpRaiseEvent(eventCode, customEventContent, raiseEventOptions, sendOptions) {
        // Clear the parameters map for reuse
        this.opParameters.clear();
        
        if (raiseEventOptions) {
            // Handle caching options
            if (raiseEventOptions.CachingOption !== EventCaching.DoNotCache) {
                this.opParameters.set(ParameterCode.Cache, raiseEventOptions.CachingOption);
            }
            
            // Handle different caching cases
            switch (raiseEventOptions.CachingOption) {
                case EventCaching.SliceSetIndex:
                case EventCaching.SlicePurgeIndex:
                case EventCaching.SlicePurgeUpToIndex:
                    // In the original code, there's a commented section about CacheSliceIndex
                    // and then immediately returns with SendOperation call
                    return this.SendOperation(OperationCode.RaiseEvent, this.opParameters, sendOptions);
                    
                case EventCaching.SliceIncreaseIndex:
                case EventCaching.RemoveFromRoomCacheForActorsLeft:
                    return this.SendOperation(OperationCode.RaiseEvent, this.opParameters, sendOptions);
                    
                case EventCaching.RemoveFromRoomCache:
                    if (raiseEventOptions.TargetActors) {
                        this.opParameters.set(ParameterCode.ActorList, raiseEventOptions.TargetActors);
                    }
                    break;
                    
                default:
                    if (raiseEventOptions.TargetActors) {
                        this.opParameters.set(ParameterCode.ActorList, raiseEventOptions.TargetActors);
                    } 
                    else if (raiseEventOptions.InterestGroup !== 0) {
                        this.opParameters.set(ParameterCode.Group, raiseEventOptions.InterestGroup);
                    } 
                    else if (raiseEventOptions.Receivers !== ReceiverGroup.Others) {
                        this.opParameters.set(ParameterCode.ReceiverGroup, raiseEventOptions.Receivers);
                    }
                    
                    if (raiseEventOptions.Flags && raiseEventOptions.Flags.HttpForward) {
                        this.opParameters.set(ParameterCode.EventForward, raiseEventOptions.Flags.WebhookFlags);
                    }
                    break;
            }
        }
        
        // Add event code parameter
        this.opParameters.set(ParameterCode.Code, eventCode);
        
        // Add custom event content if provided
        if (customEventContent !== null && customEventContent !== undefined) {
            this.opParameters.set(ParameterCode.Data, customEventContent);
        }
        
        // Send the operation
        return this.SendOperation(OperationCode.RaiseEvent, this.opParameters, sendOptions);
    }

    /**
     * Gets the next view ID for network object instantiation
     * @returns {number} The next available view ID
     */
    GetNextViewId() {
        return this.viewIdCounter++;
    }

    /**
     * Serializes a Vector3 object for network transmission
     * @param {Object} vector3 - The Vector3 to serialize
     * @returns {Object} Serialized representation
     */
    SerializeVector3(vector3) {
        return {
            x: vector3.x || 0,
            y: vector3.y || 0,
            z: vector3.z || 0
        };
    }

    /**
     * Serializes a Quaternion object for network transmission
     * @param {Object} quaternion - The Quaternion to serialize
     * @returns {Object} Serialized representation
     */
    SerializeQuaternion(quaternion) {
        return {
            x: quaternion.x || 0,
            y: quaternion.y || 0,
            z: quaternion.z || 0,
            w: quaternion.w || 1
        };
    }

    /**
     * Alternative implementation using the OpRaiseEvent method
     * @param {number} viewID - The view ID of the object to transfer ownership of
     * @param {number} playerID - The player ID of the new owner
     * @returns {boolean} True if the operation was sent successfully
     */
    TransferOwnership(viewID, playerID) {        
        // Create event options - set receivers to All
        const eventOptions = new RaiseEventOptions();
        eventOptions.Receivers = ReceiverGroup.All;
        
        // Create send options - set to reliable
        const sendOptions = new SendOptions();
        sendOptions.Reliability = true;
        
        // PunEvent.OwnershipTransfer is 210
        const ownershipTransferEventCode = 210;
        
        const data = [viewID, playerID];
        
        return this.OpRaiseEvent(ownershipTransferEventCode, data, eventOptions, sendOptions);
    }

    /**
     * Instantiates a prefab on all clients in the room
     * @param {string} prefabName - The name of the prefab to instantiate
     * @param {Vector3} position - The position to instantiate at
     * @param {Quaternion} rotation - The rotation to instantiate with
     * @param {number} group - The group this object belongs to
     * @param {object} customData - Any additional custom data to include
     * @returns {boolean} Whether the event was sent successfully
     */
    Instantiate(prefabName, position, rotation, group, customData) {
        // Validate inputs
        if (!prefabName || typeof prefabName !== 'string') {
            console.error("Invalid prefab name");
            return false;
        }
        
        // Create event options with proper receivers
        const eventOptions = new RaiseEventOptions();
        eventOptions.Receivers = ReceiverGroup.All;
        
        // Create send options for reliability
        const sendOptions = new SendOptions();
        sendOptions.Reliability = true;
        
        // Use the correct event code for instantiation
        // Photon's instantiate event is typically code 202
        const instantiateEventCode = 202;
        
        // Create the content to send
        // We need to format the data properly for network transmission
        const networkData = {
            prefabName: prefabName,
            position: this.SerializeVector3(position),
            rotation: this.SerializeQuaternion(rotation),
            groupId: group || 0,
            data: customData || null,
            viewId: this.GetNextViewId(), // Generate a unique view ID
            ownerId: this.photonView.Owner.ActorNumber // Current actor number as owner
        };
        
        // Send the event to all clients including ourselves
        return this.OpRaiseEvent(
            instantiateEventCode,
            networkData,
            eventOptions,
            sendOptions
        );
    }

    /**
     * Creates a direct packet using the PacketBuilder
     * @param {number} operationCode - The operation code
     * @param {Object} parameters - Parameters to include in the packet
     * @returns {Buffer} The constructed packet
     */
    CreateDirectPacket(operationCode, parameters) {
        // Create a new packet builder
        const builder = createPacket().operation(operationCode);
        
        // Add each parameter
        for (const [key, value] of Object.entries(parameters)) {
            // Determine the type and add appropriately
            if (typeof value === 'string') {
                builder.withString(Number(key), value);
            } else if (typeof value === 'number') {
                if (Number.isInteger(value)) {
                    builder.withInteger(Number(key), value);
                } else {
                    builder.withFloat(Number(key), value);
                }
            } else if (typeof value === 'boolean') {
                builder.withBoolean(Number(key), value);
            } else if (Array.isArray(value)) {
                // Handle different array types
                if (value.length === 0) {
                    builder.withObjectArray(Number(key), []);
                } else if (typeof value[0] === 'string') {
                    builder.withStringArray(Number(key), value);
                } else if (typeof value[0] === 'number' && value.every(item => Number.isInteger(item))) {
                    builder.withIntArray(Number(key), value);
                } else {
                    builder.withObjectArray(Number(key), value);
                }
            } else if (value === null || value === undefined) {
                builder.withNull(Number(key));
            } else if (typeof value === 'object') {
                builder.withHashtable(Number(key), value);
            }
        }
        
        // Build and return the packet
        return builder.build();
    }

    /**
     * Leaves the current room
     * @param {boolean} willComeBack - Whether the client intends to come back
     * @returns {boolean} True if the leave operation was sent successfully
     */
    LeaveRoom(willComeBack = false) {
        const parameters = {
            254: this.photonView.Owner.ActorNumber, // ActorNr
            233: willComeBack // IsInactive (optional)
        };
        
        try {
            const packet = this.CreateDirectPacket(OperationCode.Leave, parameters);
            
            if (this.originalSend) {
                this.originalSend(packet);
            } else if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(packet);
            } else {
                console.error("No valid send method available");
                return false;
            }
            
            return true;
        } catch (error) {
            console.error("Error leaving room:", error);
            return false;
        }
    }
}

// Example usage:
// In a browser environment with Photon client:
// const client = new PhotonClient({ socket: webSocket });
// client.TransferOwnership(1, 2001);

// Export the client and enums
export default { 
    PhotonClient, 
    OperationCode, 
    ParameterCode, 
    RaiseEventOptions, 
    SendOptions, 
    EventCaching, 
    ReceiverGroup 
};