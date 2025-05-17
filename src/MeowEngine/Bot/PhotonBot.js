import WebSocket from "ws";
import ProtocolReader from "../Photon/protocol_reader/ProtocolReader";
import { PacketType, OperationCode, InternalOperationCode, EventCode, ParameterCode } from "../Photon/protocol_reader/constants"
import { PacketBuilder } from "../../Photon/Utils/PacketBuilder";
const runningLobbies = [];

export class PhotonBot {
    constructor(config = {}) {
        // Configuration with defaults
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

        // Initialize WebSocket connection
        this.lobbySocket = new WebSocket(`wss://game-ca-1.blayzegames.com:2053/?libversion=4.1.6.10&sid=30&app=`, "GpBinaryV16");
        this.setupLobbySocket();
    }

    // Parse command-line arguments
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

    // Generate UUID
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Log method
    botLog(...args) {
        console.log(`[MeowEngine Bot ${this.username}]:`, ...args);
    }

    // Get random lobby
    getRandomLobby() {
        if (runningLobbies.length === 0) return null;
        const index = Math.floor(Math.random() * runningLobbies.length);
        return runningLobbies[index];
    }

    // Fetch authentication code
    async getAuthCode() {
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
            body: "password=437B864DD79157AAEC7F9E4687CD2ECE5A4318F5D7DBDB4ABE819C3F9CE22E51B650A6578D2BF3ED6FFA451382E16DEBC7247AB768A19ACBEC4C9E0786C3EE4E&username=PC-543654y54454&username=PC-543654y54454&password=437B864DD79157AAEC7F9E4687CD2ECE5A4318F5D7DBDB4ABE819C3F9CE22E51B650A6578D2BF3ED6FFA451382E16DEBC7247AB768A19ACBEC4C9E0786C3EE4E",
            method: "POST"
        });
        auth = await response.text();
        return auth;
    }

    // Time-related methods
    _tickCount() {
        return Date.now() - this._startTime.getTime();
    }

    serverTime() {
        return this._tickCount() + this._serverTickOffset;
    }

    // Send ping packet
    sendPing(socket) {
        const pingRequest = PacketBuilder.createRequest(1)
            .addParam(1, PacketBuilder.types.integer(this._tickCount()));
        const pingBuffer = pingRequest.toBuffer();
        socket.send(pingBuffer);
    }

    // Ping loop
    pingLoop(socket) {
        setInterval(() => {
            const pingRequest = PacketBuilder.createRequest(InternalOperationCode.Ping)
                .addParam(1, PacketBuilder.types.integer(1000));
            const pingBuffer = pingRequest.toBuffer();
            socket.send(pingBuffer);
        }, 1000);
    }

    // Send authentication parameters
    sendAuthParams() {
        const packet = PacketBuilder.createRequest(OperationCode.Authenticate)
            .addParam(220, PacketBuilder.types.string("1.104.5_HC_1.105"))
            .addParam(224, PacketBuilder.types.string("8c2cad3e-2e3f-4941-9044-b390ff2c4956"))
            .addParam(210, PacketBuilder.types.string("eu/*"))
            .addParam(225, PacketBuilder.types.string(this.generateUUID()));
        const bufferData = packet.toBuffer();
        this.lobbySocket.send(bufferData);
    }

    // Send game authentication
    sendGameAuth(token) {
        this.botLog("sendGameAuth -> ", token);
        const packet = PacketBuilder.createRequest(OperationCode.Authenticate)
            .addParam(221, PacketBuilder.types.string(token));
        const bufferData = packet.toBuffer();
        this.gameSocket.send(bufferData);
    }

    // Send join lobby request
    sendJoinLobby(socket) {
        const packet = PacketBuilder.createRequest(OperationCode.JoinLobby);
        const bufferData = packet.toBuffer();
        socket.send(bufferData);
    }

    // Join a room
    joinRoom(roomName) {
        const packet = PacketBuilder.createRequest(OperationCode.JoinGame)
            .addParam(255, PacketBuilder.types.string(roomName));
        const bufferData = packet.toBuffer();
        this.lobbySocket.send(bufferData);
    }

    // Kick player with reason
    kickPlayerWithReason(targetActorId, reason) {
        const packet = PacketBuilder.createRequest(OperationCode.RaiseEvent)
            .addParam(ParameterCode.Code, PacketBuilder.types.byte(200))
            .addParam(ParameterCode.Cache, PacketBuilder.types.byte(0))
            .addParam(ParameterCode.ActorList, PacketBuilder.types.intArray([targetActorId]))
            .addParam(ParameterCode.Data, PacketBuilder.types.hashTable([
                [PacketBuilder.types.byte(4), PacketBuilder.types.objectArray([
                    PacketBuilder.types.string(reason)
                ])],
                [PacketBuilder.types.byte(5), PacketBuilder.types.byte(91)],
            ]));
        const bufferData = packet.toBuffer();
        this.gameSocket.send(bufferData);
    }

    // Send announcement
    sendAnnouncement(text, duration) {
        const packet = PacketBuilder.createRequest(OperationCode.RaiseEvent)
            .addParam(ParameterCode.Code, PacketBuilder.types.byte(200))
            .addParam(ParameterCode.Cache, PacketBuilder.types.byte(4))
            .addParam(ParameterCode.Data, PacketBuilder.types.hashTable([
                [PacketBuilder.types.byte(0), PacketBuilder.types.integer(1001)],
                [PacketBuilder.types.byte(4), PacketBuilder.types.objectArray([
                    PacketBuilder.types.string(text),
                    PacketBuilder.types.float(duration),
                ])],
                [PacketBuilder.types.byte(5), PacketBuilder.types.byte(61)],
            ]));
        const bufferData = packet.toBuffer();
        this.gameSocket.send(bufferData);
    }

    // Send authentication token
    sendAuthToken(token) {
        const packet = PacketBuilder.createRequest(OperationCode.RaiseEvent)
            .addParam(ParameterCode.Code, PacketBuilder.types.byte(200))
            .addParam(ParameterCode.Cache, PacketBuilder.types.byte(0))
            .addParam(ParameterCode.Data, PacketBuilder.types.hashTable([
                [PacketBuilder.types.byte(4), PacketBuilder.types.objectArray([
                    PacketBuilder.types.string(token)
                ])],
                [PacketBuilder.types.byte(5), PacketBuilder.types.byte(88)],
            ]));
        const bufferData = packet.toBuffer();
        this.gameSocket.send(bufferData);
    }

    // Send join room with properties
    sendJoinRoomWithProperties(roomName) {
        const packet = PacketBuilder.createRequest(226);
        packet.addParam(255, PacketBuilder.types.string(roomName));
        const perksArray = new Uint8Array(8);
        perksArray.set([1, 9, 14, 2, 22]);
        const hashtable249 = PacketBuilder.types.hashTable([
            [PacketBuilder.types.string("platform"), PacketBuilder.types.string("WebGLPlayer")],
            [PacketBuilder.types.string("teamNumber"), PacketBuilder.types.byte(0)],
            [PacketBuilder.types.string("rank"), PacketBuilder.types.byte(27)],
            [PacketBuilder.types.string("killstreak"), PacketBuilder.types.byte(15)],
            [PacketBuilder.types.string("characterCamo"), PacketBuilder.types.byte(0)],
            [PacketBuilder.types.string("bulletTracerColor"), PacketBuilder.types.byte(1)],
            [PacketBuilder.types.string("glovesCamo"), PacketBuilder.types.byte(16)],
            [PacketBuilder.types.string("unlockedWeapons"), PacketBuilder.types.array(0x69, [
                PacketBuilder.types.integer(0),
                PacketBuilder.types.integer(0),
                PacketBuilder.types.integer(0)
            ])],
            [PacketBuilder.types.string("current_kills_in_killstreak"), PacketBuilder.types.integer(0)],
            [PacketBuilder.types.string("kd"), PacketBuilder.types.float(8.511835098266602)],
            [PacketBuilder.types.string("perks"), PacketBuilder.types.byteArray(perksArray)],
            [PacketBuilder.types.string("current_vehicle_view_id"), PacketBuilder.types.integer(4294967295)],
            [PacketBuilder.types.string("up_to_date_version"), PacketBuilder.types.string("1.104.5_HC")],
            [PacketBuilder.types.string("throwable_type"), PacketBuilder.types.integer(12)],
            [PacketBuilder.types.string("throwable_amount"), PacketBuilder.types.integer(3)],
            [PacketBuilder.types.string("nextCreateRoomPass"), PacketBuilder.types.string("")],
            [PacketBuilder.types.byte(255), PacketBuilder.types.string(this.username)]
        ]);
        packet.addParam(249, hashtable249);
        packet.addParam(250, PacketBuilder.types.boolean(true));
        const bufferData = packet.toBuffer();
        this.gameSocket.send(bufferData);
    }

    // Handle player leave
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

    // Filter rooms with ID
    filterRoomsWithIdOnly(roomKeys) {
        return roomKeys.filter(key => /\(#\d{4,6}\)/.test(key));
    }

    // Clean username
    cleanUsername(rawName) {
        let cleaned = rawName.replace(/<color=#[A-Fa-f0-9]{6}>/g, '').replace(/<\/color>/g, '');
        cleaned = cleaned.replace(/^\[[^\]]+\]/g, '');
        return cleaned.trim();
    }

    // Convert base64 to Uint8Array
    base64toUint8Array(base64) {
        const binaryString = atob(base64);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let index = 0; index < length; index++) {
            bytes[index] = binaryString.charCodeAt(index);
        }
        return bytes;
    }

    // Unknown packet
    idkWhatPacketThisIs() {
        this.gameSocket.send(this.base64toUint8Array("8wL8AAP7aAABYv9zAA5bXVBDLU5leHRUb1lvdf5pAAAAI/pvAQ==").buffer);
    }

    // Instantiate actor packet
    sendInstantiateActorPacket() {
        const packet = PacketBuilder.createRequest(253)
            .addParam(244, PacketBuilder.types.byte(202))
            .addParam(247, PacketBuilder.types.byte(6))
            .addParam(252, PacketBuilder.types.array(0x69, [
                PacketBuilder.types.integer(35)
            ]));
        const bufferData = packet.toBuffer();
        this.gameSocket.send(bufferData);
    }

    // Player body packet
    sendPlayerBodyPacket() {
        const packet = PacketBuilder.createRequest(253)
            .addParam(244, PacketBuilder.types.byte(202))
            .addParam(245, PacketBuilder.types.hashTable([
                [PacketBuilder.types.byte(0), PacketBuilder.types.string("PlayerBody")],
                [PacketBuilder.types.byte(6), PacketBuilder.types.integer(103197933)],
                [PacketBuilder.types.byte(7), PacketBuilder.types.integer(1001)]
            ]))
            .addParam(247, PacketBuilder.types.byte(4));
        const bufferData = packet.toBuffer();
        this.gameSocket.send(bufferData);
    }

    // Setup lobby socket event listeners
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

    // Setup game socket event listeners
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

    // Start the bot
    start() {
        setTimeout(() => {
            this.joinRoom(this.roomName);
        }, 2500);
    }
}

export default PhotonBot;

// Example usage: Create multiple bots
// const args = BulletForceBot.parseArgs();
// const bot1 = new BulletForceBot({ roomName: args.roomName || "DefaultRoom1", username: "Bot1" });
// const bot2 = new BulletForceBot({ roomName: args.roomName || "DefaultRoom2", username: "Bot2" });

// bot1.start();
// bot2.start();