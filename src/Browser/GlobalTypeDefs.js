export const MeowEngine = {
    SDK: {
        Account: null,
        FairCollection: null,
        PhotonServerSettings: {
            Protocol: "GpBinaryV16",
            Address: "game-ca-1.blayzegames.com",
            Port: 2053,
            AppId: "8c2cad3e-2e3f-4941-9044-b390ff2c4956",
            AppVersion: "1.104.5_HC_1.105",
            Region: "eu/*",
        }
    },
    PhotonClient: {
        Instance: null,
        gameSocket: null,
    },
    FairCollection: {
        InitOperation: null,
        Instance: null,
    },
    Networking: {
        TransferOwnership: null,
        Instantiate: null
    },
    LoadBalancingClient: {
        OpRaiseEvent: null
    },
    Config: {
        ToggleStates: {
            
        },
        version: "1.0.0",
        debug: false,
        debugOutgoingPackets: true,
        debugIncomingPackets: false,
        flyEnabled: false
    },
    UnityInstance: {
        Module: null,
        SendMessage: null,
    },
    RoomInstance: {
        Players: [],
    },
    Log: {
        Instance: null
    },
    LocalPlayer: {
        ActorNr: 1,
        ViewId: 1001,
        Username: "",
        Position: { x: 0, y: 0, z: 0 },
        Rotation: { w: 0, x: 0, y: 0, z: 0 },
        Pitch: 3600,
        Yaw: 3600,
        Health: 10000,
        Ping: 999,
        Perks: [],
        ClanTag: ""
    },
    CanvasConsole: {
        Log: null,
        Enabled: true
    },
    PerformancePanel: {
        Enabled: true
    }
};

export default MeowEngine;