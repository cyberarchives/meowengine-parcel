const { Button } = require("./Components/Button");
const { ButtonGroup } = require("./Components/ButtonGroup");
const { ColorPicker } = require("./Components/ColorPicker");
const { ConfirmModal } = require("./Components/ConfirmModal");
const { ContentArea } = require("./Components/ContentArea");
const { Divider } = require("./Components/Devider");
const { Header } = require("./Components/Header");
const { Label } = require("./Components/Label");
const { Notification } = require("./Components/Notification");
const { PanelContainer } = require("./Components/PanelContainer");
const { SideNav } = require("./Components/SideNav");
const { Spacer } = require("./Components/Spacer");
const { Tab } = require("./Components/Tab");
const { TextInput } = require("./Components/TextInput");
const { ToggleGroup } = require("./Components/ToggleGroup");
const { ToggleSwitch } = require("./Components/ToggleSwitch");

class UI {
    constructor(containerId) {
        this.notifications = [];
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found!');
            return;
        }

        this.isVisible = true;
        this.isDarkMode = true;
        this.activeTab = null;
        this.tabContents = {};

        this.setupContainer();
        this.makeDraggable();
        this.addBackgroundLayers();
        this.addHeader('MeowEngine v2.0');

        this.createPanelLayout();
    }

    setupContainer() {
        document.head.appendChild(Container.getContainerTemplate(this.container));
    }

    createPanelLayout() {
        this.sideNav = SideNav.getSideNavTemplate();
        this.contentArea = ContentArea.getContentAreaTemplate();
        this.panelContainer = PanelContainer.getPanelContainerTemplate(this.sideNav, this.contentArea);


        this.panelContainer.appendChild(this.sideNav);
        this.panelContainer.appendChild(this.contentArea);
        this.container.appendChild(this.panelContainer);
    }

    addHeader(title) {
        this.container.appendChild(Header.getHeaderTemplate(title));
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
        this.sideNav.innerHTML = '';
        this.contentArea.innerHTML = '';

        tabs.forEach((tab, index) => {
            const tabElement = this.createSideTab(tab, index === 0);
            this.sideNav.appendChild(tabElement);

            const contentContainer = document.createElement('div');
            contentContainer.classList.add('tab-content');
            contentContainer.style.display = index === 0 ? 'block' : 'none';
            contentContainer.style.height = '100%';
            contentContainer.style.animation = 'fadeIn 0.3s ease-out';

            this.tabContents[tab.label] = contentContainer;

            if (tab.content) {
                contentContainer.appendChild(tab.content);
            }

            this.contentArea.appendChild(contentContainer);
        });

        this.activeTab = tabs[0].label;
    }

    createSideTab(tab, isActive = false) {
        return Tab.getSideTabTemplate(tab, isActive);
    }

    switchToTab(tabLabel) {
        Object.keys(this.tabContents).forEach(label => {
            this.tabContents[label].style.display = 'none';
        });

        if (this.tabContents[tabLabel]) {
            this.tabContents[tabLabel].style.display = 'block';
            this.tabContents[tabLabel].style.animation = 'fadeIn 0.3s ease-out';
        }

        const tabs = this.sideNav.querySelectorAll('.side-tab');
        tabs.forEach(tab => {
            const isActive = tab.querySelector('div:nth-child(2)').textContent === tabLabel;
            tab.style.background = isActive ? 'rgba(0, 255, 170, 0.15)' : 'transparent';

            const indicator = tab.querySelector('div[style*="position: absolute"]');
            if (indicator) {
                tab.removeChild(indicator);
            }

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
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    addBackgroundLayers() {
        let { patternOverlay, backgroundImageLayer } = PanelContainer.getPatternOverlay();
        this.container.style.overflow = 'hidden';
        this.container.appendChild(backgroundImageLayer);
        this.container.appendChild(patternOverlay);
    }

    setBackground(background) {
        if (background.startsWith('url(') || background.startsWith('http')) {
            const url = background.startsWith('url(') ?
                background :
                `url(${background})`;
            this.backgroundImageLayer.style.backgroundImage = url;
            this.backgroundImageLayer.style.animation = 'fadeIn 0.3s ease';
        } else {
            this.container.style.background = background;
        }
    }

    createLabel(text) {
        return Label.getLabelTemplate(text);
    }

    createToggleSwitch(label = '', initialState = false, onChange = null, toolTip = '') {
        return ToggleSwitch.getToggleSwitchTemplate(label, initialState, onChange, toolTip);
    }

    createButton(label, onClick, container = null, toolTip = '') {
        return Button.getButtonTemplate(label, onClick, container, toolTip);
    }

    createTextInput(placeholder, onEnter = null) {
        return TextInput.getTextInputTemplate(placeholder, onEnter);
    }

    createSlider(min, max, value, step, label = '', onChange = null) {
        return Slider.getSliderTemplate(min, max, value, step, label, onChange);
    }

    createDropdown(options, selectedValue = '', onChange = null, label = '') {
        return Dropdown.getDropdownTemplate(options, selectedValue, onChange, label);
    }

    createConsoleLogBox() {
        return Console.getConsoleTemplate();
    }

    createDynamicListBox() {
        return DynamicListBox.getDynamicListBoxTemplate();
    }

    createColorPicker(label, defaultColor = '#00ffaa', onChange = null) {
        return ColorPicker.getColorPickerTemplate(label, defaultColor, onChange);
    }

    createConfirmModal(message, onConfirm, onCancel) {
        return ConfirmModal.getConfirmModalTemplate(message, onConfirm, onCancel);
    }

    createButtonGroup(buttons) {
        return ButtonGroup.getButtonGroupTemplate(buttons);
    }

    createToggleGroup(toggles) {
        return ToggleGroup.getToggleGroupTemplate(toggles);
    }

    createDivider() {
        return Divider.getDividerTemplate();
    }

    createSpacer(height = '10px') {
        return Spacer.getSpacerTemplate(height);
    }

    addSpacer(height = '10px', container = null) {
        return Spacer.addSpacer(height, container);
    }

    makeDraggable() {
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        const header = this.container.querySelector('div[style*="border-bottom"]');
        if (!header) return;

        header.style.cursor = 'move';

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - (parseInt(this.container.style.right) || 10);
            startY = e.clientY - (parseInt(this.container.style.top) || 50);
            this.container.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this.container.style.right = `${window.innerWidth - e.clientX - startX}px`;
                this.container.style.top = `${e.clientY - startY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            this.container.style.transition = 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)';
        });

        this.container.addEventListener('selectstart', (e) => {
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

        const elements = this.container.querySelectorAll('[style*="color"]');
        elements.forEach((el) => {
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
            '#9400d3',
        ];
        let index = 0;
        this.stopRainbowBackground();
        this.rainbowInterval = setInterval(() => {
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
        return Notification.getNotificationTemplate(title, type, message, duration);
    }
}

module.exports = UI;