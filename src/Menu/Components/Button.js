export class Button {
    static getButtonTemplate(label, onClick, container = null, toolTip = '') {
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

        const highlight = document.createElement('div');
        highlight.style.position = 'absolute';
        highlight.style.top = '0';
        highlight.style.left = '0';
        highlight.style.right = '0';
        highlight.style.height = '40%';
        highlight.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent)';
        highlight.style.pointerEvents = 'none';
        button.appendChild(highlight);

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
}

export default Button;