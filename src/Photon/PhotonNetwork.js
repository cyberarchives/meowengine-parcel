/*
    Wonky way to do things, but if it works, it works
*/

import { EventCaching } from "./Enums/EventCaching";
import { ReceiverGroup } from "./Enums/ReceiverGroup";
import { RaiseEventOptions } from "./StaticDefinitions/RaiseEventOptions";
import { SendOptions } from "./StaticDefinitions/SendOptions";
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
                this.opParameters.set(ParameterCode.Cache, PhotonPacketBuilder.types.byte(raiseEventOptions.CachingOption));
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
                        this.opParameters.set(ParameterCode.ActorList, 
                            PhotonPacketBuilder.types.integerArray(raiseEventOptions.TargetActors));
                    }
                    break;
                    
                default:
                    if (raiseEventOptions.TargetActors) {
                        this.opParameters.set(ParameterCode.ActorList, 
                            PhotonPacketBuilder.types.integerArray(raiseEventOptions.TargetActors));
                    } 
                    else if (raiseEventOptions.InterestGroup !== 0) {
                        this.opParameters.set(ParameterCode.Group, 
                            PhotonPacketBuilder.types.byte(raiseEventOptions.InterestGroup));
                    } 
                    else if (raiseEventOptions.Receivers !== ReceiverGroup.Others) {
                        this.opParameters.set(ParameterCode.ReceiverGroup, 
                            PhotonPacketBuilder.types.byte(raiseEventOptions.Receivers));
                    }
                    
                    if (raiseEventOptions.Flags.HttpForward) {
                        this.opParameters.set(ParameterCode.EventForward, 
                            PhotonPacketBuilder.types.byte(raiseEventOptions.Flags.WebhookFlags));
                    }
                    break;
            }
        }
        
        // Add event code parameter
        this.opParameters.set(ParameterCode.Code, PhotonPacketBuilder.types.byte(eventCode));
        
        // Add custom event content if provided
        if (customEventContent !== null && customEventContent !== undefined) {
            // Here we would need to determine the proper type based on the customEventContent
            // For simplicity, we'll use a generic approach
            this.opParameters.set(ParameterCode.Data, this.convertToPhotonType(customEventContent));
        }
        
        // Send the operation
        return this.SendOperation(OperationCode.RaiseEvent, this.opParameters, sendOptions);
    }
    
    /**
     * Converts JavaScript values to proper Photon types
     * @param {*} value - Value to convert
     * @returns {Object} - Photon type object
     */
    convertToPhotonType(value) {
        if (value === null || value === undefined) {
            return PhotonPacketBuilder.types.null();
        }
        
        switch (typeof value) {
            case 'string':
                return PhotonPacketBuilder.types.string(value);
            case 'boolean':
                return PhotonPacketBuilder.types.boolean(value);
            case 'number':
                // Check if it's an integer or float
                if (Number.isInteger(value)) {
                    return PhotonPacketBuilder.types.integer(value);
                } else {
                    return PhotonPacketBuilder.types.float(value);
                }
            case 'object':
                if (Array.isArray(value)) {
                    // Special case for integer arrays which need special handling
                    // This is critical for compatibility with C# int[] expectation
                    if (value.every(item => typeof item === 'number' && Number.isInteger(item))) {
                        return PhotonPacketBuilder.types.integerArray(value); // Use intArray explicitly
                    }
                    
                    // Determine array type (this is a simplified approach)
                    if (value.length === 0) {
                        return PhotonPacketBuilder.types.objectArray([]);
                    }
                    
                    const firstItemType = typeof value[0];
                    if (firstItemType === 'string') {
                        return PhotonPacketBuilder.types.stringArray(value);
                    } else {
                        // Convert each item in the array and return objectArray
                        const convertedItems = value.map(item => this.convertToPhotonType(item));
                        return PhotonPacketBuilder.types.objectArray(convertedItems);
                    }
                } else {
                    // For objects, create a hashtable
                    const entries = Object.entries(value).map(([key, val]) => [
                        PhotonPacketBuilder.types.string(key),
                        this.convertToPhotonType(val)
                    ]);
                    return PhotonPacketBuilder.types.hashTable(entries);
                }
            default:
                // Default to string for any other types
                return PhotonPacketBuilder.types.string(String(value));
        }
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
        
        // Custom handler for this specific event to ensure proper Int32[] serialization
        const originalConvert = client.convertToPhotonType;
        this.convertToPhotonType = function(value) {
            // If this is our ownership transfer array, ensure it's treated as intArray
            if (Array.isArray(value) && value.length === 2 && 
                typeof value[0] === 'number' && typeof value[1] === 'number') {
                return PhotonPacketBuilder.types.integerArray(value);
            }
            
            // Use original method for other cases
            return originalConvert.call(this, value);
        };
        
        const data = [viewID, playerID];
        
        const result = this.OpRaiseEvent(ownershipTransferEventCode, data, eventOptions, sendOptions);
        this.convertToPhotonType = originalConvert;
        
        return result;
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
}

// Example usage:
// In a browser environment with Photon client:
// const packet = client.TransferOwnership(123, 456);
// webSocket.send(packet.toBuffer());

// Export the classes for use in other modules
export default { PhotonClient, RaiseEventOptions, SendOptions, EventCaching, ReceiverGroup };