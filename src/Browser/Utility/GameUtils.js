import MeowEngine from '../GlobalTypeDefs';
import CustomLogs from './CustomLogs';

/**
 * Utility class for game-related functionality
 */
class GameUtils {
    // Create a dedicated logger for GameUtils
    static logger = new CustomLogs({ 
        title: 'MeowEngine',
        minLevel: 'DEBUG'
    });

    /**
     * Waits for the Unity instance to be ready before executing a callback
     * @param {Function} callback - Function to execute when Unity is ready
     * @param {number} checkInterval - Interval between checks in ms
     * @param {number} timeout - Maximum time to wait in ms
     */
    static waitForUnityInstance(callback, checkInterval = 100, timeout = 10000) {
        const startTime = Date.now();
        
        GameUtils.logger.info(`Waiting for Unity instance (timeout: ${timeout}ms, interval: ${checkInterval}ms)...`);
        
        const checkUnityInstance = () => {
            // Log attempt number for debugging
            const elapsedTime = Date.now() - startTime;
            const attemptNum = Math.floor(elapsedTime / checkInterval) + 1;
            
            GameUtils.logger.debug(`Unity check attempt #${attemptNum} (${elapsedTime}ms elapsed)`);
            
            if (
                typeof unityGameInstance !== 'undefined' &&
                unityGameInstance !== null &&
                typeof unityGameInstance.SendMessage === 'function'
            ) {
                // Unity instance found
                GameUtils.logger.success('Unity instance found and ready!', {
                    timeToLoad: `${elapsedTime}ms`,
                    checks: attemptNum
                });
                
                // Store Unity instance references
                MeowEngine.UnityInstance.SendMessage = unityGameInstance.SendMessage;
                MeowEngine.UnityInstance.Module = unityGameInstance.Module;
                
                // Notify the main logger as well
                MeowEngine.Log.Instance.success('UnityInstance was found!');
                
                // Execute callback
                GameUtils.logger.info('Executing Unity ready callback');
                callback();
            } else if (elapsedTime > timeout) {
                // Timeout reached
                const errorMsg = `Timeout: Unity instance not ready after ${timeout}ms`;
                GameUtils.logger.error(errorMsg, {
                    checkAttempts: attemptNum,
                    unityGameInstanceExists: typeof unityGameInstance !== 'undefined',
                    unityGameInstanceNull: unityGameInstance === null,
                });
                console.error(errorMsg);
            } else {
                // Continue checking
                setTimeout(checkUnityInstance, checkInterval);
            }
        };
        
        // Start checking
        checkUnityInstance();
    }

    /**
     * Cleans a username by removing color tags and brackets
     * @param {string} rawName - Raw username to clean
     * @returns {string} Cleaned username
     */
    static cleanUsername(rawName) {
        GameUtils.logger.debug(`Cleaning username: "${rawName}"`);
        
        // Track changes for logging
        const changes = [];
        
        // Remove color tags
        let cleaned = rawName.replaceAll(/<color=#[A-Fa-f0-9]{6}>/g, '').replaceAll('</color>', '');
        if (cleaned !== rawName) {
            changes.push('Removed color tags');
        }
        
        // Remove leading brackets
        const beforeBracketRemoval = cleaned;
        cleaned = cleaned.replaceAll(/^\[[^\]]+\]/g, '');
        if (cleaned !== beforeBracketRemoval) {
            changes.push('Removed leading brackets');
        }
        
        // Trim whitespace
        const beforeTrim = cleaned;
        cleaned = cleaned.trim();
        if (cleaned !== beforeTrim) {
            changes.push('Trimmed whitespace');
        }
        
        GameUtils.logger.info(`Username cleaned: "${rawName}" → "${cleaned}"`, {
            changes: changes.length ? changes : 'No changes needed',
            originalLength: rawName.length,
            newLength: cleaned.length
        });
        
        return cleaned;
    }
    
    /**
     * Initialize GameUtils with custom logging settings
     * @param {Object} options - Configuration options
     */
    static init(options = {}) {
        const { logLevel, logTitle } = options;
        
        if (logLevel) {
            GameUtils.logger.setMinLevel(logLevel);
            GameUtils.logger.info(`Log level set to: ${logLevel}`);
        }
        
        if (logTitle) {
            GameUtils.logger.setTitle(logTitle);
            GameUtils.logger.info(`Logger title set to: ${logTitle}`);
        }
        
        GameUtils.logger.success('GameUtils initialized');
    }
    
    /**
     * Log a player joining the game
     * @param {string} username - Player's username
     * @param {Object} [playerData] - Additional player data
     */
    static logPlayerJoin(username, playerData = {}) {
        // Clean the username if it has formatting
        const cleanedName = GameUtils.cleanUsername(username);
        
        // Log the join event
        GameUtils.logger.join(cleanedName, {
            original: username,
            cleaned: cleanedName !== username,
            ...playerData
        });
        
        // Also log to MeowEngine if available
        if (MeowEngine.Log && MeowEngine.Log.Instance) {
            MeowEngine.Log.Instance.info(`Player joined: ${cleanedName}`);
        }
    }
    
    /**
     * Log a player leaving the game
     * @param {string} username - Player's username
     * @param {string} [reason] - Reason for leaving (disconnect, kicked, etc.)
     * @param {Object} [playerData] - Additional player data
     */
    static logPlayerLeave(username, reason = '', playerData = {}) {
        // Clean the username if it has formatting
        const cleanedName = GameUtils.cleanUsername(username);
        
        // Log the leave event
        GameUtils.logger.leave(cleanedName, reason, {
            original: username,
            cleaned: cleanedName !== username,
            ...playerData
        });
        
        // Also log to MeowEngine if available
        if (MeowEngine.Log && MeowEngine.Log.Instance) {
            const reasonText = reason ? ` (${reason})` : '';
            MeowEngine.Log.Instance.info(`Player left: ${cleanedName}${reasonText}`);
        }
    }
}

export default GameUtils;