import MeowEngine from '../GlobalTypeDefs';

class GameUtils {
    static waitForUnityInstance(callback, checkInterval = 100, timeout = 10000) {
        const startTime = Date.now();
        const checkUnityInstance = () => {
            if (
                typeof unityGameInstance !== 'undefined' &&
                unityGameInstance !== null &&
                typeof unityGameInstance.SendMessage === 'function'
            ) {
                console.log('Unity instance is ready!');
                MeowEngine.UnityInstance.SendMessage = unityGameInstance.SendMessage;
                MeowEngine.UnityInstance.Module = unityGameInstance.Module;
                callback();
            } else if (Date.now() - startTime > timeout) {
                console.error('Timeout: Unity instance not ready.');
            } else {
                setTimeout(checkUnityInstance, checkInterval);
            }
        };
        checkUnityInstance();
    }

    static cleanUsername(rawName) {
        let cleaned = rawName.replaceAll(/<color=#[A-Fa-f0-9]{6}>/g, '').replaceAll('</color>', '');

        cleaned = cleaned.replaceAll(/^\[[^\]]+\]/g, '');

        return cleaned.trim();
    }
}

export default GameUtils;