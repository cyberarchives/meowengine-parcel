export class Tab {
    static getSideTabTemplate(tab, isActive = false) {
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

        const iconContainer = document.createElement('div');
        iconContainer.style.width = '24px';
        iconContainer.style.height = '24px';
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = 'center';
        iconContainer.style.justifyContent = 'center';
        iconContainer.style.marginBottom = '4px';

        if (tab.icon) {
            const iconElement = document.createElement('img');
            iconElement.src = tab.icon;
            iconElement.alt = `${tab.label} icon`;
            iconElement.style.width = '20px';
            iconElement.style.height = '20px';
            iconElement.style.filter = 'brightness(0) saturate(100%) invert(92%) sepia(14%) saturate(2063%) hue-rotate(97deg) brightness(104%) contrast(104%)';
            iconContainer.appendChild(iconElement);
        } else {
            const textIcon = document.createElement('div');
            textIcon.textContent = tab.label.charAt(0).toUpperCase();
            textIcon.style.fontSize = '16px';
            textIcon.style.fontWeight = 'bold';
            textIcon.style.color = '#00ffaa';
            iconContainer.appendChild(textIcon);
        }

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

        tabElement.addEventListener('click', () => {
            this.switchToTab(tab.label);
        });

        return tabElement;
    }
}