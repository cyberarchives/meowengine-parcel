import MeowEngine from "../Browser/GlobalTypeDefs";
import ProtocolReader from "../MeowEngine/Photon/protocol_reader/ProtocolReader";
import OperationCode from "./Enums/OperationCode";
import RoomProperties from "./Handlers/RoomProperties";
import { PhotonClient } from "./PhotonNetwork";

export class SocketManager {
    static packetCount = 0;
    static firstPacket = true;

    static overrideSocket() {
        const originalSend = WebSocket.prototype.send;
        const OriginalWebSocket = WebSocket;

        window.WebSocket = function(url, protocols) {
            const socket = new OriginalWebSocket(url, protocols);

            var photonClient = new PhotonClient({ originalSend, socket });
            MeowEngine.PhotonClient.Instance = photonClient;
            MeowEngine.Networking.Instantiate = photonClient.Instantiate;
            MeowEngine.Networking.TransferOwnership = photonClient.TransferOwnership;
            MeowEngine.LoadBalancingClient.OpRaiseEvent = photonClient.OpRaiseEvent;
            MeowEngine.PhotonClient.gameSocket = socket;

            socket.send = function(...args) {
                const message = args[0];

                if (message instanceof ArrayBuffer) {
                    // For ArrayBuffer messages, intercept and analyze
                    const uint8Array = new Uint8Array(message);
                    let reader = new ProtocolReader(uint8Array.buffer);
                    const packet = reader.readPacket();
                    console.log("Sending packet:", packet);
                }
                
                // Always pass the message to the original send method
                return originalSend.apply(this, args);
            };
            
            socket.addEventListener('message', e => {
                if (!(e.data instanceof ArrayBuffer) || e.data.byteLength < 1) return;
                
                const uint8Array = new Uint8Array(e.data);
                console.log("Received packet:", uint8Array);
                
                // Initialize the reader with the data
                let reader = new ProtocolReader(uint8Array.buffer);
                const packet = reader.readPacket();
    
                console.log("Received packet:", packet);
    
                // Check if the packet has a parameter with the key, 249
                if (packet.code == OperationCode.JoinGame && packet.params["249"]) {
                    // Loop through entries in the packet
                    RoomProperties.handleRoomProps(packet);
                }
            });
            
            return socket;
        };
    }
}

export default SocketManager;