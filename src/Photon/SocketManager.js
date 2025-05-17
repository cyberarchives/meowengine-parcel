import MeowEngine from "../Browser/GlobalTypeDefs";
import ProtocolReader from "../MeowEngine/Photon/protocol_reader/ProtocolReader";
import { PhotonClient } from "./PhotonNetwork";

export class SocketManager {
    static overrideSocket() {
        let originalSend = WebSocket.prototype.send;
        const OriginalWebSocket = WebSocket;

        window.WebSocket = function(url, protocols) {
            const socket = new OriginalWebSocket(url, protocols);

            var photonClient = new PhotonClient({ originalSend, socket });
            MeowEngine.PhotonClient.Instance = photonClient;
            MeowEngine.Networking.Instantiate = photonClient.Instantiate;
            MeowEngine.Networking.TransferOwnership = photonClient.TransferOwnership;
            MeowEngine.LoadBalancingClient.OpRaiseEvent = photonClient.OpRaiseEvent;

            socket.send = function(...args) {
                const message = args[0];

                if (!(message instanceof ArrayBuffer)) {
                    return originalSend.apply(this, args);
                }

                const uint8Array = new Uint8Array(message);
                let reader = new ProtocolReader(uint8Array.buffer);
                const packet = reader.readPacket();

                console.log(packet);
            };
        }
    }

    static addListener(event, callback) {
        
    }
}

export default SocketManager;