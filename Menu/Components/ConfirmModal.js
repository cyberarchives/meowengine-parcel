export class ConfirmModal {
    static getConfirmModalTemplate(message, onConfirm, onCancel) {
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
}