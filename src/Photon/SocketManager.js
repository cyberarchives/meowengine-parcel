import MeowEngine from "../Browser/GlobalTypeDefs";
import ProtocolReader from "../MeowEngine/Photon/protocol_reader/ProtocolReader";
import OperationCode from "./Enums/OperationCode";
import OpCode201 from "./Handlers/OpCode201";
import PlayerList from "./Handlers/PlayerList";
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

                    if (MeowEngine.Config.debugOutgoingPackets) {
                        MeowEngine.Log.Instance.info("Outgoing packet:", packet);
                    }

                    if (packet.code == 253 && packet.params["245"]) {
                        const parser = new OpCode201(packet);
                        OpCode201.handleLocalPlayerUpdate(parser.parseOutgoing());
                    }

                    if (packet.code == OperationCode.Leave) {
                        PlayerList.clearPlayerlist();
                    }
                }
                
                // Always pass the message to the original send method
                return originalSend.apply(this, args);
            };
            
            socket.addEventListener('message', e => {
                if (!(e.data instanceof ArrayBuffer) || e.data.byteLength < 1) return;
                
                const uint8Array = new Uint8Array(e.data);
                
                // Initialize the reader with the data
                let reader = new ProtocolReader(uint8Array.buffer);
                const packet = reader.readPacket();

                if (MeowEngine.Config.debugIncomingPackets) {
                    MeowEngine.Log.Instance.info("Incoming packet:", packet);
                }
                
                if (packet.code == 201 && packet.params["245"]) {
                    const parser = new OpCode201(packet);
                    OpCode201.handlePlayerUpdate(parser.parseIncoming());
                }
        
                // Check if the packet has a parameter with the key, 249
                if (packet.code == OperationCode.JoinGame && packet.params["249"]) {
                    // Loop through entries in the packet
                    PlayerList.handlePlayerList(packet);
                }

                if (packet.code == OperationCode.Leave) {
                    PlayerList.handlePlayerLeave(packet);
                }

                if (packet.code == OperationCode.Join) {
                    PlayerList.handlePlayerJoin(packet);
                }
            });
            
            return socket;
        };
    }
}

export default SocketManager;