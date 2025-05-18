import MeowEngine from "../../Browser/GlobalTypeDefs";
import OperationCode from "../../Photon/Enums/OperationCode";
import OnEvent from "../../Photon/Handlers/OnEventHandler";
import OpCode201 from "../../Photon/Handlers/OpCode201";
import OpRaiseEvent from "../../Photon/Handlers/OpRaiseEventHandler";
import PlayerList from "../../Photon/Handlers/PlayerList";
import ProtocolReader from "../Photon/protocol_reader/ProtocolReader";

export class Patching {
  static initPatches() {
    // Patch the RaiseEvent / Socket Send func
    OpRaiseEvent.addListener("data", ({ args, data, socket, originalSend }) => {
      if (MeowEngine.Config.debugOutgoingPackets) {
        MeowEngine.Log.Instance.info("Outgoing packet:", data);
      }

      if (
        data.code === 253 &&
        data.params &&
        data.params["245"] &&
        data.params["245"]["int8 10"] &&
        data.params["245"]["int8 10"].length > 10
      ) {
        const parser = new OpCode201(data);
        OpCode201.handleLocalPlayerUpdate(parser.parseOutgoing());
      }

      return originalSend.apply(socket, args);
    });

    // Patch the OnEvent / Message Listener for the socket constructor
    OnEvent.addListener("data", (event) => {
      if (!(event.data instanceof ArrayBuffer) || event.data.byteLength < 1) return;

      const uint8Array = new Uint8Array(event.data);

      let reader = new ProtocolReader(uint8Array.buffer);
      const packet = reader.readPacket();

      if (MeowEngine.Config.debugIncomingPackets) {
        MeowEngine.Log.Instance.info("Incoming packet:", packet);
      }

      if (packet.code == 201 && packet.params["245"]) {
        const parser = new OpCode201(packet);
        OpCode201.handlePlayerUpdate(parser.parseIncoming());
      }

      if (packet.code == OperationCode.JoinGame && packet.params["249"]) {
        PlayerList.handlePlayerList(packet);
      }

      if (packet.code == OperationCode.Leave) {
        PlayerList.handlePlayerLeave(packet);
      }

      if (packet.code == OperationCode.Join) {
        PlayerList.handlePlayerJoin(packet);
      }
    });
  }
}

export default Patching;
