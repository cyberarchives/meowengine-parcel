import MeowEngine from "../../Browser/GlobalTypeDefs";
import GameUtils from "../../Browser/Utility/GameUtils";

// New parser for the structured JSON data
export class OpCode201 {
  constructor(jsonData) {
    this.data = JSON.parse(
      typeof jsonData === "string" ? jsonData : JSON.stringify(jsonData)
    );
  }

  parseIncoming() {
    const parsed = {
      code: this.data.code,
      params: {},
    };

    // Parse the params.244 section
    if (this.data.params && this.data.params["244"]) {
      parsed.params.value = this.data.params["244"].value;
      parsed.params.size = this.data.params["244"].size;
    }

    // Parse the params.245.int8 10 array
    if (
      this.data.params &&
      this.data.params["245"] &&
      this.data.params["245"]["int8 10"]
    ) {
      const int8Array = this.data.params["245"]["int8 10"];

      // Map to the old format keys for compatibility
      parsed.photonViewId = int8Array[0]?.value || null;
      parsed.actorNr = GameUtils.viewIdToActorNr(parsed.photonViewId);
      parsed.pitch = int8Array[4]?.value || null;
      parsed.yaw = int8Array[5]?.value || null;
      parsed.number_of_kills = int8Array[6]?.value || null;
      parsed.number_of_deaths = int8Array[7]?.value || null;
      parsed.number_of_rounds = int8Array[8]?.value || null;
      parsed.ping = int8Array[9]?.value || null;
      parsed.gun_game_score = int8Array[15]?.value || null;
      parsed.velocity_x = int8Array[16]?.value || null;
      parsed.velocity_y = int8Array[17]?.value || null;
      parsed.velocity_z = int8Array[18]?.value || null;
      parsed.health = int8Array[15]?.value || null;
      parsed.accessory_type = int8Array[20]?.value || null;
      parsed.last_damager_id = int8Array[21]?.value || null;

      // Handle the vector objects
      if (int8Array[22]) {
        parsed.world_position = {
          f1: int8Array[22].f1,
          f2: int8Array[22].f2,
          f3: int8Array[22].f3,
        };
      }

      if (int8Array[23]) {
        parsed.position = {
          f1: int8Array[23].f1,
          f2: int8Array[23].f2,
          f3: int8Array[23].f3,
        };
      }

      if (int8Array[24]) {
        parsed.rotation = {
          w: int8Array[24].w,
          x: int8Array[24].x,
          y: int8Array[24].y,
          z: int8Array[24].z,
        };
      }
    }

    // Parse the other int8 values
    if (this.data.params && this.data.params["245"]) {
      if (this.data.params["245"]["int8 0"]) {
        parsed.serverTime = this.data.params["245"]["int8 0"].value;
      }

      if (this.data.params["245"]["int8 1"]) {
        parsed.s16_at_0x8D = this.data.params["245"]["int8 1"].value;
      }
    }

    return parsed;
  }

  parseOutgoing() {
    const parsed = {
      code: this.data.code,
      params: {},
    };

    // Parse the params.244 section
    if (this.data.params && this.data.params["244"]) {
      parsed.params.value = this.data.params["244"].value;
      parsed.params.size = this.data.params["244"].size;
    }

    // Parse the params.245.int8 10 array
    if (
      this.data.params &&
      this.data.params["245"] &&
      this.data.params["245"]["int8 10"]
    ) {
      const int8Array = this.data.params["245"]["int8 10"];

      // Map to the old format keys for compatibility
      parsed.photonViewId = int8Array[0]?.value || null;
      parsed.actorNr = GameUtils.viewIdToActorNr(parsed.photonViewId);
      parsed.pitch = int8Array[4]?.value || null;
      parsed.yaw = int8Array[5]?.value || null;
      parsed.number_of_kills = int8Array[6]?.value || null;
      parsed.number_of_deaths = int8Array[7]?.value || null;
      parsed.number_of_rounds = int8Array[8]?.value || null;
      parsed.ping = int8Array[9]?.value || null;
      parsed.gun_game_score = int8Array[15]?.value || null;
      parsed.velocity_x = int8Array[16]?.value || null;
      parsed.velocity_y = int8Array[17]?.value || null;
      parsed.velocity_z = int8Array[18]?.value || null;
      parsed.health = int8Array[15]?.value || null;
      parsed.accessory_type = int8Array[20]?.value || null;
      parsed.last_damager_id = int8Array[21]?.value || null;

      // Handle the vector objects
      if (int8Array[22]) {
        parsed.world_position = {
          f1: int8Array[22].f1,
          f2: int8Array[22].f2,
          f3: int8Array[22].f3,
        };
      }

      if (int8Array[23]) {
        parsed.position = {
          f1: int8Array[23].f1,
          f2: int8Array[23].f2,
          f3: int8Array[23].f3,
        };
      }

      if (int8Array[24]) {
        parsed.rotation = {
          w: int8Array[24].w,
          x: int8Array[24].x,
          y: int8Array[24].y,
          z: int8Array[24].z,
        };
      }
    }

    // Parse the other int8 values
    if (this.data.params && this.data.params["245"]) {
      if (this.data.params["245"]["int8 0"]) {
        parsed.serverTime = this.data.params["245"]["int8 0"].value;
      }

      if (this.data.params["245"]["int8 1"]) {
        parsed.s16_at_0x8D = this.data.params["245"]["int8 1"].value;
      }
    }

    return parsed;
  }

  static handlePlayerUpdate(data) {
    const playerEntry = MeowEngine.RoomInstance.Players.find(player => 
        Object.keys(player).includes(data.actorNr.toString())
    );
    
    playerEntry[data.actorNr].position = data.position;
    playerEntry[data.actorNr].rotation = data.rotation;
    playerEntry[data.actorNr].health = data.health;
    playerEntry[data.actorNr].pitch = data.pitch;
    playerEntry[data.actorNr].yaw = data.yaw;
    playerEntry[data.actorNr].ping = data.ping;
  }

  static handleLocalPlayerUpdate(data) {
    MeowEngine.LocalPlayer.Position = data.position;
    MeowEngine.LocalPlayer.Rotation = data.rotation;
    MeowEngine.LocalPlayer.Health = data.health;
    MeowEngine.LocalPlayer.Pitch = data.pitch;
    MeowEngine.LocalPlayer.Yaw = data.yaw;
    MeowEngine.LocalPlayer.Ping = data.ping;
  }
}

export default OpCode201;
