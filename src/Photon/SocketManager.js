import MeowEngine from "../Browser/GlobalTypeDefs";
import GameUtils from "../Browser/Utility/GameUtils";
import ProtocolReader from "../MeowEngine/Photon/protocol_reader/ProtocolReader";
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
            
            SocketManager.bindEventListeners();
        }
    }

    static bindEventListeners() {
        this.addListener(MeowEngine.PhotonClient.gameSocket, "message", (event) => {
            const uint8Array = new Uint8Array(event.data);

            // Initialize the reader with the data
            let reader = new ProtocolReader(uint8Array.buffer);
            const packet = reader.readPacket();

            console.log("Received packet:", packet);

            // Check if the packet has a parameter with the key, 249
            if (packet.params["249"]) {
                // Loop through entries in the packet
                for (const [key, value] of Object.entries(packet.params["249"])) {
                    if (!key.startsWith("int32")) continue;

                    // Grab the information from the packet
                    let actorNr = key.split(" ")[1];
                    const name = GameUtils.cleanUsername(value["int8 255"] ?? "Unknown");
                    let rank = value.rank?.value ?? 0;
                    const kd = value.kd?.value ?? 0;
                    let team = value.teamNumber?.value ?? 0;
                    let kills = value.current_kills_in_killstreak?.value ?? 0;
                    const platform = value.platform ?? "Unknown";
                
                    // Utilize the player entry
                    let usrEntry = {};

                    // Do some parsing
                    actorNr = parseInt(actorNr);
                    rank = parseInt(rank);
                    kills = parseInt(kills);
                    team = parseInt(team);

                    // Create the player entry
                    usrEntry[actorNr] = {
                        actorNr,
                        name,
                        rank, 
                        kd, 
                        team, 
                        kills, 
                        platform,
                        position: {},
                        rotation: {},
                        pitch: 0,
                        yaw: 0,
                        health: 0,
                        ping: 0
                    };

                    // Add the player entry to the list
                    MeowEngine.RoomInstance.Players.push(usrEntry);
                }
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