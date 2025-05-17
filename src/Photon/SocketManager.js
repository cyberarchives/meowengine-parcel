import MeowEngine from "../Browser/GlobalTypeDefs";
import ProtocolReader from "../MeowEngine/Photon/protocol_reader/ProtocolReader";
import OperationCode from "./Enums/OperationCode";
import RoomProperties from "./Handlers/RoomProperties";
import { PhotonClient } from "./PhotonNetwork";

export class SocketManager {
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

                if (!(message instanceof ArrayBuffer)) {
                    return originalSend.apply(this, args);
                }

                const uint8Array = new Uint8Array(message);

                // Initialize the reader with the data
                let reader = new ProtocolReader(uint8Array.buffer);
                const packet = reader.readPacket();

                console.log("Sending packet:", packet);

                originalSend.apply(this, args);
            };
            
            SocketManager.bindEventListeners(socket);
        }
    }

    static bindEventListeners(socket) {
        socket.addEventListener('message', e => {
            const uint8Array = new Uint8Array(e.data);

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
    }

    static removeListener(socket, event, callback) {
        socket.removeEventListener(event, callback);   
    }

    static addListener(socket, event, callback) {
        socket.addEventListener(event, callback);
    }
}

export default SocketManager;