export class Console {
    static getConsoleTemplate() {
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
}