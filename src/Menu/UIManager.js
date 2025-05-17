const notifications = [];

export class UI { 
    constructor(containerId) {
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
        minimizeButton.addEventListener('mouseover', () => {
            minimizeButton.style.background = 'rgba(0, 255, 170, 0.15)';
        });
        minimizeButton.addEventListener('mouseout', () => {
            minimizeButton.style.background = 'transparent';
        });
        minimizeButton.addEventListener('click', () => this.minimize());

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
        closeButton.addEventListener('mouseover', () => {
            closeButton.style.background = 'rgba(255, 50, 50, 0.3)';
            closeButton.style.color = '#ff5050';
        });
        closeButton.addEventListener('mouseout', () => {
            closeButton.style.background = 'transparent';
            closeButton.style.color = '#00ffaa';
        });
        closeButton.addEventListener('click', () => this.hide());

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
        tabs.forEach((tab, index) => {
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
            if (tab.content) {
                contentContainer.appendChild(tab.content);
            }

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
        tabElement.addEventListener('mouseover', () => {
            if (this.activeTab !== tab.label) {
                tabElement.style.background = 'rgba(0, 255, 170, 0.08)';
            }
        });

        tabElement.addEventListener('mouseout', () => {
            if (this.activeTab !== tab.label) {
                tabElement.style.background = 'transparent';
            }
        });

        // Click handler to switch tabs
        tabElement.addEventListener('click', () => {
            this.switchToTab(tab.label);
        });

        return tabElement;
    }

    switchToTab(tabLabel) {
        // Hide all content
        Object.keys(this.tabContents).forEach(label => {
            this.tabContents[label].style.display = 'none';
        });

        // Show selected content
        if (this.tabContents[tabLabel]) {
            this.tabContents[tabLabel].style.display = 'block';
            this.tabContents[tabLabel].style.animation = 'fadeIn 0.3s ease-out';
        }

        // Update active tab styling
        const tabs = this.sideNav.querySelectorAll('.side-tab');
        tabs.forEach(tab => {
            const isActive = tab.querySelector('div:nth-child(2)').textContent === tabLabel;
            tab.style.background = isActive ? 'rgba(0, 255, 170, 0.15)' : 'transparent';

            // Remove existing indicator
            const indicator = tab.querySelector('div[style*="position: absolute"]');
            if (indicator) {
                tab.removeChild(indicator);
            }

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
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
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
            toggleContainer.addEventListener('mouseover', () => {
                hoverTimeout = setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                }, 300);
            });

            toggleContainer.addEventListener('mouseout', () => {
                clearTimeout(hoverTimeout);
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(5px)';
            });
        }

        // Add click interaction
        switchContainer.addEventListener('click', () => {
            const isEnabled = switchContainer.style.background.includes('0, 255, 170');

            switchContainer.style.background = isEnabled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 255, 170, 0.3)';
            slider.style.left = isEnabled ? '2px' : '18px';
            slider.style.boxShadow = isEnabled ? 'none' : '0 0 8px rgba(0, 255, 170, 0.6)';

            if (onChange) onChange(!isEnabled);
        });

        // Hover effects
        toggleContainer.addEventListener('mouseover', () => {
            toggleContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            toggleContainer.style.borderColor = 'rgba(0, 255, 170, 0.15)';
        });

        toggleContainer.addEventListener('mouseout', () => {
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
            button.addEventListener('mouseover', () => {
                hoverTimeout = setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                }, 300);
            });

            button.addEventListener('mouseout', () => {
                clearTimeout(hoverTimeout);
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(5px)';
            });
        }

        // Hover & active states
        button.addEventListener('mouseover', () => {
            button.style.background = 'rgba(0, 255, 170, 0.15)';
            button.style.borderColor = 'rgba(0, 255, 170, 0.3)';
        });

        button.addEventListener('mouseout', () => {
            button.style.background = 'rgba(0, 15, 10, 0.6)';
            button.style.borderColor ='rgba(0, 255, 170, 0.2)';
        });

        button.addEventListener('click', onClick);

        if (container) {
            container.appendChild(button);
        }

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

        input.addEventListener('focus', () => {
            input.style.borderColor = 'rgba(0, 255, 170, 0.4)';
            input.style.boxShadow = '0 0 8px rgba(0, 255, 170, 0.3)';
        });

        input.addEventListener('blur', () => {
            input.style.borderColor = 'rgba(0, 255, 170, 0.2)';
            input.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && onEnter) {
                let value = input.value.trim();
                if (value && value.startsWith('https') && !value.startsWith('url(')) {
                    value = `url(${value})`;
                }
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

        slider.addEventListener('input', () => {
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

        options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            if (option.value === selectedValue) {
                opt.selected = true;
            }
            dropdown.appendChild(opt);
        });

        dropdown.addEventListener('change', (e) => {
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
        Log.customLog = (message, color = '#00ffaa') => {
            const split = message.split('\n');
            split.forEach((msg) => {
                const logMessage = document.createElement('div');
                logMessage.textContent = msg;
                logMessage.style.marginBottom = '4px';
                logMessage.style.color = color;
                logBox.appendChild(logMessage);
                Log.storedLogs.push({
                    element: logMessage,
                    message: msg,
                    color,
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
            addItem: (key, content, color = '#00ffaa') => {
                if (ListManager.items[key]) return;
                const listItem = document.createElement('div');
                listItem.textContent = content;
                listItem.style.marginBottom = '4px';
                listItem.style.color = color;
                listBox.appendChild(listItem);
                ListManager.items[key] = listItem;
                listBox.scrollTop = listBox.scrollHeight;
            },
            removeItem: (key) => {
                if (!ListManager.items[key]) return;
                listBox.removeChild(ListManager.items[key]);
                delete ListManager.items[key];
            },
            updateItem: (key, content, color = '#00ffaa') => {
                if (!ListManager.items[key]) return;
                ListManager.items[key].textContent = content;
                ListManager.items[key].style.color = color;
            },
            clearAll: () => {
                Object.keys(ListManager.items).forEach((key) => {
                    if (ListManager.items[key].parentNode === listBox) {
                        listBox.removeChild(ListManager.items[key]);
                    }
                });
                ListManager.items = {};
            },
        };

        listBox.ListManager = ListManager;
        window.featureCount++;
        return { listBox, ListManager };
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

        pickerInput.addEventListener('input', () => {
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

        const yesButton = this.createButton('Confirm', () => {
            document.body.removeChild(modal);
            if (onConfirm) onConfirm();
        }, null, 'Confirm the action');

        const noButton = this.createButton('Cancel', () => {
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

        buttons.forEach((btnConfig) => {
            const button = this.createButton(
                btnConfig.label,
                btnConfig.onClick,
                buttonGroup,
                btnConfig.toolTip
            );
        });

        return buttonGroup;
    }

    createToggleGroup(toggles) {
        const groupContainer = document.createElement('div');
        groupContainer.style.display = 'grid';
        groupContainer.style.gap = '8px';
        groupContainer.style.margin = '10px 0';

        toggles.forEach(({ label, initialState, onChange, toolTip }) => {
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
        if (container) {
            container.appendChild(spacer);
        }
        return spacer;
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

        // Update child elements
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
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = `${notifications.length * 60 + 20}px`;
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

        switch (type) {
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
        notifications.push(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Animate out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                    notifications.splice(notifications.indexOf(notification), 1);
                    // Adjust positions of remaining notifications
                    notifications.forEach((n, i) => {
                        n.style.bottom = `${i * 60 + 20}px`;
                    });
                }
            }, 300);
        }, duration);

        return notification;
    }
}

export default UI;