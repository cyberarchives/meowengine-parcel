// const WebSocket = require("ws");
// import { Deserializer } from "../Photon/Utils/Deserializer";
// import { PacketType } from "../Photon/Enums/PacketType";
// import { OperationCode } from "../Photon/Enums/OperationCode";
// import { InternalOperationCode } from "../Photon/Enums/InternalOperationCode";
// import { EventCode } from "../Photon/Enums/EventCode";
// import { ParameterCode } from "../Photon/Enums/ParameterCode";
// import { PhotonPacketBuilder } from "../Photon/Utils/PacketBuilder";
// const runningLobbies = [];
// const fs = require("fs");


// export class PhotonBot {
//     constructor(config = {}) {
//         // Configuration with defaults
//         this.roomName = config.roomName || "";
//         this.username = config.username || `PC-${Math.random().toString(36).substr(2, 9)}`;
//         this.lobbySocket = null;
//         this.gameSocket = null;
//         this.authToken = "";
//         this.serverAddress = "";
//         this._startTime = new Date();
//         this._lastPing = new Date(0);
//         this._serverTickOffset = 0;
//         this.previousActorList = [];
//         this.userFinderResult = { username: "", lobby: "", found: false };

//         // Initialize WebSocket connection
//         this.lobbySocket = new WebSocket(`wss://game-ca-1.blayzegames.com:2053/?libversion=4.1.6.10&sid=30&app=`, "GpBinaryV16");
//         this.setupLobbySocket();
//     }

//     // Parse command-line arguments
//     static parseArgs() {
//         const args = {};
//         process.argv.slice(2).forEach(arg => {
//             const match = arg.match(/^--([^=]+)=(.*)$/);
//             if (match) {
//                 const [, key, value] = match;
//                 args[key] = value;
//             }
//         });
//         return args;
//     }

//     // Generate UUID
//     generateUUID() {
//         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
//             const r = Math.random() * 16 | 0;
//             const v = c === 'x' ? r : (r & 0x3 | 0x8);
//             return v.toString(16);
//         });
//     }

//     // Log method
//     botLog(...args) {
//         console.log(`[MeowEngine Bot ${this.username}]:`, ...args);
//     }

//     // Get random lobby
//     getRandomLobby() {
//         if (runningLobbies.length === 0) return null;
//         const index = Math.floor(Math.random() * runningLobbies.length);
//         return runningLobbies[index];
//     }

//     // Fetch authentication code
//     async getAuthCode() {
//         let auth = "";
//         const response = await fetch("https://server.blayzegames.com/OnlineAccountSystem/get_multiplayer_auth_code.php?requiredForMobile=769220037", {
//             headers: {
//                 accept: "*/*",
//                 "accept-language": "en-US,en;q=0.9,ja;q=0.8",
//                 "content-type": "application/x-www-form-urlencoded",
//                 priority: "u=1, i",
//                 "sec-ch-ua": "\"Microsoft Edge\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
//                 "sec-ch-ua-mobile": "?0",
//                 "sec-ch-ua-platform": "\"Windows\"",
//                 "sec-fetch-dest": "empty",
//                 "sec-fetch-mode": "cors",
//                 "sec-fetch-site": "cross-site",
//                 Referer: "https://bullet-force-multiplayer.game-files.crazygames.com/",
//                 "Referrer-Policy": "strict-origin-when-cross-origin"
//             },
//             body: "password=437B864DD79157AAEC7F9E4687CD2ECE5A4318F5D7DBDB4ABE819C3F9CE22E51B650A6578D2BF3ED6FFA451382E16DEBC7247AB768A19ACBEC4C9E0786C3EE4E&username=PC-543654y54454&username=PC-543654y54454&password=437B864DD79157AAEC7F9E4687CD2ECE5A4318F5D7DBDB4ABE819C3F9CE22E51B650A6578D2BF3ED6FFA451382E16DEBC7247AB768A19ACBEC4C9E0786C3EE4E",
//             method: "POST"
//         });
//         auth = await response.text();
//         return auth;
//     }

//     // Time-related methods
//     _tickCount() {
//         return Date.now() - this._startTime.getTime();
//     }

//     serverTime() {
//         return this._tickCount() + this._serverTickOffset;
//     }

//     // Send ping packet
//     sendPing(socket) {
//         const pingRequest = PhotonPacketBuilder.createRequest(1)
//             .addParam(1, PhotonPacketBuilder.types.integer(this._tickCount()));
//         const pingBuffer = pingRequest.toBuffer();
//         socket.send(pingBuffer);
//     }

//     // Ping loop
//     pingLoop(socket) {
//         setInterval(() => {
//             const pingRequest = PhotonPacketBuilder.createRequest(InternalOperationCode.Ping)
//                 .addParam(1, PhotonPacketBuilder.types.integer(1000));
//             const pingBuffer = pingRequest.toBuffer();
//             socket.send(pingBuffer);
//         }, 1000);
//     }

//     // Send authentication parameters
//     sendAuthParams() {
//         const packet = PhotonPacketBuilder.createRequest(OperationCode.Authenticate)
//             .addParam(220, PhotonPacketBuilder.types.string("1.104.5_HC_1.105"))
//             .addParam(224, PhotonPacketBuilder.types.string("8c2cad3e-2e3f-4941-9044-b390ff2c4956"))
//             .addParam(210, PhotonPacketBuilder.types.string("eu/*"))
//             .addParam(225, PhotonPacketBuilder.types.string(this.generateUUID()));
//         const bufferData = packet.toBuffer();
//         this.lobbySocket.send(bufferData);
//     }

//     // Send game authentication
//     sendGameAuth(token) {
//         this.botLog("sendGameAuth -> ", token);
//         const packet = PhotonPacketBuilder.createRequest(OperationCode.Authenticate)
//             .addParam(221, PhotonPacketBuilder.types.string(token));
//         const bufferData = packet.toBuffer();
//         this.gameSocket.send(bufferData);
//     }

//     // Send join lobby request
//     sendJoinLobby(socket) {
//         const packet = PhotonPacketBuilder.createRequest(OperationCode.JoinLobby);
//         const bufferData = packet.toBuffer();
//         socket.send(bufferData);
//     }

//     // Join a room
//     joinRoom(roomName) {
//         const packet = PhotonPacketBuilder.createRequest(OperationCode.JoinGame)
//             .addParam(255, PhotonPacketBuilder.types.string(roomName));
//         const bufferData = packet.toBuffer();
//         this.lobbySocket.send(bufferData);
//     }

//     // Kick player with reason
//     kickPlayerWithReason(targetActorId, reason) {
//         const packet = PhotonPacketBuilder.createRequest(OperationCode.RaiseEvent)
//             .addParam(ParameterCode.Code, PhotonPacketBuilder.types.byte(200))
//             .addParam(ParameterCode.Cache, PhotonPacketBuilder.types.byte(0))
//             .addParam(ParameterCode.ActorList, PhotonPacketBuilder.types.intArray([targetActorId]))
//             .addParam(ParameterCode.Data, PhotonPacketBuilder.types.hashTable([
//                 [PhotonPacketBuilder.types.byte(4), PhotonPacketBuilder.types.objectArray([
//                     PhotonPacketBuilder.types.string(reason)
//                 ])],
//                 [PhotonPacketBuilder.types.byte(5), PhotonPacketBuilder.types.byte(91)],
//             ]));
//         const bufferData = packet.toBuffer();
//         this.gameSocket.send(bufferData);
//     }

//     // Send announcement
//     sendAnnouncement(text, duration) {
//         const packet = PhotonPacketBuilder.createRequest(OperationCode.RaiseEvent)
//             .addParam(ParameterCode.Code, PhotonPacketBuilder.types.byte(200))
//             .addParam(ParameterCode.Cache, PhotonPacketBuilder.types.byte(4))
//             .addParam(ParameterCode.Data, PhotonPacketBuilder.types.hashTable([
//                 [PhotonPacketBuilder.types.byte(0), PhotonPacketBuilder.types.integer(1001)],
//                 [PhotonPacketBuilder.types.byte(4), PhotonPacketBuilder.types.objectArray([
//                     PhotonPacketBuilder.types.string(text),
//                     PhotonPacketBuilder.types.float(duration),
//                 ])],
//                 [PhotonPacketBuilder.types.byte(5), PhotonPacketBuilder.types.byte(61)],
//             ]));
//         const bufferData = packet.toBuffer();
//         this.gameSocket.send(bufferData);
//     }

//     // Send authentication token
//     sendAuthToken(token) {
//         const packet = PhotonPacketBuilder.createRequest(OperationCode.RaiseEvent)
//             .addParam(ParameterCode.Code, PhotonPacketBuilder.types.byte(200))
//             .addParam(ParameterCode.Cache, PhotonPacketBuilder.types.byte(0))
//             .addParam(ParameterCode.Data, PhotonPacketBuilder.types.hashTable([
//                 [PhotonPacketBuilder.types.byte(4), PhotonPacketBuilder.types.objectArray([
//                     PhotonPacketBuilder.types.string(token)
//                 ])],
//                 [PhotonPacketBuilder.types.byte(5), PhotonPacketBuilder.types.byte(88)],
//             ]));
//         const bufferData = packet.toBuffer();
//         this.gameSocket.send(bufferData);
//     }

//     // Send join room with properties
//     sendJoinRoomWithProperties(roomName) {
//         const packet = PhotonPacketBuilder.createRequest(226);
//         packet.addParam(255, PhotonPacketBuilder.types.string(roomName));
//         const perksArray = new Uint8Array(8);
//         perksArray.set([1, 9, 14, 2, 22]);
//         const hashtable249 = PhotonPacketBuilder.types.hashTable([
//             [PhotonPacketBuilder.types.string("platform"), PhotonPacketBuilder.types.string("WebGLPlayer")],
//             [PhotonPacketBuilder.types.string("teamNumber"), PhotonPacketBuilder.types.byte(0)],
//             [PhotonPacketBuilder.types.string("rank"), PhotonPacketBuilder.types.byte(27)],
//             [PhotonPacketBuilder.types.string("killstreak"), PhotonPacketBuilder.types.byte(15)],
//             [PhotonPacketBuilder.types.string("characterCamo"), PhotonPacketBuilder.types.byte(0)],
//             [PhotonPacketBuilder.types.string("bulletTracerColor"), PhotonPacketBuilder.types.byte(1)],
//             [PhotonPacketBuilder.types.string("glovesCamo"), PhotonPacketBuilder.types.byte(16)],
//             [PhotonPacketBuilder.types.string("unlockedWeapons"), PhotonPacketBuilder.types.array(0x69, [
//                 PhotonPacketBuilder.types.integer(0),
//                 PhotonPacketBuilder.types.integer(0),
//                 PhotonPacketBuilder.types.integer(0)
//             ])],
//             [PhotonPacketBuilder.types.string("current_kills_in_killstreak"), PhotonPacketBuilder.types.integer(0)],
//             [PhotonPacketBuilder.types.string("kd"), PhotonPacketBuilder.types.float(8.511835098266602)],
//             [PhotonPacketBuilder.types.string("perks"), PhotonPacketBuilder.types.byteArray(perksArray)],
//             [PhotonPacketBuilder.types.string("current_vehicle_view_id"), PhotonPacketBuilder.types.integer(4294967295)],
//             [PhotonPacketBuilder.types.string("up_to_date_version"), PhotonPacketBuilder.types.string("1.104.5_HC")],
//             [PhotonPacketBuilder.types.string("throwable_type"), PhotonPacketBuilder.types.integer(12)],
//             [PhotonPacketBuilder.types.string("throwable_amount"), PhotonPacketBuilder.types.integer(3)],
//             [PhotonPacketBuilder.types.string("nextCreateRoomPass"), PhotonPacketBuilder.types.string("")],
//             [PhotonPacketBuilder.types.byte(255), PhotonPacketBuilder.types.string(this.username)]
//         ]);
//         packet.addParam(249, hashtable249);
//         packet.addParam(250, PhotonPacketBuilder.types.boolean(true));
//         const bufferData = packet.toBuffer();
//         this.gameSocket.send(bufferData);
//     }

//     // Handle player leave
//     handleLeave(packet, playerListJson) {
//         const currentActorList = packet.params[252].data.map(entry => entry.value);
//         const leftActorNr = this.previousActorList.find(nr => !currentActorList.includes(nr));
//         if (leftActorNr !== undefined) {
//             for (const player of playerListJson) {
//                 const username = Object.keys(player)[0];
//                 const info = player[username];
//                 if (info.actorNr === leftActorNr) {
//                     console.log(`${username} was kicked`);
//                     break;
//                 }
//             }
//         }
//         this.previousActorList = currentActorList;
//     }

//     // Filter rooms with ID
//     filterRoomsWithIdOnly(roomKeys) {
//         return roomKeys.filter(key => /\(#\d{4,6}\)/.test(key));
//     }

//     // Clean username
//     cleanUsername(rawName) {
//         let cleaned = rawName.replace(/<color=#[A-Fa-f0-9]{6}>/g, '').replace(/<\/color>/g, '');
//         cleaned = cleaned.replace(/^\[[^\]]+\]/g, '');
//         return cleaned.trim();
//     }

//     // Convert base64 to Uint8Array
//     base64toUint8Array(base64) {
//         const binaryString = atob(base64);
//         const length = binaryString.length;
//         const bytes = new Uint8Array(length);
//         for (let index = 0; index < length; index++) {
//             bytes[index] = binaryString.charCodeAt(index);
//         }
//         return bytes;
//     }

//     // Unknown packet
//     idkWhatPacketThisIs() {
//         this.gameSocket.send(this.base64toUint8Array("8wL8AAP7aAABYv9zAA5bXVBDLU5leHRUb1lvdf5pAAAAI/pvAQ==").buffer);
//     }

//     // Instantiate actor packet
//     sendInstantiateActorPacket() {
//         const packet = PhotonPacketBuilder.createRequest(253)
//             .addParam(244, PhotonPacketBuilder.types.byte(202))
//             .addParam(247, PhotonPacketBuilder.types.byte(6))
//             .addParam(252, PhotonPacketBuilder.types.array(0x69, [
//                 PhotonPacketBuilder.types.integer(35)
//             ]));
//         const bufferData = packet.toBuffer();
//         this.gameSocket.send(bufferData);
//     }

//     // Player body packet
//     sendPlayerBodyPacket() {
//         const packet = PhotonPacketBuilder.createRequest(253)
//             .addParam(244, PhotonPacketBuilder.types.byte(202))
//             .addParam(245, PhotonPacketBuilder.types.hashTable([
//                 [PhotonPacketBuilder.types.byte(0), PhotonPacketBuilder.types.string("PlayerBody")],
//                 [PhotonPacketBuilder.types.byte(6), PhotonPacketBuilder.types.integer(103197933)],
//                 [PhotonPacketBuilder.types.byte(7), PhotonPacketBuilder.types.integer(1001)]
//             ]))
//             .addParam(247, PhotonPacketBuilder.types.byte(4));
//         const bufferData = packet.toBuffer();
//         this.gameSocket.send(bufferData);
//     }

//     // Setup lobby socket event listeners
//     setupLobbySocket() {
//         this.lobbySocket.onopen = () => {
//             this.botLog("Connected to LobbyServer!");
//             this.sendPing(this.lobbySocket);
//         };

//         this.lobbySocket.onmessage = (evt) => {
//             const uint8Array = new Uint8Array(evt.data);
//             const packet = new Deserializer(uint8Array.buffer);
//             this.botLog("Lobby Socket:", packet);

//             if (packet.op_code === PacketType.InitResponse) {
//                 this.botLog("InitResponse received!");
//                 this.sendAuthParams();
//             }

//             if (packet.op_code === OperationCode.Authenticate) {
//                 if (packet.params['222']) {
//                     fs.writeFile("./lobbies.json", JSON.stringify(this.filterRoomsWithIdOnly(Object.keys(packet.params['222'])), null, 2), () => {});
//                 }
//                 if (!this.authToken) {
//                     this.botLog("AuthResponse received!");
//                     this.botLog("AuthToken", packet.params["221"]);
//                     this.botLog("UserId", packet.params["225"]);
//                     this.authToken = packet.params["221"];
//                 }
//                 this.sendJoinLobby(this.lobbySocket);
//             }

//             if (packet.op_code === EventCode.AppStats) {
//                 if (packet.debugMessage === "Game does not exists") {
//                     process.exit(0);
//                 }
//                 if (!this.serverAddress) {
//                     if (packet.params['230']) {
//                         this.serverAddress = packet.params['230'];
//                         this.botLog(this.serverAddress);
//                         this.botLog("Received join room response!");
//                         this.gameSocket = new WebSocket(this.serverAddress, "GpBinaryV16");
//                         this.setupGameSocket();
//                     }
//                 }
//             }
//         };
//     }

//     // Setup game socket event listeners
//     setupGameSocket() {
//         this.gameSocket.onclose = (event) => {
//             console.log(`Connection closed for ${this.username}: `, event.code, event.reason);
//         };

//         this.gameSocket.onopen = () => {
//             this.lobbySocket.close();
//             this._startTime = new Date();
//             this._lastPing = new Date(0);
//             this._serverTickOffset = 0;
//             this.botLog("Connected to Game Server!");
//             this.botLog("Joining room", this.roomName);
//             this.sendPing(this.gameSocket);
//             this.pingLoop(this.gameSocket);
//         };

//         this.gameSocket.onmessage = async (evt) => {
//             const uint8Array = new Uint8Array(evt.data);
//             const protocol = new Deserializer(uint8Array.buffer);
//             const packet = protocol.readPacket();
//             console.log(packet);

//             if (packet.params["249"]) {
//                 let packets = require("./packets.json");
//                 for (const [key, value] of Object.entries(packet.params["249"])) {
//                     if (!key.startsWith("int32")) continue;
//                     let actorNr = key.split(" ")[1];
//                     const name = this.cleanUsername(value["int8 255"] ?? "Unknown");
//                     let rank = value.rank?.value ?? 0;
//                     const kd = value.kd?.value ?? 0;
//                     let team = value.teamNumber?.value ?? 0;
//                     let kills = value.current_kills_in_killstreak?.value ?? 0;
//                     const platform = value.platform ?? "Unknown";
//                     let usrEntry = {};
//                     actorNr = parseInt(actorNr);
//                     rank = parseInt(rank);
//                     kills = parseInt(kills);
//                     team = parseInt(team);
//                     usrEntry[name] = { actorNr, rank, kd, team, kills, platform };
//                     packets.push(usrEntry);
//                 }
//                 fs.writeFile("./packets.json", JSON.stringify(packets, null, 2), () => {});
//                 this.botLog("Game Socket:", packet);
//             }

//             if (packet.code === PacketType.InitResponse) {
//                 this.sendGameAuth(this.authToken);
//             }

//             if (packet.code === OperationCode.Leave) {
//                 let packets = require("./packets.json");
//                 this.handleLeave(packet, packets);
//             }

//             if (packet.code === OperationCode.Authenticate) {
//                 this.sendJoinRoomWithProperties(this.roomName);
//                 this.sendInstantiateActorPacket();
//                 this.idkWhatPacketThisIs();
//                 this.sendPlayerBodyPacket();
//                 setTimeout(async () => {
//                     let auth = await this.getAuthCode();
//                     this.sendAuthToken(auth);
//                 }, 2000);
//             }
//         };
//     }

//     // Start the bot
//     start() {
//         setTimeout(() => {
//             this.joinRoom(this.roomName);
//         }, 2500);
//     }
// }
