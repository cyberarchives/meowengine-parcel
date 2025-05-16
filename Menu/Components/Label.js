export class Label {
    static getLabelTemplate(text) {
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
}