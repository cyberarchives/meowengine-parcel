import MeowEngine from "../GlobalTypeDefs";

export class UnityMessageWrapper {

    static fly() {
        MeowEngine.UnityInstance.SendMessage(
            'GameManager',
            'InstantiateSpectator'
        );
    }

    static unfly() {
        MeowEngine.UnityInstance.SendMessage(
            'GameManager',
            'RespawnAsSpectator'
        );
    }

    static chat(m) {
        MeowEngine.UnityInstance.SendMessage(
            'Chatbox',
            'SelfSubmitMessage',
            m
        );
    }

    static respawn() {
        MeowEngine.UnityInstance.SendMessage('PlayerBody(Clone)', 'Respawn');
    }

    static becomeMasterClient() {
        MeowEngine.UnityInstance.SendMessage(
            'PlayerBody(Clone)',
            'BecomeMasterClient'
        );
    }

    static findNewMasterClient() {
        MeowEngine.UnityInstance.SendMessage( 
            'PlayerBody(Clone)',
            'FindNewMasterClient'
        );
    }

    static addKillToKillstreak() {
        MeowEngine.UnityInstance.SendMessage(
            'PlayerBody(Clone)',
            'AddKillToStreak'
        );
    }

    static local_EndMatch() {
        MeowEngine.UnityInstance.SendMessage('Match Manager', 'EndMatch');
    }

    static clearFlashbangEffect() {
        MeowEngine.UnityInstance.SendMessage(
            'GameManager/Overlay Canvas/Flash',
            'ClearFlash'
        );
    }

    static local_setTimeScale(v) {
        const max = 1.3;
        const min = 0.2;
    
        if (typeof v !== 'number' || isNaN(v) || v > max || v < min) {
            MeowEngine.Log.Instance.warn(`Invalid time scale: ${v}. Must be a number between ${min} and ${max}.`);
            return false;
        }
    
        try {
            MeowEngine.UnityInstance.SendMessage(
                'PlayerBody(Clone)',
                'SetTimeScale',
                v
            );
            return true;
        } catch (error) {
            MeowEngine.Log.Instance.error(`Failed to set time scale: ${error.message}`);
            return false;
        }
    }
}

export default UnityMessageWrapper;