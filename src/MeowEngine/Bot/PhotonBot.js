import WebSocket from "ws";
import ProtocolReader from "../Photon/protocol_reader/ProtocolReader";
import { PacketType, OperationCode, InternalOperationCode, EventCode, ParameterCode } from "../Photon/protocol_reader/constants";
import { PacketBuilder, createPacket } from "../../Photon/Utils/PacketBuilder"; // Updated import
const runningLobbies = [];

export class PhotonBot {
    constructor(config = {}) {
        this.roomName = config.roomName || "";
        this.username = config.username || `PC-${Math.random().toString(36).substr(2, 9)}`;
        this.lobbySocket = null;
        this.gameSocket = null;
        this.authToken = "";
        this.serverAddress = "";
        this._startTime = new Date();
        this._lastPing = new Date(0);
        this._serverTickOffset = 0;
        this.previousActorList = [];
        this.userFinderResult = { username: "", lobby: "", found: false };

        this.lobbySocket = new WebSocket(`wss://game-ca-1.blayzegames.com:2053/?libversion=4.1.6.10&sid=30&app=`, "GpBinaryV16");
        this.setupLobbySocket();
    }

    static parseArgs() {
        const args = {};
        process.argv.slice(2).forEach(arg => {
            const match = arg.match(/^--([^=]+)=(.*)$/);
            if (match) {
                const [, key, value] = match;
                args[key] = value;
            }
        });
        return args;
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    botLog(...args) {
        console.log(`[MeowEngine Bot ${this.username}]:`, ...args);
    }

    getRandomLobby() {
        if (runningLobbies.length === 0) return null;
        const index = Math.floor(Math.random() * runningLobbies.length);
        return runningLobbies[index];
    }

    async getAuthCode(username, hashedPassword) {
        let auth = "";
        const response = await fetch("https://server.blayzegames.com/OnlineAccountSystem/get_multiplayer_auth_code.php?requiredForMobile=769220037", {
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9,ja;q=0.8",
                "content-type": "application/x-www-form-urlencoded",
                priority: "u=1, i",
                "sec-ch-ua": "\"Microsoft Edge\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                Referer: "https://bullet-force-multiplayer.game-files.crazygames.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: `password=${hashedPassword}&username=${username}&username=${username}&password=${hashedPassword}`,
            method: "POST"
        });
        auth = await response.text();
        return auth;
    }

    _tickCount() {
        return Date.now() - this._startTime.getTime();
    }

    serverTime() {
        return this._tickCount() + this._serverTickOffset;
    }

    sendPing(socket) {
        const pingRequest = createPacket()
            .operation(1)
            .withInteger(1, this._tickCount())
            .build();
        socket.send(pingRequest);
    }

    pingLoop(socket) {
        setInterval(() => {
            const pingRequest = createPacket()
                .internalOperation(InternalOperationCode.Ping)
                .withInteger(1, 1000)
                .build();
            socket.send(pingRequest);
        }, 1000);
    }

    sendAuthParams() {
        const packet = createPacket()
            .operation(OperationCode.Authenticate)
            .withString(220, "1.104.5_HC_1.105")
            .withString(224, "8c2cad3e-2e3f-4941-9044-b390ff2c4956")
            .withString(210, "eu/*")
            .withString(225, this.generateUUID())
            .build();
        this.lobbySocket.send(packet);
    }

    sendGameAuth(token) {
        this.botLog("sendGameAuth -> ", token);
        const packet = createPacket()
            .operation(OperationCode.Authenticate)
            .withString(221, token)
            .build();
        this.gameSocket.send(packet);
    }

    sendJoinLobby(socket) {
        const packet = createPacket()
            .operation(OperationCode.JoinLobby)
            .build();
        socket.send(packet);
    }

    joinRoom(roomName) {
        const packet = createPacket()
            .operation(OperationCode.JoinGame)
            .withString(255, roomName)
            .build();
        this.lobbySocket.send(packet);
    }

    kickPlayerWithReason(targetActorId, reason) {
        const packet = createPacket()
            .event(200)
            .withInteger(ParameterCode.Code, 200)
            .withInteger(ParameterCode.Cache, 0)
            .withIntArray(ParameterCode.ActorList, [targetActorId])
            .withHashtable(ParameterCode.Data, {
                4: [reason],
                5: 91
            })
            .build();
        this.gameSocket.send(packet);
    }

    sendAnnouncement(text, duration) {
        const packet = createPacket()
            .event(200)
            .withInteger(ParameterCode.Code, 200)
            .withInteger(ParameterCode.Cache, 4)
            .withHashtable(ParameterCode.Data, {
                0: 1001,
                4: [text, duration],
                5: 61
            })
            .build();
        this.gameSocket.send(packet);
    }

    sendAuthToken(token) {
        const packet = createPacket()
            .event(200)
            .withInteger(ParameterCode.Code, 200)
            .withInteger(ParameterCode.Cache, 0)
            .withHashtable(ParameterCode.Data, {
                4: [token],
                5: 88
            })
            .build();
        this.gameSocket.send(packet);
    }

    sendJoinRoomWithProperties(roomName) {
        const perksArray = new Uint8Array(8);
        perksArray.set([1, 9, 14, 2, 22]);
        
        const packet = createPacket()
            .operation(226)
            .withString(255, roomName)
            .withHashtable(249, {
                platform: "WebGLPlayer",
                teamNumber: 0,
                rank: 27,
                killstreak: 15,
                characterCamo: 0,
                bulletTracerColor: 1,
                glovesCamo: 16,
                unlockedWeapons: [0, 0, 0],
                current_kills_in_killstreak: 0,
                kd: 8.511835098266602,
                perks: Buffer.from(perksArray),
                current_vehicle_view_id: 4294967295,
                up_to_date_version: "1.104.5_HC",
                throwable_type: 12,
                throwable_amount: 3,
                nextCreateRoomPass: "",
                255: this.username
            })
            .withBoolean(250, true)
            .build();
        this.gameSocket.send(packet);
    }

    handleLeave(packet, playerListJson) {
        const currentActorList = packet.params[252].data.map(entry => entry.value);
        const leftActorNr = this.previousActorList.find(nr => !currentActorList.includes(nr));
        if (leftActorNr !== undefined) {
            for (const player of playerListJson) {
                const username = Object.keys(player)[0];
                const info = player[username];
                if (info.actorNr === leftActorNr) {
                    console.log(`${username} was kicked`);
                    break;
                }
            }
        }
        this.previousActorList = currentActorList;
    }

    filterRoomsWithIdOnly(roomKeys) {
        return roomKeys.filter(key => /\(#\d{4,6}\)/.test(key));
    }

    cleanUsername(rawName) {
        let cleaned = rawName.replace(/<color=#[A-Fa-f0-9]{6}>/g, '').replace(/<\/color>/g, '');
        cleaned = cleaned.replace(/^\[[^\]]+\]/g, '');
        return cleaned.trim();
    }

    base64toUint8Array(base64) {
        const binaryString = atob(base64);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let index = 0; index < length; index++) {
            bytes[index] = binaryString.charCodeAt(index);
        }
        return bytes;
    }

    idkWhatPacketThisIs() {
        this.gameSocket.send(this.base64toUint8Array("8wL8AAP7aAABYv9zAA5bXVBDLU5leHRUb1lvdf5pAAAAI/pvAQ==").buffer);
    }

    sendInstantiateActorPacket() {
        const packet = createPacket()
            .operation(253)
            .withInteger(244, 202)
            .withInteger(247, 6)
            .withIntArray(252, [35])
            .build();
        this.gameSocket.send(packet);
    }

    sendPlayerBodyPacket() {
        const packet = createPacket()
            .operation(253)
            .withInteger(244, 202)
            .withHashtable(245, {
                0: "PlayerBody",
                6: 103197933,
                7: 1001
            })
            .withInteger(247, 4)
            .build();
        this.gameSocket.send(packet);
    }

    setupLobbySocket() {
        this.lobbySocket.onopen = () => {
            this.botLog("Connected to LobbyServer!");
            this.sendPing(this.lobbySocket);
        };

        this.lobbySocket.onmessage = (evt) => {
            const uint8Array = new Uint8Array(evt.data);
            const protocol = new ProtocolReader(uint8Array.buffer);
            const packet = protocol.readPacket();
            this.botLog("Lobby Socket:", packet);

            if (packet.code === PacketType.InitResponse) {
                this.botLog("InitResponse received!");
                this.sendAuthParams();
            }

            if (packet.code === OperationCode.Authenticate) {
                if (packet.params['222']) {
                    runningLobbies.push(this.filterRoomsWithIdOnly(Object.keys(packet.params['222'])));
                }
                if (!this.authToken) {
                    this.botLog("AuthResponse received!");
                    this.botLog("AuthToken", packet.params["221"]);
                    this.botLog("UserId", packet.params["225"]);
                    this.authToken = packet.params["221"];
                }
                this.sendJoinLobby(this.lobbySocket);
            }

            if (packet.code === EventCode.AppStats) {
                if (packet.debugMessage === "Game does not exists") {
                    process.exit(0);
                }
                if (!this.serverAddress) {
                    if (packet.params['230']) {
                        this.serverAddress = packet.params['230'];
                        this.botLog(this.serverAddress);
                        this.botLog("Received join room response!");
                        this.gameSocket = new WebSocket(this.serverAddress, "GpBinaryV16");
                        this.setupGameSocket();
                    }
                }
            }
        };
    }

    setupGameSocket() {
        this.gameSocket.onclose = (event) => {
            console.log(`Connection closed for ${this.username}: `, event.code, event.reason);
        };

        this.gameSocket.onopen = () => {
            this.lobbySocket.close();
            this._startTime = new Date();
            this._lastPing = new Date(0);
            this._serverTickOffset = 0;
            this.botLog("Connected to Game Server!");
            this.botLog("Joining room", this.roomName);
            this.sendPing(this.gameSocket);
            this.pingLoop(this.gameSocket);
        };

        this.gameSocket.onmessage = async (evt) => {
            const uint8Array = new Uint8Array(evt.data);
            const protocol = new ProtocolReader(uint8Array.buffer);
            const packet = protocol.readPacket();
            console.log(packet);

            if (packet.params["249"]) {
                let packets = require("./packets.json");
                for (const [key, value] of Object.entries(packet.params["249"])) {
                    if (!key.startsWith("int32")) continue;
                    let actorNr = key.split(" ")[1];
                    const name = this.cleanUsername(value["int8 255"] ?? "Unknown");
                    let rank = value.rank?.value ?? 0;
                    const kd = value.kd?.value ?? 0;
                    let team = value.teamNumber?.value ?? 0;
                    let kills = value.current_kills_in_killstreak?.value ?? 0;
                    const platform = value.platform ?? "Unknown";
                    let usrEntry = {};
                    actorNr = parseInt(actorNr);
                    rank = parseInt(rank);
                    kills = parseInt(kills);
                    team = parseInt(team);
                    usrEntry[name] = { actorNr, rank, kd, team, kills, platform };
                    packets.push(usrEntry);
                }
                this.botLog("Game Socket:", packet);
            }

            if (packet.code === PacketType.InitResponse) {
                this.sendGameAuth(this.authToken);
            }

            if (packet.code === OperationCode.Leave) {
                let packets = require("./packets.json");
                this.handleLeave(packet, packets);
            }

            if (packet.code === OperationCode.Authenticate) {
                this.sendJoinRoomWithProperties(this.roomName);
                this.sendInstantiateActorPacket();
                this.idkWhatPacketThisIs();
                this.sendPlayerBodyPacket();
                setTimeout(async () => {
                    let auth = await this.getAuthCode();
                    this.sendAuthToken(auth);
                }, 2000);
            }
        };
    }

    start() {
        setTimeout(() => {
            this.joinRoom(this.roomName);
        }, 2500);
    }
}

export default PhotonBot;