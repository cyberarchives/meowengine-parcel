import MeowEngine from './Browser/GlobalTypeDefs';
import CustomLogs from './Browser/Utility/CustomLogs';
import GameUtils from './Browser/Utility/GameUtils';
import FairCollection from './Bullet Force/FairPlayAPI/FairCollection';
import { UI } from './Menu/UIManager';
import HttpRequestManager from './Photon/HttpRequestManager';
import SocketManager from './Photon/SocketManager';

// Return if not in the right iFrame
if (!window.location.href.includes('https://bullet-force-multiplayer.game-files.crazygames.com/unity/unity2020/bullet-force-multiplayer.html')) return;

// Initialize Logs
MeowEngine.Log.Instance = new CustomLogs({ title: "MeowEngine", enabled: true, showTimestamp: true });

// Wait for UnityInstance to be ready
// TODO: Add a timeout
// TODO: Add a check for the unity version
GameUtils.waitForUnityInstance(() => {
    // Ensure MeowEngine is set to window globally
    window.MeowEngine = MeowEngine;

    // set up GlobalTypeDefs
    MeowEngine.FairCollection.InitOperation = FairCollection.InitOperation;
    MeowEngine.FairCollection.Instance = FairCollection;
    MeowEngine.SDK.FairCollection = FairCollection;

    // Override socket to add Photon reading and writing logic
    SocketManager.overrideSocket();

    // Initialize the Http Request Manager
    HttpRequestManager.initialize();
    
    // Initialize UI
    // TODO: Remove the example UI elements and add a proper UI and features
    
    // Create the main container
    const newContainer = document.createElement('div');
    newContainer.id = `ui-container-${Date.now()}`;
    document.body.appendChild(newContainer);

    // Initialize UI
    const ui = new UI(newContainer.id);
    // Create tabs
    const tabs = [
        {
            label: 'Home',
            content: createHomeTab(ui),
        },
        {
            label: 'Settings',
            content: createSettingsTab(ui),
        },
    ];

    ui.createTabs(tabs);

    // Function to create Home tab content
    function createHomeTab(ui) {
        const container = document.createElement('div');

        // Welcome Label
        container.appendChild(ui.createLabel('Welcome to MeowEngine v2.0'));
        container.appendChild(ui.createSpacer('20px'));

        // Sample Text Input
        const textInput = ui.createTextInput('Enter some text', (value) => {
            ui.createNotification('Input Received', 'info', `You entered: ${value}`, 3000);
        });
        container.appendChild(ui.createLabel('Sample Input:'));
        container.appendChild(textInput);
        container.appendChild(ui.createSpacer());

        // Sample Button
        const actionButton = ui.createButton('Click Me', () => {
            ui.createNotification('Button Clicked', 'info', 'You clicked the button!', 3000);
        }, null, 'Click to trigger a notification');
        container.appendChild(actionButton);
        container.appendChild(ui.createSpacer());

        // Sample Divider
        container.appendChild(ui.createDivider());

        // Sample Color Picker
        const colorPicker = ui.createColorPicker('Background Color', '#00ffaa', (color) => {
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
        const darkModeToggle = ui.createToggleSwitch('Dark Mode', true, (checked) => {
            ui.toggleTheme();
            ui.createNotification('Theme Changed', 'info', checked ? 'Dark Mode' : 'Light Mode', 3000);
        }, 'Toggle dark/light theme');
        container.appendChild(darkModeToggle);
        container.appendChild(ui.createSpacer());

        // Rainbow Background Button
        const rainbowButton = ui.createButton('Start Rainbow Background', () => {
            ui.startRainbowBackground();
            ui.createNotification('Rainbow Started', 'info', 'Background cycling started', 3000);
        });
        container.appendChild(rainbowButton);
        container.appendChild(ui.createSpacer());

        const stopRainbowButton = ui.createButton('Stop Rainbow Background', () => {
            ui.stopRainbowBackground();
            ui.createNotification('Rainbow Stopped', 'info', 'Background cycling stopped', 3000);
        });
        container.appendChild(stopRainbowButton);

        return container;
    }
});