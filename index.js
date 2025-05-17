import * as $1sJCf$buffer from "buffer/";


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire3280"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire3280"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("bedNT", function(module, exports) {

var $cnOXq = parcelRequire("cnOXq");

var $8Eh5J = parcelRequire("8Eh5J");

var $l9HLO = parcelRequire("l9HLO");

var $12bcu = parcelRequire("12bcu");

var $d6Edg = parcelRequire("d6Edg");
// Return if not in the right iFrame
if (!window.location.href.includes('https://bullet-force-multiplayer.game-files.crazygames.com/unity/unity2020/bullet-force-multiplayer.html')) return;
// Wait for UnityInstance to be ready
// TODO: Add a timeout
// TODO: Add a check for the unity version
(0, $8Eh5J.default).waitForUnityInstance(()=>{
    // Ensure MeowEngine is set to window globally
    window.MeowEngine = (0, $cnOXq.default);
    // set up GlobalTypeDefs
    (0, $cnOXq.default).FairCollection.InitOperation = (0, $l9HLO.default).InitOperation;
    (0, $cnOXq.default).FairCollection.Instance = (0, $l9HLO.default);
    (0, $cnOXq.default).SDK.FairCollection = (0, $l9HLO.default);
    // Override socket to add Photon reading and writing logic
    (0, $d6Edg.default).overrideSocket();
    // Initialize UI
    // TODO: Remove the example UI elements and add a proper UI and features
    // Create the main container
    const newContainer = document.createElement('div');
    newContainer.id = `ui-container-${Date.now()}`;
    document.body.appendChild(newContainer);
    // Initialize UI
    const ui = new (0, $12bcu.UI)(newContainer.id);
    // Create tabs
    const tabs = [
        {
            label: 'Home',
            content: createHomeTab(ui)
        },
        {
            label: 'Settings',
            content: createSettingsTab(ui)
        }
    ];
    ui.createTabs(tabs);
    // Function to create Home tab content
    function createHomeTab(ui) {
        const container = document.createElement('div');
        // Welcome Label
        container.appendChild(ui.createLabel('Welcome to MeowEngine v2.0'));
        container.appendChild(ui.createSpacer('20px'));
        // Sample Text Input
        const textInput = ui.createTextInput('Enter some text', (value)=>{
            ui.createNotification('Input Received', 'info', `You entered: ${value}`, 3000);
        });
        container.appendChild(ui.createLabel('Sample Input:'));
        container.appendChild(textInput);
        container.appendChild(ui.createSpacer());
        // Sample Button
        const actionButton = ui.createButton('Click Me', ()=>{
            ui.createNotification('Button Clicked', 'info', 'You clicked the button!', 3000);
        }, null, 'Click to trigger a notification');
        container.appendChild(actionButton);
        container.appendChild(ui.createSpacer());
        // Sample Divider
        container.appendChild(ui.createDivider());
        // Sample Color Picker
        const colorPicker = ui.createColorPicker('Background Color', '#00ffaa', (color)=>{
            ui.setBackground(color);
            ui.createNotification('Color Changed', 'info', `Background set to ${color}`, 3000);
        });
        container.appendChild(colorPicker);
        return container;
    }
    // Function to create Settings tab content
    function createSettingsTab(ui) {
        const container = document.createElement('div');
        // Dark Mode Toggle
        const darkModeToggle = ui.createToggleSwitch('Dark Mode', true, (checked)=>{
            ui.toggleTheme();
            ui.createNotification('Theme Changed', 'info', checked ? 'Dark Mode' : 'Light Mode', 3000);
        }, 'Toggle dark/light theme');
        container.appendChild(darkModeToggle);
        container.appendChild(ui.createSpacer());
        // Rainbow Background Button
        const rainbowButton = ui.createButton('Start Rainbow Background', ()=>{
            ui.startRainbowBackground();
            ui.createNotification('Rainbow Started', 'info', 'Background cycling started', 3000);
        });
        container.appendChild(rainbowButton);
        container.appendChild(ui.createSpacer());
        const stopRainbowButton = ui.createButton('Stop Rainbow Background', ()=>{
            ui.stopRainbowBackground();
            ui.createNotification('Rainbow Stopped', 'info', 'Background cycling stopped', 3000);
        });
        container.appendChild(stopRainbowButton);
        return container;
    }
});

});
parcelRegister("cnOXq", function(module, exports) {

$parcel$export(module.exports, "default", () => $903f29220cef5c4c$export$2e2bcd8739ae039);
const $903f29220cef5c4c$export$979b404d080c1d6c = {
    SDK: {
        Account: null,
        FairCollection: null,
        PhotonServerSettings: {
            Protocol: "GpBinaryV16",
            Address: "game-ca-1.blayzegames.com",
            Port: 2053,
            AppId: "8c2cad3e-2e3f-4941-9044-b390ff2c4956",
            AppVersion: "1.104.5_HC_1.105",
            Region: "eu/*"
        }
    },
    PhotonClient: {
        Instance: null,
        gameSocket: null
    },
    FairCollection: {
        InitOperation: null,
        Instance: null
    },
    Networking: {
        TransferOwnership: null,
        Instantiate: null
    },
    LoadBalancingClient: {
        OpRaiseEvent: null
    },
    Config: {
        ToggleStates: {},
        version: "1.0.0",
        debug: false
    },
    UnityInstance: {
        Module: null,
        SendMessage: null
    },
    RoomInstance: {
        Players: []
    }
};
var $903f29220cef5c4c$export$2e2bcd8739ae039 = $903f29220cef5c4c$export$979b404d080c1d6c;

});

parcelRegister("8Eh5J", function(module, exports) {

$parcel$export(module.exports, "default", () => $64bf51299fba3a77$export$2e2bcd8739ae039);

var $cnOXq = parcelRequire("cnOXq");
class $64bf51299fba3a77$var$GameUtils {
    static waitForUnityInstance(callback, checkInterval = 100, timeout = 10000) {
        const startTime = Date.now();
        const checkUnityInstance = ()=>{
            if (typeof unityGameInstance !== 'undefined' && unityGameInstance !== null && typeof unityGameInstance.SendMessage === 'function') {
                console.log('Unity instance is ready!');
                (0, $cnOXq.default).UnityInstance.SendMessage = unityGameInstance.SendMessage;
                (0, $cnOXq.default).UnityInstance.Module = unityGameInstance.Module;
                callback();
            } else if (Date.now() - startTime > timeout) console.error('Timeout: Unity instance not ready.');
            else setTimeout(checkUnityInstance, checkInterval);
        };
        checkUnityInstance();
    }
    static cleanUsername(rawName) {
        let cleaned = rawName.replaceAll(/<color=#[A-Fa-f0-9]{6}>/g, '').replaceAll('</color>', '');
        cleaned = cleaned.replaceAll(/^\[[^\]]+\]/g, '');
        return cleaned.trim();
    }
}
var $64bf51299fba3a77$export$2e2bcd8739ae039 = $64bf51299fba3a77$var$GameUtils;

});

parcelRegister("l9HLO", function(module, exports) {

$parcel$export(module.exports, "default", () => $f66c641996e928f0$export$2e2bcd8739ae039);
/**
 * FairCollection - A utility class for secure data handling in browser environments.
 * 
 * Provides encryption and decryption utilities for various data types 
 * including numbers, strings, and vector objects.
 */ const $f66c641996e928f0$var$WEB_ADDRESS = "https://server.blayzegames.com/OnlineAccountSystem/fairplay_spec.php";
const $f66c641996e928f0$var$MAGIC = "1983031920131006";
const $f66c641996e928f0$var$SEC_SIZE = 16;
class $f66c641996e928f0$export$323828bb5f07a5ac {
    static #off1 = 0;
    static #off2 = 0;
    static #sec1 = new Uint8Array($f66c641996e928f0$var$SEC_SIZE);
    static #sec2 = new Uint8Array($f66c641996e928f0$var$SEC_SIZE);
    static #response = "";
    static #enabled = false;
    /**
     * Makes an initialization request to the server.
     * @private
     */ static async #initRequest() {
        try {
            const params = new URLSearchParams();
            params.append('magic', $f66c641996e928f0$var$MAGIC);
            const response = await fetch($f66c641996e928f0$var$WEB_ADDRESS, {
                method: 'POST',
                headers: {
                    accept: '*/*',
                    'accept-language': 'en-US,en;q=0.9',
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });
            if (!response.ok) throw Error(response.statusText);
            this.#response = await response.text();
        } catch (error) {
            console.error("FairCollection initialization failed:", error);
            throw error;
        }
    }
    /**
     * Initializes internal data structures from the server response.
     * @private
     */ static #initData() {
        const bytes = this.#hexStringToUint8Array(this.#response);
        if (bytes[1] !== 0) return;
        this.#off1 = bytes[3];
        this.#off2 = bytes[4];
        for(let i = 0; i < $f66c641996e928f0$var$SEC_SIZE; ++i){
            this.#sec1[i] = bytes[i + 5];
            this.#sec2[i] = bytes[i + 5 + $f66c641996e928f0$var$SEC_SIZE];
        }
        this.#enabled = true;
    }
    /**
     * Converts a hex string to Uint8Array.
     * @private
     * @param {string} hexString - The hex string to convert
     * @returns {Uint8Array} - The resulting byte array
     */ static #hexStringToUint8Array(hexString) {
        if (hexString.length % 2 !== 0) throw new Error('Hex string must have an even number of characters');
        const bytes = new Uint8Array(hexString.length / 2);
        for(let i = 0; i < hexString.length; i += 2)bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
        return bytes;
    }
    /**
     * Transforms an ArrayBuffer using the security parameters.
     * @private
     * @param {ArrayBuffer} buf - The buffer to transform
     * @param {Uint8Array} sec - The security array to use
     * @param {number} off - The offset to use
     */ static #transformArrayBuffer(buf, sec, off) {
        const bytes = new Uint8Array(buf);
        let k = 0;
        for(let i = 0; i < bytes.length; ++i){
            const secIndex = off + (k >>> 1);
            if (k & 1) bytes[i] ^= sec[secIndex] >>> 4;
            else bytes[i] ^= sec[secIndex] & 0xF;
            ++k;
            if (k >= sec.length) k = 0;
        }
    }
    /**
     * Initializes the FairCollection system.
     * Must be called before using any encryption/decryption methods.
     * @returns {Promise<void>}
     */ static async InitOperation() {
        if (!this.#enabled) {
            await this.#initRequest();
            this.#initData();
        }
    }
    /**
     * Encrypts a double precision floating point number.
     * @param {number} value - The value to encrypt
     * @returns {number} - The encrypted value
     */ static GetEncryptedDouble(value) {
        if (!this.#enabled) return value;
        const arr = new Float64Array(1);
        arr[0] = value;
        this.#transformArrayBuffer(arr.buffer, this.#sec1, this.#off1);
        return arr[0];
    }
    /**
     * Decrypts a double precision floating point number.
     * @param {number} value - The value to decrypt
     * @returns {number} - The decrypted value
     */ static GetDecryptedDouble(value) {
        if (!this.#enabled) return value;
        const arr = new Float64Array(1);
        arr[0] = value;
        this.#transformArrayBuffer(arr.buffer, this.#sec2, this.#off2);
        return arr[0];
    }
    /**
     * Encrypts a single precision floating point number.
     * @param {number} value - The value to encrypt
     * @returns {number} - The encrypted value
     */ static GetEncryptedFloat(value) {
        if (!this.#enabled) return value;
        const arr = new Float32Array(1);
        arr[0] = value;
        this.#transformArrayBuffer(arr.buffer, this.#sec1, this.#off1);
        return arr[0];
    }
    /**
     * Decrypts a single precision floating point number.
     * @param {number} value - The value to decrypt
     * @returns {number} - The decrypted value
     */ static GetDecryptedFloat(value) {
        if (!this.#enabled) return value;
        const arr = new Float32Array(1);
        arr[0] = value;
        this.#transformArrayBuffer(arr.buffer, this.#sec2, this.#off2);
        return arr[0];
    }
    /**
     * Encrypts an integer.
     * @param {number} value - The value to encrypt
     * @returns {number} - The encrypted value
     */ static GetEncryptedInteger(value) {
        if (!this.#enabled) return value;
        const arr = new Int32Array(1);
        arr[0] = value;
        this.#transformArrayBuffer(arr.buffer, this.#sec1, this.#off1);
        return arr[0];
    }
    /**
     * Decrypts an integer.
     * @param {number} value - The value to decrypt
     * @returns {number} - The decrypted value
     */ static GetDecryptedInteger(value) {
        if (!this.#enabled) return value;
        const arr = new Int32Array(1);
        arr[0] = value;
        this.#transformArrayBuffer(arr.buffer, this.#sec2, this.#off2);
        return arr[0];
    }
    /**
     * Encrypts a string.
     * @param {string} value - The string to encrypt
     * @returns {string} - The encrypted string
     */ static GetEncryptedString(value) {
        if (!this.#enabled) return value;
        const arr = new TextEncoder().encode(value);
        this.#transformArrayBuffer(arr.buffer, this.#sec1, this.#off1);
        return new TextDecoder().decode(arr);
    }
    /**
     * Decrypts a string.
     * @param {string} value - The string to decrypt
     * @returns {string} - The decrypted string
     */ static GetDecryptedString(value) {
        if (!this.#enabled) return value;
        const arr = new TextEncoder().encode(value);
        this.#transformArrayBuffer(arr.buffer, this.#sec2, this.#off2);
        return new TextDecoder().decode(arr);
    }
    /**
     * Encrypts a 2D vector.
     * @param {Object} value - The vector to encrypt {x, y}
     * @returns {Object} - The encrypted vector
     */ static GetEncryptedVector2(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetEncryptedFloat(value.x),
            y: this.GetEncryptedFloat(value.y)
        };
    }
    /**
     * Decrypts a 2D vector.
     * @param {Object} value - The vector to decrypt {x, y}
     * @returns {Object} - The decrypted vector
     */ static GetDecryptedVector2(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetDecryptedFloat(value.x),
            y: this.GetDecryptedFloat(value.y)
        };
    }
    /**
     * Encrypts a 2D integer vector.
     * @param {Object} value - The vector to encrypt {x, y}
     * @returns {Object} - The encrypted vector
     */ static GetEncryptedVector2Int(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetEncryptedInteger(value.x),
            y: this.GetEncryptedInteger(value.y)
        };
    }
    /**
     * Decrypts a 2D integer vector.
     * @param {Object} value - The vector to decrypt {x, y}
     * @returns {Object} - The decrypted vector
     */ static GetDecryptedVector2Int(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetDecryptedInteger(value.x),
            y: this.GetDecryptedInteger(value.y)
        };
    }
    /**
     * Encrypts a 3D vector.
     * @param {Object} value - The vector to encrypt {x, y, z}
     * @returns {Object} - The encrypted vector
     */ static GetEncryptedVector3(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetEncryptedFloat(value.x),
            y: this.GetEncryptedFloat(value.y),
            z: this.GetEncryptedFloat(value.z)
        };
    }
    /**
     * Decrypts a 3D vector.
     * @param {Object} value - The vector to decrypt {x, y, z}
     * @returns {Object} - The decrypted vector
     */ static GetDecryptedVector3(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetDecryptedFloat(value.x),
            y: this.GetDecryptedFloat(value.y),
            z: this.GetDecryptedFloat(value.z)
        };
    }
    /**
     * Encrypts a 3D integer vector.
     * @param {Object} value - The vector to encrypt {x, y, z}
     * @returns {Object} - The encrypted vector
     */ static GetEncryptedVector3Int(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetEncryptedInteger(value.x),
            y: this.GetEncryptedInteger(value.y),
            z: this.GetEncryptedInteger(value.z)
        };
    }
    /**
     * Decrypts a 3D integer vector.
     * @param {Object} value - The vector to decrypt {x, y, z}
     * @returns {Object} - The decrypted vector
     */ static GetDecryptedVector3Int(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetDecryptedInteger(value.x),
            y: this.GetDecryptedInteger(value.y),
            z: this.GetDecryptedInteger(value.z)
        };
    }
    /**
     * Encrypts a 4D vector.
     * @param {Object} value - The vector to encrypt {x, y, z, w}
     * @returns {Object} - The encrypted vector
     */ static GetEncryptedVector4(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetEncryptedFloat(value.x),
            y: this.GetEncryptedFloat(value.y),
            z: this.GetEncryptedFloat(value.z),
            w: this.GetEncryptedFloat(value.w)
        };
    }
    /**
     * Decrypts a 4D vector.
     * @param {Object} value - The vector to decrypt {x, y, z, w}
     * @returns {Object} - The decrypted vector
     */ static GetDecryptedVector4(value) {
        if (!this.#enabled) return value;
        return {
            x: this.GetDecryptedFloat(value.x),
            y: this.GetDecryptedFloat(value.y),
            z: this.GetDecryptedFloat(value.z),
            w: this.GetDecryptedFloat(value.w)
        };
    }
}
var $f66c641996e928f0$export$2e2bcd8739ae039 = $f66c641996e928f0$export$323828bb5f07a5ac;

});

parcelRegister("12bcu", function(module, exports) {

$parcel$export(module.exports, "UI", () => $0c0eaa801b08ff6f$export$4b08aed5f1ec6952);
const $0c0eaa801b08ff6f$var$notifications = [];
class $0c0eaa801b08ff6f$export$4b08aed5f1ec6952 {
    constructor(containerId){
        this.notifications = [];
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found!');
            return;
        }
        // Initialize core properties
        this.isVisible = true;
        this.isDarkMode = true;
        this.activeTab = null;
        this.tabContents = {};
        // Setup container styling
        this.setupContainer();
        this.makeDraggable();
        this.addBackgroundLayers();
        this.addHeader('MeowEngine v2.0');
        // Create layout structure with side panel
        this.createPanelLayout();
    }
    setupContainer() {
        const styles = {
            fontFamily: "'JetBrains Mono', 'Consolas', 'Courier New', monospace",
            color: '#00ffaa',
            background: 'rgba(8, 8, 12, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0, 255, 170, 0.2)',
            borderRadius: '6px',
            width: '800px',
            height: '550px',
            margin: '0',
            position: 'fixed',
            top: '50px',
            right: '10px',
            zIndex: '10002',
            transition: 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 255, 170, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        };
        Object.assign(this.container.style, styles);
        // Add global styles
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');

            /* Custom scrollbar */
            ::-webkit-scrollbar {
                width: 4px;
                height: 4px;
            }
            ::-webkit-scrollbar-track {
                background: rgba(8, 8, 12, 0.5);
            }
            ::-webkit-scrollbar-thumb {
                background: rgba(0, 255, 170, 0.3);
                border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 255, 170, 0.5);
            }

            /* Animations */
            @keyframes glowPulse {
                0% { box-shadow: 0 0 5px rgba(0, 255, 170, 0.3); }
                50% { box-shadow: 0 0 10px rgba(0, 255, 170, 0.5); }
                100% { box-shadow: 0 0 5px rgba(0, 255, 170, 0.3); }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(styleElement);
    }
    createPanelLayout() {
        // Create main panel container
        this.panelContainer = document.createElement('div');
        this.panelContainer.style.display = 'flex';
        this.panelContainer.style.flex = '1';
        this.panelContainer.style.overflow = 'hidden';
        // Create side tab navigation
        this.sideNav = document.createElement('div');
        this.sideNav.style.width = '60px';
        this.sideNav.style.borderRight = '1px solid rgba(0, 255, 170, 0.15)';
        this.sideNav.style.display = 'flex';
        this.sideNav.style.flexDirection = 'column';
        this.sideNav.style.background = 'rgba(5, 5, 8, 0.8)';
        this.sideNav.style.padding = '10px 0';
        this.sideNav.style.gap = '8px';
        this.sideNav.style.alignItems = 'center';
        // Create content area
        this.contentArea = document.createElement('div');
        this.contentArea.style.flex = '1';
        this.contentArea.style.overflowY = 'auto';
        this.contentArea.style.padding = '15px';
        this.contentArea.style.position = 'relative';
        // Assemble panel layout
        this.panelContainer.appendChild(this.sideNav);
        this.panelContainer.appendChild(this.contentArea);
        this.container.appendChild(this.panelContainer);
    }
    addHeader(title) {
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.padding = '10px 15px';
        header.style.borderBottom = '1px solid rgba(0, 255, 170, 0.15)';
        header.style.background = 'rgba(5, 5, 8, 0.7)';
        const titleElement = document.createElement('div');
        titleElement.textContent = title;
        titleElement.style.fontWeight = '600';
        titleElement.style.fontSize = '14px';
        titleElement.style.color = '#00ffaa';
        titleElement.style.textShadow = '0 0 8px rgba(0, 255, 170, 0.6)';
        titleElement.style.letterSpacing = '1px';
        const controlsContainer = document.createElement('div');
        controlsContainer.style.display = 'flex';
        controlsContainer.style.gap = '8px';
        const minimizeButton = document.createElement('div');
        minimizeButton.innerHTML = '&#8722;'; // Minus sign
        minimizeButton.style.cursor = 'pointer';
        minimizeButton.style.color = '#00ffaa';
        minimizeButton.style.fontSize = '18px';
        minimizeButton.style.width = '22px';
        minimizeButton.style.height = '22px';
        minimizeButton.style.display = 'flex';
        minimizeButton.style.alignItems = 'center';
        minimizeButton.style.justifyContent = 'center';
        minimizeButton.style.borderRadius = '4px';
        minimizeButton.style.transition = 'background 0.2s';
        minimizeButton.addEventListener('mouseover', ()=>{
            minimizeButton.style.background = 'rgba(0, 255, 170, 0.15)';
        });
        minimizeButton.addEventListener('mouseout', ()=>{
            minimizeButton.style.background = 'transparent';
        });
        minimizeButton.addEventListener('click', ()=>this.minimize());
        const closeButton = document.createElement('div');
        closeButton.innerHTML = '&#10005;'; // Cross symbol
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#00ffaa';
        closeButton.style.fontSize = '14px';
        closeButton.style.width = '22px';
        closeButton.style.height = '22px';
        closeButton.style.display = 'flex';
        closeButton.style.alignItems = 'center';
        closeButton.style.justifyContent = 'center';
        closeButton.style.borderRadius = '4px';
        closeButton.style.transition = 'all 0.2s';
        closeButton.addEventListener('mouseover', ()=>{
            closeButton.style.background = 'rgba(255, 50, 50, 0.3)';
            closeButton.style.color = '#ff5050';
        });
        closeButton.addEventListener('mouseout', ()=>{
            closeButton.style.background = 'transparent';
            closeButton.style.color = '#00ffaa';
        });
        closeButton.addEventListener('click', ()=>this.hide());
        controlsContainer.appendChild(minimizeButton);
        controlsContainer.appendChild(closeButton);
        header.appendChild(titleElement);
        header.appendChild(controlsContainer);
        this.container.appendChild(header);
    }
    minimize() {
        if (this.isMinimized) {
            this.container.style.height = '400px';
            this.panelContainer.style.display = 'flex';
            this.isMinimized = false;
        } else {
            this.container.style.height = 'auto';
            this.panelContainer.style.display = 'none';
            this.isMinimized = true;
        }
    }
    createTabs(tabs) {
        // Clear existing tabs
        this.sideNav.innerHTML = '';
        this.contentArea.innerHTML = '';
        // Create tabs in side navigation
        tabs.forEach((tab, index)=>{
            const tabElement = this.createSideTab(tab, index === 0);
            this.sideNav.appendChild(tabElement);
            // Create content container for this tab
            const contentContainer = document.createElement('div');
            contentContainer.classList.add('tab-content');
            contentContainer.style.display = index === 0 ? 'block' : 'none';
            contentContainer.style.height = '100%';
            contentContainer.style.animation = 'fadeIn 0.3s ease-out';
            // Store reference to content container
            this.tabContents[tab.label] = contentContainer;
            // Add tab content
            if (tab.content) contentContainer.appendChild(tab.content);
            this.contentArea.appendChild(contentContainer);
        });
        // Set initial active tab
        this.activeTab = tabs[0].label;
    }
    createSideTab(tab, isActive = false) {
        const tabElement = document.createElement('div');
        tabElement.classList.add('side-tab');
        tabElement.style.width = '48px';
        tabElement.style.height = '48px';
        tabElement.style.display = 'flex';
        tabElement.style.flexDirection = 'column';
        tabElement.style.alignItems = 'center';
        tabElement.style.justifyContent = 'center';
        tabElement.style.cursor = 'pointer';
        tabElement.style.borderRadius = '6px';
        tabElement.style.transition = 'all 0.2s ease';
        tabElement.style.padding = '4px';
        tabElement.style.position = 'relative';
        tabElement.style.background = isActive ? 'rgba(0, 255, 170, 0.15)' : 'transparent';
        // Add active indicator
        if (isActive) {
            const activeIndicator = document.createElement('div');
            activeIndicator.style.position = 'absolute';
            activeIndicator.style.left = '0';
            activeIndicator.style.top = '8px';
            activeIndicator.style.bottom = '8px';
            activeIndicator.style.width = '3px';
            activeIndicator.style.borderRadius = '0 3px 3px 0';
            activeIndicator.style.background = '#00ffaa';
            activeIndicator.style.boxShadow = '0 0 8px rgba(0, 255, 170, 0.6)';
            tabElement.appendChild(activeIndicator);
        }
        // Icon container
        const iconContainer = document.createElement('div');
        iconContainer.style.width = '24px';
        iconContainer.style.height = '24px';
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = 'center';
        iconContainer.style.justifyContent = 'center';
        iconContainer.style.marginBottom = '4px';
        // Icon (use SVG or image if provided, otherwise first letter)
        if (tab.icon) {
            const iconElement = document.createElement('img');
            iconElement.src = tab.icon;
            iconElement.alt = `${tab.label} icon`;
            iconElement.style.width = '20px';
            iconElement.style.height = '20px';
            iconElement.style.filter = 'brightness(0) saturate(100%) invert(92%) sepia(14%) saturate(2063%) hue-rotate(97deg) brightness(104%) contrast(104%)';
            iconContainer.appendChild(iconElement);
        } else {
            // Create text icon with first letter
            const textIcon = document.createElement('div');
            textIcon.textContent = tab.label.charAt(0).toUpperCase();
            textIcon.style.fontSize = '16px';
            textIcon.style.fontWeight = 'bold';
            textIcon.style.color = '#00ffaa';
            iconContainer.appendChild(textIcon);
        }
        // Label
        const labelElement = document.createElement('div');
        labelElement.textContent = tab.label;
        labelElement.style.fontSize = '9px';
        labelElement.style.textTransform = 'uppercase';
        labelElement.style.color = '#00ffaa';
        labelElement.style.letterSpacing = '0.5px';
        labelElement.style.textAlign = 'center';
        labelElement.style.maxWidth = '100%';
        labelElement.style.overflow = 'hidden';
        labelElement.style.textOverflow = 'ellipsis';
        labelElement.style.whiteSpace = 'nowrap';
        tabElement.appendChild(iconContainer);
        tabElement.appendChild(labelElement);
        // Hover effects
        tabElement.addEventListener('mouseover', ()=>{
            if (this.activeTab !== tab.label) tabElement.style.background = 'rgba(0, 255, 170, 0.08)';
        });
        tabElement.addEventListener('mouseout', ()=>{
            if (this.activeTab !== tab.label) tabElement.style.background = 'transparent';
        });
        // Click handler to switch tabs
        tabElement.addEventListener('click', ()=>{
            this.switchToTab(tab.label);
        });
        return tabElement;
    }
    switchToTab(tabLabel) {
        // Hide all content
        Object.keys(this.tabContents).forEach((label)=>{
            this.tabContents[label].style.display = 'none';
        });
        // Show selected content
        if (this.tabContents[tabLabel]) {
            this.tabContents[tabLabel].style.display = 'block';
            this.tabContents[tabLabel].style.animation = 'fadeIn 0.3s ease-out';
        }
        // Update active tab styling
        const tabs = this.sideNav.querySelectorAll('.side-tab');
        tabs.forEach((tab)=>{
            const isActive = tab.querySelector('div:nth-child(2)').textContent === tabLabel;
            tab.style.background = isActive ? 'rgba(0, 255, 170, 0.15)' : 'transparent';
            // Remove existing indicator
            const indicator = tab.querySelector('div[style*="position: absolute"]');
            if (indicator) tab.removeChild(indicator);
            // Add indicator to active tab
            if (isActive) {
                const activeIndicator = document.createElement('div');
                activeIndicator.style.position = 'absolute';
                activeIndicator.style.left = '0';
                activeIndicator.style.top = '8px';
                activeIndicator.style.bottom = '8px';
                activeIndicator.style.width = '3px';
                activeIndicator.style.borderRadius = '0 3px 3px 0';
                activeIndicator.style.background = '#00ffaa';
                activeIndicator.style.boxShadow = '0 0 8px rgba(0, 255, 170, 0.6)';
                tab.appendChild(activeIndicator);
            }
        });
        this.activeTab = tabLabel;
    }
    show() {
        this.container.style.opacity = '1';
        this.container.style.visibility = 'visible';
        this.isVisible = true;
    }
    hide() {
        this.container.style.opacity = '0';
        this.container.style.visibility = 'hidden';
        this.isVisible = false;
    }
    toggleVisibility() {
        if (this.isVisible) this.hide();
        else this.show();
    }
    addBackgroundLayers() {
        this.backgroundImageLayer = document.createElement('div');
        this.backgroundImageLayer.style.position = 'absolute';
        this.backgroundImageLayer.style.top = '0';
        this.backgroundImageLayer.style.left = '0';
        this.backgroundImageLayer.style.right = '0';
        this.backgroundImageLayer.style.bottom = '0';
        this.backgroundImageLayer.style.zIndex = '-2';
        this.backgroundImageLayer.style.backgroundSize = 'cover';
        this.backgroundImageLayer.style.backgroundPosition = 'center';
        this.backgroundImageLayer.style.backgroundRepeat = 'no-repeat';
        this.backgroundImageLayer.style.opacity = '0.15';
        this.container.style.overflow = 'hidden';
        this.container.appendChild(this.backgroundImageLayer);
        // Add subtle pattern overlay
        const patternOverlay = document.createElement('div');
        patternOverlay.style.position = 'absolute';
        patternOverlay.style.top = '0';
        patternOverlay.style.left = '0';
        patternOverlay.style.right = '0';
        patternOverlay.style.bottom = '0';
        patternOverlay.style.zIndex = '-1';
        patternOverlay.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zm-16 4h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zm-16 4h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z\' fill=\'%2300ffaa\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")';
        patternOverlay.style.opacity = '0.5';
        this.container.appendChild(patternOverlay);
    }
    setBackground(background) {
        if (background.startsWith('url(') || background.startsWith('http')) {
            const url = background.startsWith('url(') ? background : `url(${background})`;
            this.backgroundImageLayer.style.backgroundImage = url;
            this.backgroundImageLayer.style.animation = 'fadeIn 0.3s ease';
        } else this.container.style.background = background;
    }
    createLabel(text) {
        const label = document.createElement('div');
        label.textContent = text.toUpperCase();
        label.style.marginBottom = '8px';
        label.style.fontSize = '11px';
        label.style.fontWeight = '600';
        label.style.color = '#00ffaa';
        label.style.textShadow = '0 0 3px rgba(0, 255, 170, 0.4)';
        label.style.letterSpacing = '0.8px';
        label.style.position = 'relative';
        label.style.paddingLeft = '12px';
        // Add accent mark before label
        const accent = document.createElement('div');
        accent.style.position = 'absolute';
        accent.style.left = '0';
        accent.style.top = '50%';
        accent.style.transform = 'translateY(-50%)';
        accent.style.width = '4px';
        accent.style.height = '4px';
        accent.style.borderRadius = '50%';
        accent.style.background = '#00ffaa';
        accent.style.boxShadow = '0 0 5px rgba(0, 255, 170, 0.7)';
        label.appendChild(accent);
        return label;
    }
    createToggleSwitch(label = '', initialState = false, onChange = null, toolTip = '') {
        const toggleContainer = document.createElement('div');
        toggleContainer.style.display = 'flex';
        toggleContainer.style.alignItems = 'center';
        toggleContainer.style.justifyContent = 'space-between';
        toggleContainer.style.marginBottom = '6px';
        toggleContainer.style.padding = '8px 10px';
        toggleContainer.style.borderRadius = '5px';
        toggleContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        toggleContainer.style.backdropFilter = 'blur(5px)';
        toggleContainer.style.border = '1px solid rgba(0, 255, 170, 0.08)';
        toggleContainer.style.transition = 'all 0.2s ease';
        toggleContainer.style.minHeight = '20px';
        toggleContainer.style.position = 'relative';
        if (label) {
            const labelElement = document.createElement('div');
            labelElement.textContent = label.toUpperCase();
            labelElement.style.fontSize = '11px';
            labelElement.style.color = '#00ffaa';
            labelElement.style.marginRight = '8px';
            labelElement.style.flex = '1';
            labelElement.style.lineHeight = '1';
            labelElement.style.overflow = 'hidden';
            labelElement.style.letterSpacing = '0.5px';
            toggleContainer.appendChild(labelElement);
        }
        const switchContainer = document.createElement('div');
        switchContainer.style.position = 'relative';
        switchContainer.style.width = '36px';
        switchContainer.style.height = '18px';
        switchContainer.style.borderRadius = '10px';
        switchContainer.style.background = initialState ? 'rgba(0, 255, 170, 0.3)' : 'rgba(0, 0, 0, 0.3)';
        switchContainer.style.cursor = 'pointer';
        switchContainer.style.flexShrink = '0';
        switchContainer.style.transition = 'background 0.2s ease';
        const slider = document.createElement('div');
        slider.style.position = 'absolute';
        slider.style.top = '2px';
        slider.style.left = initialState ? '18px' : '2px';
        slider.style.width = '14px';
        slider.style.height = '14px';
        slider.style.borderRadius = '50%';
        slider.style.background = '#00ffaa';
        slider.style.boxShadow = initialState ? '0 0 8px rgba(0, 255, 170, 0.6)' : 'none';
        slider.style.transition = 'all 0.2s ease';
        // Add tooltip if provided
        if (toolTip) {
            const tooltip = document.createElement('div');
            tooltip.textContent = toolTip;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
            tooltip.style.color = '#00ffaa';
            tooltip.style.padding = '6px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '11px';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.bottom = '125%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%) translateY(5px)';
            tooltip.style.zIndex = '100';
            tooltip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.8)';
            tooltip.style.border = '1px solid rgba(0, 255, 170, 0.2)';
            toggleContainer.appendChild(tooltip);
            let hoverTimeout;
            toggleContainer.addEventListener('mouseover', ()=>{
                hoverTimeout = setTimeout(()=>{
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                }, 300);
            });
            toggleContainer.addEventListener('mouseout', ()=>{
                clearTimeout(hoverTimeout);
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(5px)';
            });
        }
        // Add click interaction
        switchContainer.addEventListener('click', ()=>{
            const isEnabled = switchContainer.style.background.includes('0, 255, 170');
            switchContainer.style.background = isEnabled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 255, 170, 0.3)';
            slider.style.left = isEnabled ? '2px' : '18px';
            slider.style.boxShadow = isEnabled ? 'none' : '0 0 8px rgba(0, 255, 170, 0.6)';
            if (onChange) onChange(!isEnabled);
        });
        // Hover effects
        toggleContainer.addEventListener('mouseover', ()=>{
            toggleContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            toggleContainer.style.borderColor = 'rgba(0, 255, 170, 0.15)';
        });
        toggleContainer.addEventListener('mouseout', ()=>{
            toggleContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            toggleContainer.style.borderColor = 'rgba(0, 255, 170, 0.08)';
        });
        switchContainer.appendChild(slider);
        toggleContainer.appendChild(switchContainer);
        window.featureCount++;
        return toggleContainer;
    }
    createButton(label, onClick, container = null, toolTip = '') {
        const button = document.createElement('button');
        button.textContent = label.toUpperCase();
        button.style.margin = '5px 0';
        button.style.padding = '8px 12px';
        button.style.border = '1px solid rgba(0, 255, 170, 0.2)';
        button.style.borderRadius = '5px';
        button.style.background = 'rgba(0, 15, 10, 0.6)';
        button.style.color = '#00ffaa';
        button.style.fontWeight = '600';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.2s ease';
        button.style.fontSize = '11px';
        button.style.flex = '1';
        button.style.position = 'relative';
        button.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        button.style.letterSpacing = '0.5px';
        button.style.textTransform = 'uppercase';
        button.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
        button.style.overflow = 'hidden';
        // Add subtle highlight/gradient
        const highlight = document.createElement('div');
        highlight.style.position = 'absolute';
        highlight.style.top = '0';
        highlight.style.left = '0';
        highlight.style.right = '0';
        highlight.style.height = '40%';
        highlight.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent)';
        highlight.style.pointerEvents = 'none';
        button.appendChild(highlight);
        // Add tooltip if provided
        if (toolTip) {
            const tooltip = document.createElement('div');
            tooltip.textContent = toolTip;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
            tooltip.style.color = '#00ffaa';
            tooltip.style.padding = '6px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '11px';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.bottom = '125%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%) translateY(5px)';
            tooltip.style.zIndex = '100';
            tooltip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.8)';
            tooltip.style.border = '1px solid rgba(0, 255, 170, 0.2)';
            button.appendChild(tooltip);
            let hoverTimeout;
            button.addEventListener('mouseover', ()=>{
                hoverTimeout = setTimeout(()=>{
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                }, 300);
            });
            button.addEventListener('mouseout', ()=>{
                clearTimeout(hoverTimeout);
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(5px)';
            });
        }
        // Hover & active states
        button.addEventListener('mouseover', ()=>{
            button.style.background = 'rgba(0, 255, 170, 0.15)';
            button.style.borderColor = 'rgba(0, 255, 170, 0.3)';
        });
        button.addEventListener('mouseout', ()=>{
            button.style.background = 'rgba(0, 15, 10, 0.6)';
            button.style.borderColor = 'rgba(0, 255, 170, 0.2)';
        });
        button.addEventListener('click', onClick);
        if (container) container.appendChild(button);
        window.featureCount++;
        return button;
    }
    createTextInput(placeholder, onEnter = null) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.style.marginBottom = '8px';
        input.style.padding = '8px 12px';
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';
        input.style.border = '1px solid rgba(0, 255, 170, 0.2)';
        input.style.borderRadius = '5px';
        input.style.background = 'rgba(5, 5, 8, 0.7)';
        input.style.color = '#00ffaa';
        input.style.fontSize = '12px';
        input.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        input.style.outline = 'none';
        input.style.transition = 'all 0.2s ease';
        input.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
        input.addEventListener('focus', ()=>{
            input.style.borderColor = 'rgba(0, 255, 170, 0.4)';
            input.style.boxShadow = '0 0 8px rgba(0, 255, 170, 0.3)';
        });
        input.addEventListener('blur', ()=>{
            input.style.borderColor = 'rgba(0, 255, 170, 0.2)';
            input.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
        });
        input.addEventListener('keydown', (e)=>{
            if (e.key === 'Enter' && onEnter) {
                let value = input.value.trim();
                if (value && value.startsWith('https') && !value.startsWith('url(')) value = `url(${value})`;
                onEnter(value);
            }
        });
        window.featureCount++;
        return input;
    }
    createSlider(min, max, value, step, label = '', onChange = null) {
        const sliderContainer = document.createElement('div');
        sliderContainer.style.margin = '10px 0';
        sliderContainer.style.padding = '8px 10px';
        sliderContainer.style.borderRadius = '5px';
        sliderContainer.style.background = 'rgba(0, 0, 0, 0.2)';
        sliderContainer.style.border = '1px solid rgba(0, 255, 170, 0.08)';
        if (label) {
            const labelElement = this.createLabel(label);
            sliderContainer.appendChild(labelElement);
        }
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.step = step;
        slider.style.width = '100%';
        slider.style.height = '8px';
        slider.style.background = 'rgba(0, 255, 170, 0.2)';
        slider.style.borderRadius = '4px';
        slider.style.outline = 'none';
        slider.style.accentColor = '#00ffaa';
        slider.style.cursor = 'pointer';
        const valueLabel = document.createElement('div');
        valueLabel.textContent = value;
        valueLabel.style.color = '#00ffaa';
        valueLabel.style.fontSize = '11px';
        valueLabel.style.marginTop = '8px';
        valueLabel.style.textAlign = 'right';
        slider.addEventListener('input', ()=>{
            valueLabel.textContent = slider.value;
            if (onChange) onChange(slider.value);
        });
        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(valueLabel);
        window.featureCount++;
        return sliderContainer;
    }
    createDropdown(options, selectedValue = '', onChange = null, label = '') {
        const dropdownContainer = document.createElement('div');
        dropdownContainer.style.margin = '10px 0';
        dropdownContainer.style.padding = '8px 10px';
        dropdownContainer.style.borderRadius = '5px';
        dropdownContainer.style.background = 'rgba(0, 0, 0, 0.2)';
        dropdownContainer.style.border = '1px solid rgba(0, 255, 170, 0.08)';
        if (label) {
            const labelElement = this.createLabel(label);
            dropdownContainer.appendChild(labelElement);
        }
        const dropdown = document.createElement('select');
        dropdown.style.width = '100%';
        dropdown.style.padding = '8px 12px';
        dropdown.style.border = '1px solid rgba(0, 255, 170, 0.2)';
        dropdown.style.borderRadius = '5px';
        dropdown.style.background = 'rgba(5, 5, 8, 0.7)';
        dropdown.style.color = '#00ffaa';
        dropdown.style.fontSize = '12px';
        dropdown.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        dropdown.style.outline = 'none';
        dropdown.style.appearance = 'none';
        dropdown.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E%3Cpath fill=%27%2300ffaa%27 d=%27M7 10l5 5 5-5z%27/%3E%3C/svg%3E")';
        dropdown.style.backgroundRepeat = 'no-repeat';
        dropdown.style.backgroundPosition = 'right 8px center';
        dropdown.style.backgroundSize = '16px';
        options.forEach((option)=>{
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            if (option.value === selectedValue) opt.selected = true;
            dropdown.appendChild(opt);
        });
        dropdown.addEventListener('change', (e)=>{
            if (onChange) onChange(e.target.value);
        });
        dropdownContainer.appendChild(dropdown);
        window.featureCount++;
        return dropdownContainer;
    }
    createConsoleLogBox() {
        const logBox = document.createElement('div');
        logBox.classList.add('console-log-box');
        logBox.style.padding = '10px';
        logBox.style.background = 'rgba(5, 5, 8, 0.8)';
        logBox.style.color = '#00ffaa';
        logBox.style.height = '380px';
        logBox.style.overflowY = 'auto';
        logBox.style.border = '1px solid rgba(0, 255, 170, 0.15)';
        logBox.style.borderRadius = '5px';
        logBox.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        logBox.style.fontSize = '11px';
        logBox.style.margin = '10px 0';
        Log.storedLogs = [];
        Log.customLog = (message, color = '#00ffaa')=>{
            const split = message.split('\n');
            split.forEach((msg)=>{
                const logMessage = document.createElement('div');
                logMessage.textContent = msg;
                logMessage.style.marginBottom = '4px';
                logMessage.style.color = color;
                logBox.appendChild(logMessage);
                Log.storedLogs.push({
                    element: logMessage,
                    message: msg,
                    color: color
                });
                logBox.scrollTop = logBox.scrollHeight;
            });
        };
        window.featureCount++;
        return logBox;
    }
    createDynamicListBox() {
        const listBox = document.createElement('div');
        listBox.classList.add('dynamic-list-box');
        listBox.style.padding = '10px';
        listBox.style.background = 'rgba(5, 5, 8, 0.8)';
        listBox.style.color = '#00ffaa';
        listBox.style.height = '150px';
        listBox.style.overflowY = 'auto';
        listBox.style.border = '1px solid rgba(0, 255, 170, 0.15)';
        listBox.style.borderRadius = '5px';
        listBox.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        listBox.style.fontSize = '11px';
        listBox.style.margin = '10px 0';
        const ListManager = {
            items: {},
            addItem: (key, content, color = '#00ffaa')=>{
                if (ListManager.items[key]) return;
                const listItem = document.createElement('div');
                listItem.textContent = content;
                listItem.style.marginBottom = '4px';
                listItem.style.color = color;
                listBox.appendChild(listItem);
                ListManager.items[key] = listItem;
                listBox.scrollTop = listBox.scrollHeight;
            },
            removeItem: (key)=>{
                if (!ListManager.items[key]) return;
                listBox.removeChild(ListManager.items[key]);
                delete ListManager.items[key];
            },
            updateItem: (key, content, color = '#00ffaa')=>{
                if (!ListManager.items[key]) return;
                ListManager.items[key].textContent = content;
                ListManager.items[key].style.color = color;
            },
            clearAll: ()=>{
                Object.keys(ListManager.items).forEach((key)=>{
                    if (ListManager.items[key].parentNode === listBox) listBox.removeChild(ListManager.items[key]);
                });
                ListManager.items = {};
            }
        };
        listBox.ListManager = ListManager;
        window.featureCount++;
        return {
            listBox: listBox,
            ListManager: ListManager
        };
    }
    createColorPicker(label, defaultColor = '#00ffaa', onChange = null) {
        const pickerContainer = document.createElement('div');
        pickerContainer.style.display = 'flex';
        pickerContainer.style.alignItems = 'center';
        pickerContainer.style.margin = '10px 0';
        pickerContainer.style.padding = '8px 10px';
        pickerContainer.style.borderRadius = '5px';
        pickerContainer.style.background = 'rgba(0, 0, 0, 0.2)';
        pickerContainer.style.border = '1px solid rgba(0, 255, 170, 0.08)';
        const pickerLabel = this.createLabel(label);
        pickerContainer.appendChild(pickerLabel);
        const pickerInput = document.createElement('input');
        pickerInput.type = 'color';
        pickerInput.value = defaultColor;
        pickerInput.style.width = '30px';
        pickerInput.style.height = '30px';
        pickerInput.style.border = 'none';
        pickerInput.style.borderRadius = '4px';
        pickerInput.style.cursor = 'pointer';
        pickerInput.style.background = 'transparent';
        pickerInput.style.marginLeft = 'auto';
        pickerInput.addEventListener('input', ()=>{
            if (onChange) onChange(pickerInput.value);
        });
        pickerContainer.appendChild(pickerInput);
        window.featureCount++;
        return pickerContainer;
    }
    createConfirmModal(message, onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.background = 'rgba(8, 8, 12, 0.95)';
        modal.style.padding = '20px';
        modal.style.borderRadius = '6px';
        modal.style.border = '1px solid rgba(0, 255, 170, 0.2)';
        modal.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.8)';
        modal.style.zIndex = '10003';
        modal.style.color = '#00ffaa';
        modal.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        modal.style.maxWidth = '400px';
        modal.style.width = '90%';
        const text = document.createElement('p');
        text.textContent = message;
        text.style.fontSize = '13px';
        text.style.marginBottom = '20px';
        text.style.textAlign = 'center';
        modal.appendChild(text);
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px';
        const yesButton = this.createButton('Confirm', ()=>{
            document.body.removeChild(modal);
            if (onConfirm) onConfirm();
        }, null, 'Confirm the action');
        const noButton = this.createButton('Cancel', ()=>{
            document.body.removeChild(modal);
            if (onCancel) onCancel();
        }, null, 'Cancel the action');
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        modal.appendChild(buttonContainer);
        document.body.appendChild(modal);
        return modal;
    }
    createButtonGroup(buttons) {
        const buttonGroup = document.createElement('div');
        buttonGroup.style.display = 'flex';
        buttonGroup.style.gap = '8px';
        buttonGroup.style.margin = '10px 0';
        buttonGroup.style.flexWrap = 'wrap';
        buttons.forEach((btnConfig)=>{
            const button = this.createButton(btnConfig.label, btnConfig.onClick, buttonGroup, btnConfig.toolTip);
        });
        return buttonGroup;
    }
    createToggleGroup(toggles) {
        const groupContainer = document.createElement('div');
        groupContainer.style.display = 'grid';
        groupContainer.style.gap = '8px';
        groupContainer.style.margin = '10px 0';
        toggles.forEach(({ label: label, initialState: initialState, onChange: onChange, toolTip: toolTip })=>{
            const toggle = this.createToggleSwitch(label, initialState, onChange, toolTip);
            groupContainer.appendChild(toggle);
        });
        return groupContainer;
    }
    createDivider() {
        const divider = document.createElement('div');
        divider.style.borderTop = '1px solid rgba(0, 255, 170, 0.15)';
        divider.style.margin = '10px 0';
        return divider;
    }
    createSpacer(height = '10px') {
        const spacer = document.createElement('div');
        spacer.style.height = height;
        spacer.style.width = '100%';
        return spacer;
    }
    addSpacer(height = '10px', container = null) {
        const spacer = this.createSpacer(height);
        if (container) container.appendChild(spacer);
        return spacer;
    }
    makeDraggable() {
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        const header = this.container.querySelector('div[style*="border-bottom"]');
        if (!header) return;
        header.style.cursor = 'move';
        header.addEventListener('mousedown', (e)=>{
            isDragging = true;
            startX = e.clientX - (parseInt(this.container.style.right) || 10);
            startY = e.clientY - (parseInt(this.container.style.top) || 50);
            this.container.style.transition = 'none';
        });
        document.addEventListener('mousemove', (e)=>{
            if (isDragging) {
                this.container.style.right = `${window.innerWidth - e.clientX - startX}px`;
                this.container.style.top = `${e.clientY - startY}px`;
            }
        });
        document.addEventListener('mouseup', ()=>{
            isDragging = false;
            this.container.style.transition = 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)';
        });
        this.container.addEventListener('selectstart', (e)=>{
            e.preventDefault();
        });
    }
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            this.container.style.background = 'rgba(8, 8, 12, 0.95)';
            this.container.style.color = '#00ffaa';
            this.setBackground('rgba(8, 8, 12, 0.95)');
        } else {
            this.container.style.background = 'rgba(240, 240, 240, 0.95)';
            this.container.style.color = '#008855';
            this.setBackground('rgba(240, 240, 240, 0.95)');
        }
        // Update child elements
        const elements = this.container.querySelectorAll('[style*="color"]');
        elements.forEach((el)=>{
            el.style.color = this.isDarkMode ? '#00ffaa' : '#008855';
        });
    }
    startRainbowBackground() {
        const colors = [
            '#ff0000',
            '#ff7f00',
            '#ffff00',
            '#00ff00',
            '#0000ff',
            '#4b0082',
            '#9400d3'
        ];
        let index = 0;
        this.stopRainbowBackground();
        this.rainbowInterval = setInterval(()=>{
            this.setBackground(colors[index]);
            index = (index + 1) % colors.length;
        }, 1000);
    }
    stopRainbowBackground() {
        if (this.rainbowInterval) {
            clearInterval(this.rainbowInterval);
            this.rainbowInterval = null;
            this.setBackground('rgba(8, 8, 12, 0.95)');
        }
    }
    createNotification(title, type = 'info', message, duration = 3000) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = `${$0c0eaa801b08ff6f$var$notifications.length * 60 + 20}px`;
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '6px';
        notification.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        notification.style.fontSize = '12px';
        notification.style.zIndex = '10004';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(20px)';
        notification.style.transition = 'all 0.3s ease';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        notification.style.maxWidth = '300px';
        const titleElement = document.createElement('div');
        titleElement.textContent = title;
        titleElement.style.fontWeight = '600';
        titleElement.style.marginBottom = '4px';
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.fontSize = '11px';
        messageElement.style.opacity = '0.9';
        notification.appendChild(titleElement);
        notification.appendChild(messageElement);
        switch(type){
            case 'success':
                notification.style.background = 'rgba(0, 150, 0, 0.9)';
                notification.style.border = '1px solid rgba(0, 255, 0, 0.3)';
                notification.style.color = '#ffffff';
                break;
            case 'error':
                notification.style.background = 'rgba(150, 0, 0, 0.9)';
                notification.style.border = '1px solid rgba(255, 0, 0, 0.3)';
                notification.style.color = '#ffffff';
                break;
            case 'warning':
                notification.style.background = 'rgba(150, 100, 0, 0.9)';
                notification.style.border = '1px solid rgba(255, 165, 0, 0.3)';
                notification.style.color = '#ffffff';
                break;
            default:
                notification.style.background = 'rgba(8, 8, 12, 0.95)';
                notification.style.border = '1px solid rgba(0, 255, 170, 0.2)';
                notification.style.color = '#00ffaa';
        }
        document.body.appendChild(notification);
        $0c0eaa801b08ff6f$var$notifications.push(notification);
        // Animate in
        setTimeout(()=>{
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        // Animate out
        setTimeout(()=>{
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(20px)';
            setTimeout(()=>{
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                    $0c0eaa801b08ff6f$var$notifications.splice($0c0eaa801b08ff6f$var$notifications.indexOf(notification), 1);
                    // Adjust positions of remaining notifications
                    $0c0eaa801b08ff6f$var$notifications.forEach((n, i)=>{
                        n.style.bottom = `${i * 60 + 20}px`;
                    });
                }
            }, 300);
        }, duration);
        return notification;
    }
}
var $0c0eaa801b08ff6f$export$2e2bcd8739ae039 = $0c0eaa801b08ff6f$export$4b08aed5f1ec6952;

});

parcelRegister("d6Edg", function(module, exports) {

$parcel$export(module.exports, "default", () => $98ab0755bbc4a697$export$2e2bcd8739ae039);

var $cnOXq = parcelRequire("cnOXq");

var $iI9yw = parcelRequire("iI9yw");

var $3d6MC = parcelRequire("3d6MC");

var $eRDgW = parcelRequire("eRDgW");

var $2Am9p = parcelRequire("2Am9p");
class $98ab0755bbc4a697$export$c91428cbd4f5850d {
    static overrideSocket() {
        const originalSend = WebSocket.prototype.send;
        const OriginalWebSocket = WebSocket;
        window.WebSocket = function(url, protocols) {
            const socket = new OriginalWebSocket(url, protocols);
            var photonClient = new (0, $2Am9p.PhotonClient)({
                originalSend: originalSend,
                socket: socket
            });
            (0, $cnOXq.default).PhotonClient.Instance = photonClient;
            (0, $cnOXq.default).Networking.Instantiate = photonClient.Instantiate;
            (0, $cnOXq.default).Networking.TransferOwnership = photonClient.TransferOwnership;
            (0, $cnOXq.default).LoadBalancingClient.OpRaiseEvent = photonClient.OpRaiseEvent;
            (0, $cnOXq.default).PhotonClient.gameSocket = socket;
            socket.send = function(...args) {
                const message = args[0];
                if (!(message instanceof ArrayBuffer)) return originalSend.apply(this, args);
                const uint8Array = new Uint8Array(message);
                // Initialize the reader with the data
                let reader = new (0, $iI9yw.default)(uint8Array.buffer);
                const packet = reader.readPacket();
                console.log("Sending packet:", packet);
                originalSend.apply(this, args);
            };
            $98ab0755bbc4a697$export$c91428cbd4f5850d.bindEventListeners();
        };
    }
    static bindEventListeners() {
        this.addListener((0, $cnOXq.default).PhotonClient.gameSocket, "message", (event)=>{
            const uint8Array = new Uint8Array(event.data);
            // Initialize the reader with the data
            let reader = new (0, $iI9yw.default)(uint8Array.buffer);
            const packet = reader.readPacket();
            console.log("Received packet:", packet);
            // Check if the packet has a parameter with the key, 249
            if (packet.code == (0, $3d6MC.default).JoinGame && packet.params["249"]) // Loop through entries in the packet
            (0, $eRDgW.default).handleRoomProps(packet);
        });
    }
    static removeListener(socket, event, callback) {
        socket.removeEventListener(event, callback);
    }
    static addListener(socket, event, callback) {
        socket.addEventListener(event, callback);
    }
}
var $98ab0755bbc4a697$export$2e2bcd8739ae039 = $98ab0755bbc4a697$export$c91428cbd4f5850d;

});
parcelRegister("iI9yw", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "ProtocolReader", () => $d9f3bfa63c32e7e4$export$30afd0d1dfcfaf9c);
$parcel$export(module.exports, "default", () => $d9f3bfa63c32e7e4$export$2e2bcd8739ae039);

var $atijC = parcelRequire("atijC");

var $6SPLy = parcelRequire("6SPLy");

var $9uhPw = parcelRequire("9uhPw");

var $5rBbR = parcelRequire("5rBbR");

var $3gYQQ = parcelRequire("3gYQQ");

var $kWe2N = parcelRequire("kWe2N");

const $d9f3bfa63c32e7e4$var$Buffer = $1sJCf$buffer.Buffer;
class $d9f3bfa63c32e7e4$export$30afd0d1dfcfaf9c {
    constructor(buffer){
        this.buffer = $d9f3bfa63c32e7e4$var$Buffer.from(buffer);
        this.offset = 0;
    }
    readValue(type = null) {
        type = type ?? this.readUint8();
        switch(type){
            case (0, $atijC.DataType).NullValue:
                return null;
            case (0, $atijC.DataType).Dictionary:
                throw new Error('Unimplemented data type Dictionary');
            case (0, $atijC.DataType).StringArray:
                return this.readStringArray();
            case (0, $atijC.DataType).Byte:
                return (0, $3gYQQ.SizedInt).read(this, 1);
            case (0, $atijC.DataType).Custom:
                return (0, $9uhPw.CustomData).read(this);
            case (0, $atijC.DataType).Double:
                return (0, $5rBbR.SizedFloat).read(this, 8);
            case (0, $atijC.DataType).EventData:
                throw new Error('Unimplemented data type EventData');
            case (0, $atijC.DataType).Float:
                return (0, $5rBbR.SizedFloat).read(this, 4);
            case (0, $atijC.DataType).Hashtable:
                return this.readHashTable();
            case (0, $atijC.DataType).Integer:
                return (0, $3gYQQ.SizedInt).read(this, 4);
            case (0, $atijC.DataType).Short:
                return (0, $3gYQQ.SizedInt).read(this, 2);
            case (0, $atijC.DataType).Long:
                return (0, $3gYQQ.SizedInt).read(this, 8);
            case (0, $atijC.DataType).IntegerArray:
                return this.readIntArray();
            case (0, $atijC.DataType).Bool:
                return this.readUint8() !== 0;
            case (0, $atijC.DataType).OperationResponse:
                throw new Error('Unimplemented data type OperationResponse');
            case (0, $atijC.DataType).OperationRequest:
                throw new Error('Unimplemented data type OperationRequest');
            case (0, $atijC.DataType).String:
                return this.readString();
            case (0, $atijC.DataType).ByteArray:
                return this.readByteArray();
            case (0, $atijC.DataType).Array:
                return (0, $6SPLy.ProtocolArray).read(this);
            case (0, $atijC.DataType).ObjectArray:
                return this.readObjectArray();
            default:
                throw new Error(`Unknown data type ${type}`);
        }
    }
    readPacket() {
        const magic = this.readUint8();
        if (magic !== 0xF3) throw new Error(`Invalid magic byte: ${magic}`);
        const type = this.readUint8();
        switch(type){
            case (0, $atijC.PacketType).Init:
                throw new Error('Init packet parsing not implemented');
            case (0, $atijC.PacketType).InitResponse:
                return (0, $kWe2N.InitResponse).read(this);
            case (0, $atijC.PacketType).Operation:
                return (0, $kWe2N.OperationRequest).read(this);
            case (0, $atijC.PacketType).OperationResponse:
                return (0, $kWe2N.OperationResponse).read(this);
            case (0, $atijC.PacketType).Event:
                return (0, $kWe2N.Event).read(this);
            case (0, $atijC.PacketType).InternalOperationRequest:
                return (0, $kWe2N.InternalOperationRequest).read(this);
            case (0, $atijC.PacketType).InternalOperationResponse:
                return (0, $kWe2N.InternalOperationResponse).read(this);
            case (0, $atijC.PacketType).Disconnect:
                console.log('Received Disconnect packet');
                return {
                    type: 'Disconnect'
                };
            case (0, $atijC.PacketType).InitResponse:
                return new (0, $kWe2N.InitResponse)();
            case (0, $atijC.PacketType).Message:
            case (0, $atijC.PacketType).RawMessage:
                throw new Error(`Unimplemented packet type ${type}`);
            default:
                throw new Error(`Unknown packet type ${type}`);
        }
    }
    readString() {
        const len = this.readUint16();
        if (len === 0) return '';
        const str = this.buffer.toString('utf8', this.offset, this.offset + len);
        this.offset += len;
        return str;
    }
    readByteArray() {
        const len = this.readInt32();
        const data = this.buffer.slice(this.offset, this.offset + len);
        this.offset += len;
        return data;
    }
    readIntArray() {
        const len = this.readInt32();
        const list = new Int32Array(len);
        for(let i = 0; i < len; i++)list[i] = this.readInt32();
        return list;
    }
    readStringArray() {
        const len = this.readInt16();
        const list = new Array(len);
        for(let i = 0; i < len; i++)list[i] = this.readString();
        return list;
    }
    readObjectArray() {
        const len = this.readUint16();
        const list = new Array(len);
        for(let i = 0; i < len; i++)list[i] = this.readValue();
        return list;
    }
    readHashTable() {
        const value = {};
        const len = this.readInt16();
        for(let i = 0; i < len; i++){
            const key = this.readValue();
            const val = this.readValue();
            value[key] = val;
        }
        return value;
    }
    readParameterTable() {
        const value = {};
        const len = this.readInt16();
        for(let i = 0; i < len; i++){
            const key = this.readUint8();
            const val = this.readValue();
            value[key] = val;
        }
        return value;
    }
    readUint8() {
        const value = this.buffer.readUInt8(this.offset);
        this.offset += 1;
        return value;
    }
    readInt8() {
        const value = this.buffer.readInt8(this.offset);
        this.offset += 1;
        return value;
    }
    readUint16() {
        const value = this.buffer.readUInt16BE(this.offset);
        this.offset += 2;
        return value;
    }
    readInt16() {
        const value = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return value;
    }
    readInt32() {
        const value = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return value;
    }
    readInt64() {
        const value = this.buffer.readBigInt64BE(this.offset);
        this.offset += 8;
        return Number(value);
    }
    readFloat32() {
        const value = this.buffer.readFloatBE(this.offset);
        this.offset += 4;
        return value;
    }
    readFloat64() {
        const value = this.buffer.readDoubleBE(this.offset);
        this.offset += 8;
        return value;
    }
    read(length) {
        const data = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return data;
    }
}
var $d9f3bfa63c32e7e4$export$2e2bcd8739ae039 = $d9f3bfa63c32e7e4$export$30afd0d1dfcfaf9c;

});
parcelRegister("atijC", function(module, exports) {

$parcel$export(module.exports, "DataType", () => $79fad1daec32d983$export$45c69700ee30a78c);
$parcel$export(module.exports, "PacketType", () => $79fad1daec32d983$export$84d4095e16c6fc19);
class $79fad1daec32d983$export$45c69700ee30a78c {
    static NullValue = 42;
    static Dictionary = 68;
    static StringArray = 97;
    static Byte = 98;
    static Custom = 99;
    static Double = 100;
    static EventData = 101;
    static Float = 102;
    static Hashtable = 104;
    static Integer = 105;
    static Short = 107;
    static Long = 108;
    static IntegerArray = 110;
    static Bool = 111;
    static OperationResponse = 112;
    static OperationRequest = 113;
    static String = 115;
    static ByteArray = 120;
    static Array = 121;
    static ObjectArray = 122;
}
class $79fad1daec32d983$export$84d4095e16c6fc19 {
    static Init = 0;
    static InitResponse = 1;
    static Operation = 2;
    static OperationResponse = 3;
    static Event = 4;
    static InternalOperationRequest = 6;
    static InternalOperationResponse = 7;
    static Message = 8;
    static RawMessage = 9;
    static Disconnect = 5;
}
class $79fad1daec32d983$export$a5e61cd3c11c8828 {
    static InitEncryption = 0;
    static Ping = 1;
}
class $79fad1daec32d983$export$6e71357f8f04bc3e {
    static GetGameList = 217;
    static ServerSettings = 218;
    static WebRpc = 219;
    static GetRegions = 220;
    static GetLobbyStats = 221;
    static FindFriends = 222;
    static CancelJoinRandom = 224;
    static JoinRandomGame = 225;
    static JoinGame = 226;
    static CreateGame = 227;
    static LeaveLobby = 228;
    static JoinLobby = 229;
    static Authenticate = 230;
    static AuthenticateOnce = 231;
    static ChangeGroups = 248;
    static ExchangeKeysForEncryption = 250;
    static GetProperties = 251;
    static SetProperties = 252;
    static RaiseEvent = 253;
    static Leave = 254;
    static Join = 255;
}
class $79fad1daec32d983$export$321530e93eee298c {
    static AzureNodeInfo = 210;
    static AuthEvent = 223;
    static LobbyStats = 224;
    static AppStats = 226;
    static Match = 227;
    static QueueState = 228;
    static GameListUpdate = 229;
    static GameList = 230;
    static CacheSliceChanged = 250;
    static ErrorInfo = 251;
    static PropertiesChanged = 253;
    static SetProperties = 253;
    static Leave = 254;
    static Join = 255;
}
class $79fad1daec32d983$export$33c90a15721f7830 {
    static FindFriendsRequestList = 1;
    static FindFriendsResponseOnlineList = 1;
    static FindFriendsOptions = 2;
    static FindFriendsResponseRoomIdList = 2;
    static RoomOptionFlags = 191;
    static EncryptionData = 192;
    static EncryptionMode = 193;
    static CustomInitData = 194;
    static ExpectedProtocol = 195;
    static PluginVersion = 200;
    static PluginName = 201;
    static NickName = 202;
    static MasterClientId = 203;
    static Plugins = 204;
    static CacheSliceIndex = 205;
    static WebRpcReturnMessage = 206;
    static WebRpcReturnCode = 207;
    static AzureMasterNodeId = 208;
    static WebRpcParameters = 208;
    static AzureLocalNodeId = 209;
    static UriPath = 209;
    static AzureNodeInfo = 210;
    static Region = 210;
    static LobbyStats = 211;
    static LobbyType = 212;
    static LobbyName = 213;
    static ClientAuthenticationData = 214;
    static CreateIfNotExists = 215;
    static JoinMode = 215;
    static ClientAuthenticationParams = 216;
    static ClientAuthenticationType = 217;
    static Info = 218;
    static AppVersion = 220;
    static Secret = 221;
    static GameList = 222;
    static MatchMakingType = 223;
    static Position = 223;
    static ApplicationId = 224;
    static UserId = 225;
    static MasterPeerCount = 227;
    static GameCount = 228;
    static PeerCount = 229;
    static Address = 230;
    static ExpectedValues = 231;
    static CheckUserOnJoin = 232;
    static IsComingBack = 233;
    static IsInactive = 233;
    static EventForward = 234;
    static PlayerTTL = 235;
    static EmptyRoomTTL = 236;
    static SuppressRoomEvents = 237;
    static Add = 238;
    static PublishUserId = 239;
    static Remove = 239;
    static Group = 240;
    static CleanupCacheOnLeave = 241;
    static Code = 244;
    static CustomEventContent = 245;
    static Data = 245;
    static ReceiverGroup = 246;
    static Cache = 247;
    static GameProperties = 248;
    static PlayerProperties = 249;
    static Broadcast = 250;
    static Properties = 251;
    static ActorList = 252;
    static TargetActorNr = 253;
    static ActorNr = 254;
    static RoomName = 255;
}
var $79fad1daec32d983$export$2e2bcd8739ae039 = {
    DataType: $79fad1daec32d983$export$45c69700ee30a78c,
    PacketType: $79fad1daec32d983$export$84d4095e16c6fc19,
    InternalOperationCode: $79fad1daec32d983$export$a5e61cd3c11c8828,
    OperationCode: $79fad1daec32d983$export$6e71357f8f04bc3e,
    EventCode: $79fad1daec32d983$export$321530e93eee298c,
    ParameterCode: $79fad1daec32d983$export$33c90a15721f7830
};

});

parcelRegister("6SPLy", function(module, exports) {

$parcel$export(module.exports, "ProtocolArray", () => $502ff0e428748dd1$export$4532e8701b7ca2d6);

var $atijC = parcelRequire("atijC");

var $iD72m = parcelRequire("iD72m");
class $502ff0e428748dd1$export$4532e8701b7ca2d6 extends (0, $iD72m.default) {
    constructor(innerDataType, data){
        super();
        this.innerDataType = innerDataType;
        this.data = data;
    }
    static read(reader) {
        const len = reader.readUint16();
        const innerDataType = reader.readUint8();
        const data = new Array(len);
        for(let i = 0; i < len; i++)data[i] = reader.readValue(innerDataType);
        return new $502ff0e428748dd1$export$4532e8701b7ca2d6(innerDataType, data);
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.DataType).Array);
    }
    writeValue(writer) {
        writer.writeUint16(this.data.length);
        writer.writeUint8(this.innerDataType);
        for (const obj of this.data)writer.writeValue(obj, false);
    }
    toString() {
        return `ProtocolArray ${this.innerDataType}: ${JSON.stringify(this.data)}`;
    }
}
var $502ff0e428748dd1$export$2e2bcd8739ae039 = $502ff0e428748dd1$export$4532e8701b7ca2d6;

});
parcelRegister("iD72m", function(module, exports) {

$parcel$export(module.exports, "Serializable", () => $d90153e9fe6d016c$export$64782a6a7800f48c);
$parcel$export(module.exports, "default", () => $d90153e9fe6d016c$export$2e2bcd8739ae039);
class $d90153e9fe6d016c$export$64782a6a7800f48c {
    writeType(writer) {
        throw new Error('writeType must be implemented');
    }
    writeValue(writer) {
        throw new Error('writeValue must be implemented');
    }
}
var $d90153e9fe6d016c$export$2e2bcd8739ae039 = $d90153e9fe6d016c$export$64782a6a7800f48c;

});


parcelRegister("9uhPw", function(module, exports) {

$parcel$export(module.exports, "CustomData", () => $6e84bf16e2a83356$export$33e476ffe0c539da);

var $atijC = parcelRequire("atijC");

var $iD72m = parcelRequire("iD72m");

var $9JJLM = parcelRequire("9JJLM");




class $6e84bf16e2a83356$export$33e476ffe0c539da extends (0, $iD72m.Serializable) {
    constructor(){
        super();
    }
    static read(reader) {
        const typeCode = reader.readUint8();
        const len = reader.readUint16();
        const data = reader.read(len);
        const tempReader = new (parcelRequire("iI9yw"))(data);
        switch(typeCode){
            case 86:
                const { Vector3: Vector3 } = (parcelRequire("hEcwv"));
                return Vector3.read(tempReader);
            case 81:
                const { Quaternion: Quaternion } = (parcelRequire("h2rRG"));
                return Quaternion.read(tempReader);
            default:
                const { UnimplementedCustomData: UnimplementedCustomData } = (parcelRequire("bdw8G"));
                return new UnimplementedCustomData(typeCode, data);
        }
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.DataType).Custom);
    }
    writeValue(writer) {
        writer.writeUint8(this.typeCode);
        const data = this.getBytes();
        writer.writeUint16(data.length);
        writer.write(data);
    }
    write(writer) {
        throw new Error('write must be implemented');
    }
    getBytes() {
        const writer = new (0, $9JJLM.default)();
        this.write(writer);
        return writer.toBytes();
    }
    toString() {
        return `CustomData ${this.typeCode} ${this.getBytes().toString('hex')}`;
    }
}
var $6e84bf16e2a83356$export$2e2bcd8739ae039 = $6e84bf16e2a83356$export$33e476ffe0c539da;

});
parcelRegister("9JJLM", function(module, exports) {

$parcel$export(module.exports, "default", () => $716bd1e9c0ca6074$export$2e2bcd8739ae039);

var $atijC = parcelRequire("atijC");

const $716bd1e9c0ca6074$var$Buffer = $1sJCf$buffer.Buffer;
class $716bd1e9c0ca6074$export$ea69f93a488f088a {
    constructor(){
        this.buffers = [];
        this.length = 0;
    }
    writePacket(packet) {
        this.writeUint8(0xF3);
        this.writeValue(packet);
    }
    writeValue(value, writeType = true) {
        if (value === null || value === undefined) {
            if (writeType) this.writeUint8((0, $atijC.DataType).NullValue);
            return;
        }
        if (value instanceof Array && value.every((item)=>typeof item === 'string')) {
            if (writeType) this.writeUint8((0, $atijC.DataType).StringArray);
            this.writeStringArray(value);
        } else if (value.writeType && value.writeValue) {
            if (writeType) value.writeType(this);
            value.writeValue(this);
        } else if (value instanceof Object && !(value instanceof Array)) {
            if (writeType) this.writeUint8((0, $atijC.DataType).Hashtable);
            const entries = Object.entries(value);
            this.writeUint16(entries.length);
            for (const [key, val] of entries){
                this.writeValue(key);
                this.writeValue(val);
            }
        } else if (value instanceof Int32Array) {
            if (writeType) this.writeUint8((0, $atijC.DataType).IntegerArray);
            this.writeInt32(value.length);
            for (const num of value)this.writeInt32(num);
        } else if (typeof value === 'boolean') {
            if (writeType) this.writeUint8((0, $atijC.DataType).Bool);
            this.writeUint8(value ? 1 : 0);
        } else if (typeof value === 'string') {
            if (writeType) this.writeUint8((0, $atijC.DataType).String);
            this.writeString(value);
        } else if (value instanceof $716bd1e9c0ca6074$var$Buffer) {
            if (writeType) this.writeUint8((0, $atijC.DataType).ByteArray);
            this.writeInt32(value.length);
            this.write(value);
        } else if (value instanceof Array) {
            if (writeType) this.writeUint8((0, $atijC.DataType).ObjectArray);
            this.writeInt16(value.length);
            for (const item of value)this.writeValue(item);
        } else throw new Error(`Cannot serialize '${value}' (type: ${typeof value})`);
    }
    writeStringArray(strings) {
        this.writeInt16(strings.length);
        for (const str of strings)this.writeString(str);
    }
    writeString(str) {
        const bytes = $716bd1e9c0ca6074$var$Buffer.from(str, 'utf8');
        this.writeUint16(bytes.length);
        this.write(bytes);
    }
    writeParameterTable(params) {
        const entries = Object.entries(params);
        this.writeUint16(entries.length);
        for (const [key, value] of entries){
            this.writeUint8(Number(key));
            this.writeValue(value);
        }
    }
    writeUint8(value) {
        const buf = $716bd1e9c0ca6074$var$Buffer.alloc(1);
        buf.writeUInt8(value);
        this.buffers.push(buf);
        this.length += 1;
    }
    writeInt8(value) {
        const buf = $716bd1e9c0ca6074$var$Buffer.alloc(1);
        buf.writeInt8(value);
        this.buffers.push(buf);
        this.length += 1;
    }
    writeUint16(value) {
        const buf = $716bd1e9c0ca6074$var$Buffer.alloc(2);
        buf.writeUInt16BE(value);
        this.buffers.push(buf);
        this.length += 2;
    }
    writeInt16(value) {
        const buf = $716bd1e9c0ca6074$var$Buffer.alloc(2);
        buf.writeInt16BE(value);
        this.buffers.push(buf);
        this.length += 2;
    }
    writeInt32(value) {
        const buf = $716bd1e9c0ca6074$var$Buffer.alloc(4);
        buf.writeInt32BE(value);
        this.buffers.push(buf);
        this.length += 4;
    }
    writeInt64(value) {
        const buf = $716bd1e9c0ca6074$var$Buffer.alloc(8);
        buf.writeBigInt64BE(BigInt(value));
        this.buffers.push(buf);
        this.length += 8;
    }
    writeFloat32(value) {
        const buf = $716bd1e9c0ca6074$var$Buffer.alloc(4);
        buf.writeFloatBE(value);
        this.buffers.push(buf);
        this.length += 4;
    }
    writeFloat64(value) {
        const buf = $716bd1e9c0ca6074$var$Buffer.alloc(8);
        buf.writeDoubleBE(value);
        this.buffers.push(buf);
        this.length += 8;
    }
    write(bytes) {
        this.buffers.push($716bd1e9c0ca6074$var$Buffer.from(bytes));
        this.length += bytes.length;
    }
    toBytes() {
        return $716bd1e9c0ca6074$var$Buffer.concat(this.buffers, this.length);
    }
}
var $716bd1e9c0ca6074$export$2e2bcd8739ae039 = $716bd1e9c0ca6074$export$ea69f93a488f088a;

});

parcelRegister("hEcwv", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "Vector3", () => $cd8fe2f02101e5cc$export$64b5c384219d3699);
$parcel$export(module.exports, "default", () => $cd8fe2f02101e5cc$export$2e2bcd8739ae039);

var $9uhPw = parcelRequire("9uhPw");
class $cd8fe2f02101e5cc$export$64b5c384219d3699 extends (0, $9uhPw.CustomData) {
    static TypeCode = 86;
    constructor(f1, f2, f3){
        super();
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
    }
    get typeCode() {
        return $cd8fe2f02101e5cc$export$64b5c384219d3699.TypeCode;
    }
    static read(reader) {
        const f1 = reader.readFloat32();
        const f2 = reader.readFloat32();
        const f3 = reader.readFloat32();
        return new $cd8fe2f02101e5cc$export$64b5c384219d3699(f1, f2, f3);
    }
    write(writer) {
        writer.writeFloat32(this.f1);
        writer.writeFloat32(this.f2);
        writer.writeFloat32(this.f3);
    }
    toString() {
        return `Vector3(${this.f1},${this.f2},${this.f3})`;
    }
}
var $cd8fe2f02101e5cc$export$2e2bcd8739ae039 = $cd8fe2f02101e5cc$export$64b5c384219d3699;

});

parcelRegister("h2rRG", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "Quaternion", () => $c6783cf1917cf4c4$export$23d6a54f0bbc85a3);
$parcel$export(module.exports, "default", () => $c6783cf1917cf4c4$export$2e2bcd8739ae039);

var $9uhPw = parcelRequire("9uhPw");
class $c6783cf1917cf4c4$export$23d6a54f0bbc85a3 extends (0, $9uhPw.CustomData) {
    static TypeCode = 81;
    constructor(w, x, y, z){
        super();
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get typeCode() {
        return $c6783cf1917cf4c4$export$23d6a54f0bbc85a3.TypeCode;
    }
    static read(reader) {
        const w = reader.readFloat32();
        const x = reader.readFloat32();
        const y = reader.readFloat32();
        const z = reader.readFloat32();
        return new $c6783cf1917cf4c4$export$23d6a54f0bbc85a3(w, x, y, z);
    }
    write(writer) {
        writer.writeFloat32(this.w);
        writer.writeFloat32(this.x);
        writer.writeFloat32(this.y);
        writer.writeFloat32(this.z);
    }
    toString() {
        return `Quaternion(w=${this.w}, x=${this.x}, y=${this.y}, z=${this.z})`;
    }
}
var $c6783cf1917cf4c4$export$2e2bcd8739ae039 = $c6783cf1917cf4c4$export$23d6a54f0bbc85a3;

});

parcelRegister("bdw8G", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "UnimplementedCustomData", () => $82a9d6c58a975a10$export$5762eb36fd9a444e);
$parcel$export(module.exports, "default", () => $82a9d6c58a975a10$export$2e2bcd8739ae039);

var $9uhPw = parcelRequire("9uhPw");
class $82a9d6c58a975a10$export$5762eb36fd9a444e extends (0, $9uhPw.CustomData) {
    constructor(typeCode, data){
        super();
        this._typeCode = typeCode;
        this.data = data;
    }
    get typeCode() {
        return this._typeCode;
    }
    write(writer) {
        writer.write(this.data);
    }
}
var $82a9d6c58a975a10$export$2e2bcd8739ae039 = $82a9d6c58a975a10$export$5762eb36fd9a444e;

});


parcelRegister("5rBbR", function(module, exports) {

$parcel$export(module.exports, "SizedFloat", () => $3f6c52939dfd86bc$export$23c4e50d47dcaa25);

var $atijC = parcelRequire("atijC");

var $iD72m = parcelRequire("iD72m");
class $3f6c52939dfd86bc$export$23c4e50d47dcaa25 extends (0, $iD72m.Serializable) {
    constructor(value, size){
        super();
        this.value = value;
        this.size = size;
        this._checkSize();
    }
    static float(value) {
        return new $3f6c52939dfd86bc$export$23c4e50d47dcaa25(value, 4);
    }
    static double(value) {
        return new $3f6c52939dfd86bc$export$23c4e50d47dcaa25(value, 8);
    }
    static read(reader, size) {
        const value = size === 4 ? reader.readFloat32() : reader.readFloat64();
        return new $3f6c52939dfd86bc$export$23c4e50d47dcaa25(value, size);
    }
    writeType(writer) {
        switch(this.size){
            case 4:
                writer.writeUint8((0, $atijC.DataType).Float);
                break;
            case 8:
                writer.writeUint8((0, $atijC.DataType).Double);
                break;
            default:
                throw new Error(`Invalid SizedFloat size ${this.size}`);
        }
    }
    writeValue(writer) {
        switch(this.size){
            case 4:
                writer.writeFloat32(this.value);
                break;
            case 8:
                writer.writeFloat64(this.value);
                break;
            default:
                throw new Error(`Invalid SizedFloat size ${this.size}`);
        }
    }
    _checkSize() {
        if (this.value == null) throw new Error('Null value not allowed');
        if (this.size > 8) throw new Error('Size is greater than 8');
        if (this.size !== 4 && this.size !== 8) throw new Error(`Size ${this.size} is not 4 or 8`);
    }
    toString() {
        return `float${this.size * 8} ${this.value}`;
    }
}
var $3f6c52939dfd86bc$export$2e2bcd8739ae039 = $3f6c52939dfd86bc$export$23c4e50d47dcaa25;

});

parcelRegister("3gYQQ", function(module, exports) {

$parcel$export(module.exports, "SizedInt", () => $262211867c8e0675$export$f6bfa50653c0b77d);

var $atijC = parcelRequire("atijC");

var $iD72m = parcelRequire("iD72m");
class $262211867c8e0675$export$f6bfa50653c0b77d extends (0, $iD72m.Serializable) {
    constructor(value, size){
        super();
        this.value = value;
        this.size = size;
        this._checkSize();
    }
    static byte(value) {
        return new $262211867c8e0675$export$f6bfa50653c0b77d(value, 1);
    }
    static short(value) {
        return new $262211867c8e0675$export$f6bfa50653c0b77d(value, 2);
    }
    static int(value) {
        return new $262211867c8e0675$export$f6bfa50653c0b77d(value, 4);
    }
    static long(value) {
        return new $262211867c8e0675$export$f6bfa50653c0b77d(value, 8);
    }
    static read(reader, size) {
        let value;
        switch(size){
            case 1:
                value = reader.readUint8();
                break;
            case 2:
                value = reader.readInt16();
                break;
            case 4:
                value = reader.readInt32();
                break;
            case 8:
                value = reader.readInt64();
                break;
        }
        return new $262211867c8e0675$export$f6bfa50653c0b77d(value, size);
    }
    writeType(writer) {
        switch(this.size){
            case 1:
                writer.writeUint8((0, $atijC.DataType).Byte);
                break;
            case 2:
                writer.writeUint8((0, $atijC.DataType).Short);
                break;
            case 4:
                writer.writeUint8((0, $atijC.DataType).Integer);
                break;
            case 8:
                writer.writeUint8((0, $atijC.DataType).Long);
                break;
            default:
                throw new Error(`Invalid SizedInt size ${this.size}`);
        }
    }
    writeValue(writer) {
        switch(this.size){
            case 1:
                writer.writeUint8(this.value);
                break;
            case 2:
                writer.writeInt16(this.value);
                break;
            case 4:
                writer.writeInt32(this.value);
                break;
            case 8:
                writer.writeInt64(this.value);
                break;
            default:
                throw new Error(`Invalid SizedInt size ${this.size}`);
        }
    }
    _checkSize() {
        if (this.value == null) throw new Error('Null value not allowed');
        if (this.size > 8) throw new Error('Size is greater than 8');
        if (![
            1,
            2,
            4,
            8
        ].includes(this.size)) throw new Error(`Size ${this.size} is not a power of 2`);
        if (this.size === 1 && (this.value > 0xFF || this.value < 0)) throw new Error(`Value ${this.value} is out of range for a byte`);
        if (this.size === 2 && (this.value > 0x7FFF || this.value < -32768)) throw new Error(`Value ${this.value} is out of range for a short`);
        if (this.size === 4 && (this.value > 0x7FFFFFFF || this.value < -2147483648)) throw new Error(`Value ${this.value} is out of range for an int`);
    }
    toString() {
        return `int${this.size * 8} ${this.value}`;
    }
}
var $262211867c8e0675$export$2e2bcd8739ae039 = $262211867c8e0675$export$f6bfa50653c0b77d;

});

parcelRegister("kWe2N", function(module, exports) {

$parcel$export(module.exports, "InitResponse", () => $f3e41e4b78c2b634$export$a3839a2aa9a577f2);
$parcel$export(module.exports, "OperationRequest", () => $f3e41e4b78c2b634$export$e32a5452dc497d6e);
$parcel$export(module.exports, "OperationResponse", () => $f3e41e4b78c2b634$export$6ded9cda38d62d0e);
$parcel$export(module.exports, "Event", () => $f3e41e4b78c2b634$export$d61e24a684f9e51);
$parcel$export(module.exports, "InternalOperationRequest", () => $f3e41e4b78c2b634$export$513c291e03eae483);
$parcel$export(module.exports, "InternalOperationResponse", () => $f3e41e4b78c2b634$export$270e6f70cc44ede0);

var $atijC = parcelRequire("atijC");

var $iD72m = parcelRequire("iD72m");

const $f3e41e4b78c2b634$var$Buffer = $1sJCf$buffer.Buffer;
class $f3e41e4b78c2b634$export$7c4d9b816b36a269 extends (0, $iD72m.Serializable) {
    constructor(code, params = {}){
        super();
        this.code = code;
        this.params = params;
    }
    toString() {
        return `${this.constructor.name} ${this.code}: ${JSON.stringify(this.params)}`;
    }
}
class $f3e41e4b78c2b634$export$549e8a9504cdc069 extends $f3e41e4b78c2b634$export$7c4d9b816b36a269 {
    static protocolVersion = [
        1,
        6
    ];
    static clientVersion = [
        4,
        1,
        2,
        16
    ];
    static clientSdkId = 15;
    static clientSdkIdShifted = this.clientSdkId << 1;
    constructor(appID, { isIpv6: isIpv6 = false } = {}){
        super();
        this.appID = $f3e41e4b78c2b634$var$Buffer.from(appID);
        this.isIpv6 = isIpv6;
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.PacketType).Init);
    }
    writeValue(writer) {
        writer.writeUint8($f3e41e4b78c2b634$export$549e8a9504cdc069.protocolVersion[0]);
        writer.writeUint8($f3e41e4b78c2b634$export$549e8a9504cdc069.protocolVersion[1]);
        writer.writeUint8($f3e41e4b78c2b634$export$549e8a9504cdc069.clientSdkIdShifted);
        let versionBitField = $f3e41e4b78c2b634$export$549e8a9504cdc069.clientVersion[0] << 4 | $f3e41e4b78c2b634$export$549e8a9504cdc069.clientVersion[1];
        versionBitField = this.isIpv6 ? versionBitField | 0x80 : versionBitField & 0x7F;
        writer.writeUint8(versionBitField);
        writer.writeUint8($f3e41e4b78c2b634$export$549e8a9504cdc069.clientVersion[2]);
        writer.writeUint8($f3e41e4b78c2b634$export$549e8a9504cdc069.clientVersion[3]);
        writer.writeUint8(0);
        const appIDBuffer = $f3e41e4b78c2b634$var$Buffer.alloc(32);
        this.appID.copy(appIDBuffer, 0, 0, Math.min(this.appID.length, 32));
        writer.write(appIDBuffer);
    }
}
class $f3e41e4b78c2b634$export$a3839a2aa9a577f2 extends $f3e41e4b78c2b634$export$7c4d9b816b36a269 {
    constructor(){
        super(0);
    }
    static read(reader) {
        const code = reader.readInt8();
        if (code !== 0) throw new Error(`Invalid InitResponse code: ${code}`);
        return new $f3e41e4b78c2b634$export$a3839a2aa9a577f2();
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.PacketType).InitResponse);
    }
    writeValue(writer) {
        writer.writeUint8(this.code);
    }
    toString() {
        return 'InitResponse';
    }
}
class $f3e41e4b78c2b634$export$e32a5452dc497d6e extends $f3e41e4b78c2b634$export$7c4d9b816b36a269 {
    constructor(code, params){
        super(code, params);
    }
    static read(reader) {
        const code = reader.readUint8();
        const params = reader.readParameterTable();
        return new $f3e41e4b78c2b634$export$e32a5452dc497d6e(code, params);
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.PacketType).Operation);
    }
    writeValue(writer) {
        writer.writeUint8(this.code);
        writer.writeParameterTable(this.params);
    }
}
class $f3e41e4b78c2b634$export$6ded9cda38d62d0e extends $f3e41e4b78c2b634$export$7c4d9b816b36a269 {
    constructor(code, debugMessage, returnCode, params){
        super(code, params);
        this.debugMessage = debugMessage;
        this.returnCode = returnCode;
    }
    static read(reader) {
        const code = reader.readUint8();
        const returnCode = reader.readInt16();
        const debugMessage = reader.readValue();
        const params = reader.readParameterTable();
        return new $f3e41e4b78c2b634$export$6ded9cda38d62d0e(code, debugMessage, returnCode, params);
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.PacketType).OperationResponse);
    }
    writeValue(writer) {
        writer.writeUint8(this.code);
        writer.writeInt16(this.returnCode);
        writer.writeValue(this.debugMessage);
        writer.writeParameterTable(this.params);
    }
    toString() {
        return `OperationResponse ${this.code} (return=${this.returnCode}, msg=${this.debugMessage}): ${JSON.stringify(this.params)}`;
    }
}
class $f3e41e4b78c2b634$export$d61e24a684f9e51 extends $f3e41e4b78c2b634$export$7c4d9b816b36a269 {
    constructor(code, params){
        super(code, params);
    }
    static read(reader) {
        const code = reader.readUint8();
        const params = reader.readParameterTable();
        return new $f3e41e4b78c2b634$export$d61e24a684f9e51(code, params);
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.PacketType).Event);
    }
    writeValue(writer) {
        writer.writeUint8(this.code);
        writer.writeParameterTable(this.params);
    }
}
class $f3e41e4b78c2b634$export$513c291e03eae483 extends $f3e41e4b78c2b634$export$7c4d9b816b36a269 {
    constructor(code, params){
        super(code, params);
    }
    static read(reader) {
        const code = reader.readUint8();
        const params = reader.readParameterTable();
        return new $f3e41e4b78c2b634$export$513c291e03eae483(code, params);
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.PacketType).InternalOperationRequest);
    }
    writeValue(writer) {
        writer.writeUint8(this.code);
        writer.writeParameterTable(this.params);
    }
}
class $f3e41e4b78c2b634$export$270e6f70cc44ede0 extends $f3e41e4b78c2b634$export$7c4d9b816b36a269 {
    constructor(code, debugMessage, returnCode, params){
        super(code, params);
        this.debugMessage = debugMessage;
        this.returnCode = returnCode;
    }
    static read(reader) {
        const code = reader.readUint8();
        const returnCode = reader.readInt16();
        const debugMessage = reader.readValue();
        const params = reader.readParameterTable();
        return new $f3e41e4b78c2b634$export$270e6f70cc44ede0(code, debugMessage, returnCode, params);
    }
    writeType(writer) {
        writer.writeUint8((0, $atijC.PacketType).InternalOperationResponse);
    }
    writeValue(writer) {
        writer.writeUint8(this.code);
        writer.writeInt16(this.returnCode);
        writer.writeValue(this.debugMessage);
        writer.writeParameterTable(this.params);
    }
    toString() {
        return `InternalOperationResponse ${this.code} (return=${this.returnCode}, msg=${this.debugMessage}): ${JSON.stringify(this.params)}`;
    }
}
var $f3e41e4b78c2b634$export$2e2bcd8739ae039 = {
    PacketWithPayload: $f3e41e4b78c2b634$export$7c4d9b816b36a269,
    InitPacket: $f3e41e4b78c2b634$export$549e8a9504cdc069,
    InitResponse: $f3e41e4b78c2b634$export$a3839a2aa9a577f2,
    OperationRequest: $f3e41e4b78c2b634$export$e32a5452dc497d6e,
    OperationResponse: $f3e41e4b78c2b634$export$6ded9cda38d62d0e,
    Event: $f3e41e4b78c2b634$export$d61e24a684f9e51,
    InternalOperationRequest: $f3e41e4b78c2b634$export$513c291e03eae483,
    InternalOperationResponse: $f3e41e4b78c2b634$export$270e6f70cc44ede0
};

});


parcelRegister("3d6MC", function(module, exports) {

$parcel$export(module.exports, "default", () => $2567d8f838d11256$export$2e2bcd8739ae039);
class $2567d8f838d11256$export$6e71357f8f04bc3e {
    static GetGameList = 217;
    static ServerSettings = 218;
    static WebRpc = 219;
    static GetRegions = 220;
    static GetLobbyStats = 221;
    static FindFriends = 222;
    static CancelJoinRandom = 224;
    static JoinRandomGame = 225;
    static JoinGame = 226;
    static CreateGame = 227;
    static LeaveLobby = 228;
    static JoinLobby = 229;
    static Authenticate = 230;
    static AuthenticateOnce = 231;
    static ChangeGroups = 248;
    static ExchangeKeysForEncryption = 250;
    static GetProperties = 251;
    static SetProperties = 252;
    static RaiseEvent = 253;
    static Leave = 254;
    static Join = 255;
}
var $2567d8f838d11256$export$2e2bcd8739ae039 = $2567d8f838d11256$export$6e71357f8f04bc3e;

});

parcelRegister("eRDgW", function(module, exports) {

$parcel$export(module.exports, "default", () => $ad247a95f9158aec$export$2e2bcd8739ae039);

var $cnOXq = parcelRequire("cnOXq");

var $8Eh5J = parcelRequire("8Eh5J");
class $ad247a95f9158aec$var$RoomProperties {
    static handleRoomProps(packet) {
        for (const [key, value] of Object.entries(packet.params["249"])){
            if (!key.startsWith("int32")) continue;
            // Grab the information from the packet
            let actorNr = key.split(" ")[1];
            const name = (0, $8Eh5J.default).cleanUsername(value["int8 255"] ?? "Unknown");
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
                actorNr: actorNr,
                name: name,
                rank: rank,
                kd: kd,
                team: team,
                kills: kills,
                platform: platform,
                position: {},
                rotation: {},
                pitch: 0,
                yaw: 0,
                health: 0,
                ping: 0
            };
            // Add the player entry to the list
            (0, $cnOXq.default).RoomInstance.Players.push(usrEntry);
        }
    }
}
var $ad247a95f9158aec$export$2e2bcd8739ae039 = $ad247a95f9158aec$var$RoomProperties;

});

parcelRegister("2Am9p", function(module, exports) {

$parcel$export(module.exports, "PhotonClient", () => $1e202038a7b60fdd$export$ff44adeb1575cf4b);
/*
    Wonky way to do things, but if it works, it works
*/ 
var $kVgkK = parcelRequire("kVgkK");

var $f7tyU = parcelRequire("f7tyU");

var $bL3c8 = parcelRequire("bL3c8");

var $IKJB7 = parcelRequire("IKJB7");
class $1e202038a7b60fdd$export$ff44adeb1575cf4b {
    constructor({ originalSend: originalSend, socket: socket }){
        this.opParameters = new Map();
        this.socket = socket;
        this.originalSend = originalSend;
    }
    /**
     * Raises an event to be sent to other clients or cached for new clients
     * @param {number} eventCode - Identifies the type of event
     * @param {Object} customEventContent - The custom content/data to be sent with the event
     * @param {RaiseEventOptions} raiseEventOptions - Options that control the behavior of the event
     * @param {SendOptions} sendOptions - Options for the send operation
     * @returns {boolean} True if operation was sent successfully
     */ OpRaiseEvent(eventCode, customEventContent, raiseEventOptions, sendOptions) {
        // Clear the parameters map for reuse
        this.opParameters.clear();
        if (raiseEventOptions) {
            // Handle caching options
            if (raiseEventOptions.CachingOption !== (0, $kVgkK.EventCaching).DoNotCache) this.opParameters.set(ParameterCode.Cache, PhotonPacketBuilder.types.byte(raiseEventOptions.CachingOption));
            // Handle different caching cases
            switch(raiseEventOptions.CachingOption){
                case (0, $kVgkK.EventCaching).SliceSetIndex:
                case (0, $kVgkK.EventCaching).SlicePurgeIndex:
                case (0, $kVgkK.EventCaching).SlicePurgeUpToIndex:
                    // In the original code, there's a commented section about CacheSliceIndex
                    // and then immediately returns with SendOperation call
                    return this.SendOperation(OperationCode.RaiseEvent, this.opParameters, sendOptions);
                case (0, $kVgkK.EventCaching).SliceIncreaseIndex:
                case (0, $kVgkK.EventCaching).RemoveFromRoomCacheForActorsLeft:
                    return this.SendOperation(OperationCode.RaiseEvent, this.opParameters, sendOptions);
                case (0, $kVgkK.EventCaching).RemoveFromRoomCache:
                    if (raiseEventOptions.TargetActors) this.opParameters.set(ParameterCode.ActorList, PhotonPacketBuilder.types.integerArray(raiseEventOptions.TargetActors));
                    break;
                default:
                    if (raiseEventOptions.TargetActors) this.opParameters.set(ParameterCode.ActorList, PhotonPacketBuilder.types.integerArray(raiseEventOptions.TargetActors));
                    else if (raiseEventOptions.InterestGroup !== 0) this.opParameters.set(ParameterCode.Group, PhotonPacketBuilder.types.byte(raiseEventOptions.InterestGroup));
                    else if (raiseEventOptions.Receivers !== (0, $f7tyU.ReceiverGroup).Others) this.opParameters.set(ParameterCode.ReceiverGroup, PhotonPacketBuilder.types.byte(raiseEventOptions.Receivers));
                    if (raiseEventOptions.Flags.HttpForward) this.opParameters.set(ParameterCode.EventForward, PhotonPacketBuilder.types.byte(raiseEventOptions.Flags.WebhookFlags));
                    break;
            }
        }
        // Add event code parameter
        this.opParameters.set(ParameterCode.Code, PhotonPacketBuilder.types.byte(eventCode));
        // Add custom event content if provided
        if (customEventContent !== null && customEventContent !== undefined) // Here we would need to determine the proper type based on the customEventContent
        // For simplicity, we'll use a generic approach
        this.opParameters.set(ParameterCode.Data, this.convertToPhotonType(customEventContent));
        // Send the operation
        return this.SendOperation(OperationCode.RaiseEvent, this.opParameters, sendOptions);
    }
    /**
     * Converts JavaScript values to proper Photon types
     * @param {*} value - Value to convert
     * @returns {Object} - Photon type object
     */ convertToPhotonType(value) {
        if (value === null || value === undefined) return PhotonPacketBuilder.types.null();
        switch(typeof value){
            case 'string':
                return PhotonPacketBuilder.types.string(value);
            case 'boolean':
                return PhotonPacketBuilder.types.boolean(value);
            case 'number':
                // Check if it's an integer or float
                if (Number.isInteger(value)) return PhotonPacketBuilder.types.integer(value);
                else return PhotonPacketBuilder.types.float(value);
            case 'object':
                if (Array.isArray(value)) {
                    // Special case for integer arrays which need special handling
                    // This is critical for compatibility with C# int[] expectation
                    if (value.every((item)=>typeof item === 'number' && Number.isInteger(item))) return PhotonPacketBuilder.types.integerArray(value); // Use intArray explicitly
                    // Determine array type (this is a simplified approach)
                    if (value.length === 0) return PhotonPacketBuilder.types.objectArray([]);
                    const firstItemType = typeof value[0];
                    if (firstItemType === 'string') return PhotonPacketBuilder.types.stringArray(value);
                    else {
                        // Convert each item in the array and return objectArray
                        const convertedItems = value.map((item)=>this.convertToPhotonType(item));
                        return PhotonPacketBuilder.types.objectArray(convertedItems);
                    }
                } else {
                    // For objects, create a hashtable
                    const entries = Object.entries(value).map(([key, val])=>[
                            PhotonPacketBuilder.types.string(key),
                            this.convertToPhotonType(val)
                        ]);
                    return PhotonPacketBuilder.types.hashTable(entries);
                }
            default:
                // Default to string for any other types
                return PhotonPacketBuilder.types.string(String(value));
        }
    }
    /**
     * Alternative implementation using the OpRaiseEvent method
     * @param {number} viewID - The view ID of the object to transfer ownership of
     * @param {number} playerID - The player ID of the new owner
     * @returns {boolean} True if the operation was sent successfully
     */ TransferOwnership(viewID, playerID) {
        // Create event options - set receivers to All
        const eventOptions = new (0, $bL3c8.RaiseEventOptions)();
        eventOptions.Receivers = (0, $f7tyU.ReceiverGroup).All;
        // Create send options - set to reliable
        const sendOptions = new (0, $IKJB7.SendOptions)();
        sendOptions.Reliability = true;
        // PunEvent.OwnershipTransfer is 210
        const ownershipTransferEventCode = 210;
        // Custom handler for this specific event to ensure proper Int32[] serialization
        const originalConvert = client.convertToPhotonType;
        this.convertToPhotonType = function(value) {
            // If this is our ownership transfer array, ensure it's treated as intArray
            if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') return PhotonPacketBuilder.types.integerArray(value);
            // Use original method for other cases
            return originalConvert.call(this, value);
        };
        const data = [
            viewID,
            playerID
        ];
        const result = this.OpRaiseEvent(ownershipTransferEventCode, data, eventOptions, sendOptions);
        this.convertToPhotonType = originalConvert;
        return result;
    }
    /**
     * Instantiates a prefab on all clients in the room
     * @param {string} prefabName - The name of the prefab to instantiate
     * @param {Vector3} position - The position to instantiate at
     * @param {Quaternion} rotation - The rotation to instantiate with
     * @param {number} group - The group this object belongs to
     * @param {object} customData - Any additional custom data to include
     * @returns {boolean} Whether the event was sent successfully
     */ Instantiate(prefabName, position, rotation, group, customData) {
        // Validate inputs
        if (!prefabName || typeof prefabName !== 'string') {
            console.error("Invalid prefab name");
            return false;
        }
        // Create event options with proper receivers
        const eventOptions = new (0, $bL3c8.RaiseEventOptions)();
        eventOptions.Receivers = (0, $f7tyU.ReceiverGroup).All;
        // Create send options for reliability
        const sendOptions = new (0, $IKJB7.SendOptions)();
        sendOptions.Reliability = true;
        // Use the correct event code for instantiation
        // Photon's instantiate event is typically code 202
        const instantiateEventCode = 202;
        // Create the content to send
        // We need to format the data properly for network transmission
        const networkData = {
            prefabName: prefabName,
            position: this.SerializeVector3(position),
            rotation: this.SerializeQuaternion(rotation),
            groupId: group || 0,
            data: customData || null,
            viewId: this.GetNextViewId(),
            ownerId: this.photonView.Owner.ActorNumber // Current actor number as owner
        };
        // Send the event to all clients including ourselves
        return this.OpRaiseEvent(instantiateEventCode, networkData, eventOptions, sendOptions);
    }
}
var // Example usage:
// In a browser environment with Photon client:
// const packet = client.TransferOwnership(123, 456);
// webSocket.send(packet.toBuffer());
// Export the classes for use in other modules
$1e202038a7b60fdd$export$2e2bcd8739ae039 = {
    PhotonClient: $1e202038a7b60fdd$export$ff44adeb1575cf4b,
    RaiseEventOptions: $bL3c8.RaiseEventOptions,
    SendOptions: $IKJB7.SendOptions,
    EventCaching: $kVgkK.EventCaching,
    ReceiverGroup: $f7tyU.ReceiverGroup
};

});
parcelRegister("kVgkK", function(module, exports) {

$parcel$export(module.exports, "EventCaching", () => $f3b5cd0cb0b652fa$export$3d2274495cff5221);
const $f3b5cd0cb0b652fa$export$3d2274495cff5221 = {
    DoNotCache: 0,
    MergeCache: 1,
    ReplaceCache: 2,
    RemoveCache: 3,
    AddToRoomCache: 4,
    AddToRoomCacheGlobal: 5,
    RemoveFromRoomCache: 6,
    RemoveFromRoomCacheForActorsLeft: 7,
    SliceIncreaseIndex: 10,
    SliceSetIndex: 11,
    SlicePurgeIndex: 12,
    SlicePurgeUpToIndex: 13
};
var $f3b5cd0cb0b652fa$export$2e2bcd8739ae039 = $f3b5cd0cb0b652fa$export$3d2274495cff5221;

});

parcelRegister("f7tyU", function(module, exports) {

$parcel$export(module.exports, "ReceiverGroup", () => $b01e70e0fef9fdb4$export$da51ffd7819cf58f);
const $b01e70e0fef9fdb4$export$da51ffd7819cf58f = {
    Others: 0,
    All: 1,
    MasterClient: 2
};
var $b01e70e0fef9fdb4$export$2e2bcd8739ae039 = $b01e70e0fef9fdb4$export$da51ffd7819cf58f;

});

parcelRegister("bL3c8", function(module, exports) {

$parcel$export(module.exports, "RaiseEventOptions", () => $88f68feba80a3421$export$4e41dc56ffcd93cd);
class $88f68feba80a3421$export$4e41dc56ffcd93cd {
    constructor(){
        this.CachingOption = EventCaching.DoNotCache;
        this.TargetActors = null;
        this.InterestGroup = 0;
        this.Receivers = ReceiverGroup.Others;
        this.Flags = {
            HttpForward: false,
            WebhookFlags: 0
        };
        this.CacheSliceIndex = 0;
    }
}
var $88f68feba80a3421$export$2e2bcd8739ae039 = $88f68feba80a3421$export$4e41dc56ffcd93cd;

});

parcelRegister("IKJB7", function(module, exports) {

$parcel$export(module.exports, "SendOptions", () => $08685ca9d6b51577$export$2486db4d5359fb2f);
class $08685ca9d6b51577$export$2486db4d5359fb2f {
    constructor(){
        this.Reliability = true;
        this.Channel = 0;
        this.Encrypt = false;
    }
}
var $08685ca9d6b51577$export$2e2bcd8739ae039 = $08685ca9d6b51577$export$2486db4d5359fb2f;

});





parcelRequire("bedNT");

