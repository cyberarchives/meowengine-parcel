import MeowEngine from "../../Browser/GlobalTypeDefs";
import GameUtils from "../../Browser/Utility/GameUtils";

class RoomProperties {
    static handleRoomProps(packet) {
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
}

export default RoomProperties;