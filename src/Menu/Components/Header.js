export class Header {
    static getHeaderTemplate(title) {
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
        closeButton.innerHTML = '&#10005;';
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
        return header;
    }
}   