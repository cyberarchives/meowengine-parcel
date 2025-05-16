export class ToggleSwitch {
    static getToggleSwitchTemplate(label = '', initialState = false, onChange = null, toolTip = '') {
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

        switchContainer.addEventListener('click', () => {
            const isEnabled = switchContainer.style.background.includes('0, 255, 170');

            switchContainer.style.background = isEnabled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 255, 170, 0.3)';
            slider.style.left = isEnabled ? '2px' : '18px';
            slider.style.boxShadow = isEnabled ? 'none' : '0 0 8px rgba(0, 255, 170, 0.6)';

            if (onChange) onChange(!isEnabled);
        });

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
}