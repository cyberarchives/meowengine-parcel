import MeowEngine from "../Browser/GlobalTypeDefs";
import FairCollection from "../Bullet Force/FairPlayAPI/FairCollection";
import PlayerList from "./Handlers/PlayerList";

export class HttpRequestManager {
    static initialize() {
        const originalFetch = window.fetch;
        window.fetch = async function(input, init = {}) {
            const requestUrl = typeof input === 'string' ? input : input.url;
            const parsedUrl = new URL(requestUrl).toString();

            if (parsedUrl.includes('leftV2')) {
                PlayerList.clearPlayerlist();

                MeowEngine.Log.Instance.info("Player list cleared");
                MeowEngine.Log.Instance.info("You left the room!");
            }

            if (parsedUrl.includes("register_in_store_match.php")) {
                PlayerList.clearPlayerlist();
            }

            if (parsedUrl.includes("get_multiplayer_auth_code.php")) {
                let result = await FairCollection.InitOperation();

                MeowEngine.Log.Instance.info(`Decoding FairCollection properties with ${result}`);
            }

            if (parsedUrl.includes("player-punish")) {
                // Temp solution, doesn't work quite yet
                const response = await originalFetch(input, init);

                let res = {
                    "status": 4,
                    "data": []
                };

                return new Response(JSON.stringify(res), {
                    status: 200,
                    statusText: 'OK',
                    headers: response.headers,
                });
            }

            return originalFetch(input, init);
        };
    }
}

export default HttpRequestManager;