# MeowEngine UI Components Guide

This guide provides comprehensive documentation for using the MeowEngine UI component library. MeowEngine offers a sleek, cyberpunk-themed interface with various components to create interactive applications.

## Table of Contents

- [Getting Started](#getting-started)
- [Basic Components](#basic-components)
  - [Buttons](#buttons)
  - [Toggle Switches](#toggle-switches)
  - [Text Inputs](#text-inputs)
  - [Sliders](#sliders)
  - [Dropdowns](#dropdowns)
- [Layout Components](#layout-components)
  - [Tabs](#tabs)
  - [Labels](#labels)
  - [Dividers and Spacers](#dividers-and-spacers)
- [Advanced Components](#advanced-components)
  - [Console Log Box](#console-log-box)
  - [Dynamic List Box](#dynamic-list-box)
  - [Color Picker](#color-picker)
  - [Confirmation Modal](#confirmation-modal)
  - [Notifications](#notifications)
- [Styling and Themes](#styling-and-themes)
- [Examples](#examples)

## Getting Started

To initialize the UI, create a container element in your HTML and instantiate the UI class:

```html
<div id="meow-engine-ui"></div>

<script type="module">
  import { UI } from './path/to/ui.js';
  
  // Initialize UI with container ID
  const ui = new UI('meow-engine-ui');
  
  // Start building your interface
  // ...
</script>
```

## Basic Components

### Buttons

Buttons provide interactive controls for triggering actions.

```javascript
// Create a simple button
const button = ui.createButton('Click Me', () => {
  alert('Button clicked!');
});

// Add button to a container
const container = document.getElementById('my-container');
ui.createButton('Container Button', () => {
  console.log('Button in container clicked!');
}, container);

// Button with tooltip
ui.createButton('Help', () => {
  console.log('Help requested');
}, null, 'Click for assistance');

// Create a group of buttons
const buttonGroup = ui.createButtonGroup([
  {
    label: 'Save',
    onClick: () => { console.log('Saved!'); },
    toolTip: 'Save your changes'
  },
  {
    label: 'Cancel',
    onClick: () => { console.log('Cancelled!'); },
    toolTip: 'Discard changes'
  }
]);
ui.contentArea.appendChild(buttonGroup);
```

### Toggle Switches

Toggle switches are used for enabling or disabling features with a simple on/off state.

```javascript
// Create a basic toggle switch
const toggle = ui.createToggleSwitch('Dark Mode', true, (isEnabled) => {
  console.log(`Dark mode is now ${isEnabled ? 'enabled' : 'disabled'}`);
});
ui.contentArea.appendChild(toggle);

// Toggle with tooltip
const tooltipToggle = ui.createToggleSwitch(
  'Advanced Mode', 
  false, 
  (isEnabled) => {
    console.log(`Advanced mode: ${isEnabled}`);
  },
  'Enable additional features'
);
ui.contentArea.appendChild(tooltipToggle);

// Create a group of toggles
const toggleGroup = ui.createToggleGroup([
  {
    label: 'Animations',
    initialState: true,
    onChange: (state) => { console.log(`Animations: ${state}`); },
    toolTip: 'Enable UI animations'
  },
  {
    label: 'Sound Effects',
    initialState: false,
    onChange: (state) => { console.log(`Sound: ${state}`); },
    toolTip: 'Enable sound effects'
  }
]);
ui.contentArea.appendChild(toggleGroup);
```

### Text Inputs

Text inputs allow users to enter text data.

```javascript
// Create a text input with action on Enter key
const input = ui.createTextInput('Enter URL...', (value) => {
  console.log(`Input value: ${value}`);
  // Do something with the entered text
});
ui.contentArea.appendChild(input);

// Create a search input
const searchInput = ui.createTextInput('Search files...', (searchTerm) => {
  console.log(`Searching for: ${searchTerm}`);
  // Perform search operation
});
ui.contentArea.appendChild(searchInput);
```

### Sliders

Sliders provide a way to select a value from a range.

```javascript
// Create a basic slider
const slider = ui.createSlider(0, 100, 50, 1, 'Volume', (value) => {
  console.log(`Volume set to: ${value}`);
});
ui.contentArea.appendChild(slider);

// Create a slider with decimal steps
const opacitySlider = ui.createSlider(0, 1, 0.5, 0.01, 'Opacity', (value) => {
  console.log(`Opacity set to: ${value}`);
  // Set opacity of an element
  document.getElementById('my-element').style.opacity = value;
});
ui.contentArea.appendChild(opacitySlider);
```

### Dropdowns

Dropdowns provide a compact way to select one option from a list.

```javascript
// Create a dropdown with options
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const dropdown = ui.createDropdown(options, 'option1', (selectedValue) => {
  console.log(`Selected: ${selectedValue}`);
}, 'Select an option');

ui.contentArea.appendChild(dropdown);

// Theme selection dropdown
const themes = [
  { value: 'dark', label: 'Dark Theme' },
  { value: 'light', label: 'Light Theme' },
  { value: 'blue', label: 'Blue Theme' }
];

const themeDropdown = ui.createDropdown(themes, 'dark', (theme) => {
  console.log(`Theme changed to ${theme}`);
  // Apply theme changes
}, 'Theme');

ui.contentArea.appendChild(themeDropdown);
```

## Layout Components

### Tabs

Tabs help organize content into separate views.

```javascript
// Create tab content containers first
const dashboardContent = document.createElement('div');
dashboardContent.innerHTML = '<h3>Dashboard</h3><p>Welcome to the dashboard!</p>';

const settingsContent = document.createElement('div');
settingsContent.innerHTML = '<h3>Settings</h3><p>Configure your preferences here.</p>';

const statsContent = document.createElement('div');
statsContent.innerHTML = '<h3>Statistics</h3><p>View your stats and metrics.</p>';

// Define tabs with their content
const tabs = [
  {
    label: 'Dashboard',
    icon: 'dashboard-icon.svg', // Optional: provide path to an icon
    content: dashboardContent
  },
  {
    label: 'Settings',
    icon: 'settings-icon.svg',
    content: settingsContent
  },
  {
    label: 'Statistics',
    icon: 'stats-icon.svg',
    content: statsContent
  }
];

// Create tabs in the UI
ui.createTabs(tabs);

// Switch to a specific tab programmatically
ui.switchToTab('Settings');
```

### Labels

Labels provide descriptive text for UI sections.

```javascript
// Create a label
const label = ui.createLabel('Configuration');
ui.contentArea.appendChild(label);

// Add a label before other components
const controlSection = document.createElement('div');
controlSection.appendChild(ui.createLabel('Controls'));
controlSection.appendChild(ui.createButton('Reset', () => {}));
ui.contentArea.appendChild(controlSection);
```

### Dividers and Spacers

Dividers and spacers help organize the layout with visual separation.

```javascript
// Add a divider
const divider = ui.createDivider();
ui.contentArea.appendChild(divider);

// Add space between components
ui.contentArea.appendChild(ui.createSpacer('20px'));

// Add space directly to a container
ui.addSpacer('15px', ui.contentArea);
```

## Advanced Components

### Console Log Box

Creates a console-like area for displaying log messages.

```javascript
// Create a log box
const logBox = ui.createConsoleLogBox();
ui.contentArea.appendChild(logBox);

// Now you can use the custom log function
Log.customLog('System initialized', '#00ffaa');
Log.customLog('Error detected in module X', '#ff5050');
Log.customLog('Warning: Low memory', '#ffaa00');

// Add multiple lines
Log.customLog('Starting process...\nStep 1 complete\nStep 2 complete');
```

### Dynamic List Box

Creates a box for managing a dynamic list of items.

```javascript
// Create a dynamic list box
const { listBox, ListManager } = ui.createDynamicListBox();
ui.contentArea.appendChild(listBox);

// Add items to the list
ListManager.addItem('item1', 'First item', '#00ffaa');
ListManager.addItem('item2', 'Second item');
ListManager.addItem('warning', 'Warning item', '#ffaa00');

// Update an existing item
ListManager.updateItem('item1', 'Updated first item', '#aaffff');

// Remove an item
ListManager.removeItem('warning');

// Clear all items
// ListManager.clearAll();

// Use with event handlers
ui.createButton('Add Item', () => {
  const id = 'item_' + Date.now();
  ListManager.addItem(id, 'New item added at ' + new Date().toLocaleTimeString());
}, ui.contentArea);
```

### Color Picker

Allows users to select a color.

```javascript
// Create a color picker with default color
const colorPicker = ui.createColorPicker('Text Color', '#00ffaa', (color) => {
  console.log(`Selected color: ${color}`);
  document.getElementById('preview-text').style.color = color;
});
ui.contentArea.appendChild(colorPicker);

// Add a preview element
const previewText = document.createElement('div');
previewText.id = 'preview-text';
previewText.textContent = 'Color Preview Text';
previewText.style.color = '#00ffaa';
previewText.style.marginTop = '10px';
previewText.style.fontSize = '16px';
ui.contentArea.appendChild(previewText);
```

### Confirmation Modal

Displays a modal dialog for confirming actions.

```javascript
// Create a button that triggers a confirmation modal
const dangerButton = ui.createButton('Delete All', () => {
  ui.createConfirmModal(
    'Are you sure you want to delete all items? This cannot be undone.',
    () => {
      // User confirmed
      console.log('Deleting all items...');
      // Perform deletion
      ui.createNotification('Success', 'success', 'All items have been deleted.');
    },
    () => {
      // User cancelled
      console.log('Deletion cancelled');
    }
  );
});
ui.contentArea.appendChild(dangerButton);
```

### Notifications

Display temporary notification messages.

```javascript
// Create notification buttons
const notifyContainer = document.createElement('div');

// Info notification
ui.createButton('Info', () => {
  ui.createNotification('Information', 'info', 'This is an informational message.');
}, notifyContainer);

// Success notification
ui.createButton('Success', () => {
  ui.createNotification('Success', 'success', 'Operation completed successfully!');
}, notifyContainer);

// Warning notification
ui.createButton('Warning', () => {
  ui.createNotification('Warning', 'warning', 'This action might cause issues.');
}, notifyContainer);

// Error notification
ui.createButton('Error', () => {
  ui.createNotification('Error', 'error', 'An error occurred during the operation.');
}, notifyContainer);

// Custom duration notification
ui.createButton('Long Duration', () => {
  ui.createNotification('Notice', 'info', 'This notification stays longer.', 6000);
}, notifyContainer);

ui.contentArea.appendChild(notifyContainer);
```

## Styling and Themes

MeowEngine UI comes with built-in styling methods for customization.

```javascript
// Toggle between dark and light themes
ui.createButton('Toggle Theme', () => {
  ui.toggleTheme();
}, ui.contentArea);

// Set custom background
ui.createButton('Set Background', () => {
  ui.setBackground('rgba(20, 20, 40, 0.95)');
}, ui.contentArea);

// Set background image
ui.createButton('Background Image', () => {
  ui.setBackground('url(https://example.com/background.jpg)');
}, ui.contentArea);

// Start rainbow background effect
ui.createButton('Rainbow Mode', () => {
  ui.startRainbowBackground();
}, ui.contentArea);

// Stop rainbow effect and reset background
ui.createButton('Stop Rainbow', () => {
  ui.stopRainbowBackground();
}, ui.contentArea);
```

## Examples

### Complete Dashboard Example

```javascript
// Initialize UI
const ui = new UI('meow-engine-container');

// Create dashboard content
const dashboardContent = document.createElement('div');

// Add stats section to dashboard
const statsSection = document.createElement('div');
statsSection.appendChild(ui.createLabel('System Stats'));

// Add toggles for features
const featureToggles = ui.createToggleGroup([
  {
    label: 'Auto Scan',
    initialState: true,
    onChange: (state) => { console.log(`Auto scan: ${state}`); },
    toolTip: 'Automatically scan for new items'
  },
  {
    label: 'Notifications',
    initialState: true,
    onChange: (state) => { console.log(`Notifications: ${state}`); },
    toolTip: 'Enable system notifications'
  },
  {
    label: 'Power Save',
    initialState: false,
    onChange: (state) => { console.log(`Power save: ${state}`); },
    toolTip: 'Reduce system resource usage'
  }
]);
statsSection.appendChild(featureToggles);

// Add spacer
statsSection.appendChild(ui.createSpacer());

// Add system control buttons
statsSection.appendChild(ui.createLabel('System Controls'));
const controlButtons = ui.createButtonGroup([
  {
    label: 'Refresh',
    onClick: () => { 
      ui.createNotification('System', 'info', 'Refreshing data...');
    },
    toolTip: 'Refresh all data'
  },
  {
    label: 'Analyze',
    onClick: () => { 
      ui.createNotification('Analysis', 'info', 'Starting analysis...'); 
    },
    toolTip: 'Run system analysis'
  },
  {
    label: 'Reset',
    onClick: () => { 
      ui.createConfirmModal(
        'Are you sure you want to reset the system?',
        () => {
          ui.createNotification('Reset', 'success', 'System has been reset.');
        },
        () => {}
      );
    },
    toolTip: 'Reset all settings'
  }
]);
statsSection.appendChild(controlButtons);

dashboardContent.appendChild(statsSection);
dashboardContent.appendChild(ui.createDivider());

// Add log section
dashboardContent.appendChild(ui.createLabel('System Log'));
const logBox = ui.createConsoleLogBox();
dashboardContent.appendChild(logBox);

// Add initial log entries
Log.customLog('System initialized successfully');
Log.customLog('Connecting to backend services...');
Log.customLog('All services online', '#00ff00');

// Create settings content
const settingsContent = document.createElement('div');
settingsContent.appendChild(ui.createLabel('Appearance'));

// Theme selection
const themeOptions = [
  { value: 'dark', label: 'Dark Theme' },
  { value: 'light', label: 'Light Theme' },
  { value: 'custom', label: 'Custom Theme' }
];
const themeDropdown = ui.createDropdown(themeOptions, 'dark', (theme) => {
  if (theme === 'light') {
    ui.toggleTheme();
  } else if (theme === 'dark') {
    ui.isDarkMode = false;
    ui.toggleTheme();
  } else {
    // Custom theme handling
  }
}, 'Theme');
settingsContent.appendChild(themeDropdown);

// Background customization
settingsContent.appendChild(ui.createLabel('Background'));
const bgInput = ui.createTextInput('Enter URL or color...', (value) => {
  ui.setBackground(value);
});
settingsContent.appendChild(bgInput);

// Color selection
settingsContent.appendChild(ui.createColorPicker('Accent Color', '#00ffaa', (color) => {
  // Apply accent color
  document.documentElement.style.setProperty('--accent-color', color);
}));

// Create monitoring content
const monitorContent = document.createElement('div');
monitorContent.appendChild(ui.createLabel('Active Processes'));

// Create a dynamic list for processes
const { listBox, ListManager } = ui.createDynamicListBox();
monitorContent.appendChild(listBox);

// Add some example processes
ListManager.addItem('proc1', 'Background Scan: Active', '#00ffaa');
ListManager.addItem('proc2', 'Data Indexing: 45%', '#ffaa00');
ListManager.addItem('proc3', 'Memory Cleanup: Idle');

// Add controls for the list
const listControls = document.createElement('div');
listControls.style.display = 'flex';
listControls.style.gap = '8px';

ui.createButton('Add Process', () => {
  const procId = 'proc_' + Date.now();
  const names = ['Data Sync', 'Background Check', 'Security Scan', 'Optimization'];
  const name = names[Math.floor(Math.random() * names.length)];
  ListManager.addItem(procId, `${name}: Starting...`);
  
  // Update after a delay
  setTimeout(() => {
    ListManager.updateItem(procId, `${name}: Active`, '#00ffaa');
  }, 1500);
}, listControls);

ui.createButton('Clear All', () => {
  ui.createConfirmModal(
    'Remove all processes?',
    () => {
      ListManager.clearAll();
      ui.createNotification('Processes', 'info', 'All processes cleared');
    },
    () => {}
  );
}, listControls);

monitorContent.appendChild(listControls);

// Add performance monitor
monitorContent.appendChild(ui.createLabel('Performance'));
monitorContent.appendChild(ui.createSlider(0, 100, 75, 1, 'CPU Usage', (value) => {
  console.log(`CPU Usage: ${value}%`);
}));
monitorContent.appendChild(ui.createSlider(0, 100, 40, 1, 'Memory Usage', (value) => {
  console.log(`Memory Usage: ${value}%`);
}));

// Create tabs with the content
ui.createTabs([
  {
    label: 'Dashboard',
    content: dashboardContent
  },
  {
    label: 'Settings',
    content: settingsContent
  },
  {
    label: 'Monitor',
    content: monitorContent
  }
]);

// Add minimize button functionality
document.addEventListener('keydown', (e) => {
  // Alt+M to toggle UI visibility
  if (e.altKey && e.key === 'm') {
    ui.toggleVisibility();
  }
});
```

### Creating a Form

```javascript
const formContainer = document.createElement('div');

// Form title
formContainer.appendChild(ui.createLabel('User Registration'));

// Name field
const nameLabel = document.createElement('div');
nameLabel.textContent = 'Name';
nameLabel.style.fontSize = '12px';
nameLabel.style.marginBottom = '4px';
nameLabel.style.color = '#00ffaa';
formContainer.appendChild(nameLabel);

const nameInput = ui.createTextInput('Enter your name');
formContainer.appendChild(nameInput);

// Email field
const emailLabel = document.createElement('div');
emailLabel.textContent = 'Email';
emailLabel.style.fontSize = '12px';
emailLabel.style.marginBottom = '4px';
emailLabel.style.color = '#00ffaa';
formContainer.appendChild(emailLabel);

const emailInput = ui.createTextInput('Enter your email');
formContainer.appendChild(emailInput);

// Role selection
formContainer.appendChild(ui.createSpacer('10px'));
const roleDropdown = ui.createDropdown(
  [
    { value: 'user', label: 'Standard User' },
    { value: 'admin', label: 'Administrator' },
    { value: 'guest', label: 'Guest' }
  ],
  'user',
  (role) => {
    console.log(`Selected role: ${role}`);
  },
  'Role'
);
formContainer.appendChild(roleDropdown);

// Preferences
formContainer.appendChild(ui.createSpacer('10px'));
formContainer.appendChild(ui.createLabel('Preferences'));

const prefsContainer = document.createElement('div');
prefsContainer.style.marginBottom = '15px';

const receiveEmails = ui.createToggleSwitch('Receive Emails', true);
prefsContainer.appendChild(receiveEmails);

const darkMode = ui.createToggleSwitch('Dark Mode', true);
prefsContainer.appendChild(darkMode);

const stayLoggedIn = ui.createToggleSwitch('Stay Logged In', false);
prefsContainer.appendChild(stayLoggedIn);

formContainer.appendChild(prefsContainer);

// Form buttons
const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.gap = '10px';
buttonContainer.style.marginTop = '15px';

ui.createButton('Submit', () => {
  ui.createNotification('Form', 'success', 'Registration submitted successfully!');
}, buttonContainer);

ui.createButton('Cancel', () => {
  ui.createNotification('Form', 'info', 'Registration cancelled');
}, buttonContainer);

formContainer.appendChild(buttonContainer);

// Add to UI content area
ui.contentArea.appendChild(formContainer);
```

This guide should help you get started with the MeowEngine UI component library. You can combine these components to create complex interfaces with a consistent cyberpunk style.