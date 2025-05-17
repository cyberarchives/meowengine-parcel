import PlayerList from "./Handlers/PlayerList";

export class HttpRequestManager {
    static initialize() {
        const originalFetch = window.fetch;
        window.fetch = async function(input, init = {}) {
            const requestUrl = typeof input === 'string' ? input : input.url;
            const parsedUrl = new URL(requestUrl).toString();

            if (parsedUrl.includes('leftV2.php')) {
                PlayerList.clearPlayerlist();
            }

            return originalFetch(input, init);
        };
    }
}