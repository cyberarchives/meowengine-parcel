export class TextInput {
    static getTextInputTemplate(placeholder, onEnter = null) {
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
}