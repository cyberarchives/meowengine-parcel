export class GameConsole {
    static initGameConsole() {
        const existing = document.getElementById('meow-log-container');
        if (existing) existing.remove();

        // Create the main container with glass morphism effect
        const logContainer = document.createElement('div');
        logContainer.id = 'meow-log-container';
        logContainer.style.position = 'fixed';
        logContainer.style.bottom = '20px';
        logContainer.style.left = '20px';
        logContainer.style.width = '500px';
        logContainer.style.height = '180px';
        logContainer.style.backgroundColor = 'rgba(15, 23, 42, 1)';
        logContainer.style.backdropFilter = 'blur(10px)';
        logContainer.style.border = '1px solid rgba(0, 255, 170, 0.5)';
        logContainer.style.borderRadius = '12px';
        logContainer.style.boxShadow = '0 4px 20px rgba(0, 255, 170, 0.3), 0 0 15px rgba(0, 255, 170, 0.2)';
        logContainer.style.padding = '0';
        logContainer.style.overflow = 'hidden';
        logContainer.style.fontFamily = '"JetBrains Mono", "Fira Code", monospace';
        logContainer.style.fontSize = '13px';
        logContainer.style.zIndex = '9999';
        logContainer.style.transition = 'opacity 0.3s ease';
        logContainer.style.pointerEvents = 'none';
        document.body.appendChild(logContainer);

        // Create header bar
        const header = document.createElement('div');
        header.style.backgroundColor = 'rgba(0, 255, 170, 0.2)';
        header.style.padding = '8px 15px';
        header.style.borderBottom = '1px solid rgba(0, 255, 170, 0.3)';
        header.style.fontWeight = 'bold';
        header.style.color = '#00ffaa';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'space-between';
        logContainer.appendChild(header);

        // Create logo/title
        const title = document.createElement('div');
        title.innerHTML = '✧ MeowLog <span style="font-size:11px;opacity:0.7;">v2.0</span>';
        title.style.textShadow = '0 0 8px rgba(0, 255, 170, 0.7)';
        header.appendChild(title);

        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.style.fontSize = '11px';
        timestamp.style.opacity = '0.7';
        header.appendChild(timestamp);

        // Update timestamp function
        function updateTimestamp() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            timestamp.textContent = `${hours}:${minutes}:${seconds}`;
        }

        // Update timestamp every second
        updateTimestamp();
        setInterval(updateTimestamp, 1000);

        // Create content area
        const content = document.createElement('div');
        content.id = 'meow-log-content';
        content.style.height = 'calc(100% - 38px)';
        content.style.overflowY = 'auto';
        content.style.padding = '10px 15px';
        content.style.color = '#e2e8f0';
        content.style.scrollBehavior = 'smooth';

        // Styled scrollbar
        content.style.scrollbarWidth = 'thin';
        content.style.scrollbarColor = 'rgba(0, 255, 170, 0.5) rgba(15, 23, 42, 0.3)';

        // Webkit scrollbar styles
        content.style.cssText += `
            &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            &::-webkit-scrollbar-track {
                background: rgba(15, 23, 42, 0.3);
            }
            &::-webkit-scrollbar-thumb {
                background: rgba(0, 255, 170, 0.5);
                border-radius: 3px;
            }
        `;

        logContainer.appendChild(content);

        // Global logger function with enhanced features
        window.meowLog = function(message) {
            const line = document.createElement('div');
            line.style.marginBottom = '4px';
            line.style.lineHeight = '1.4';
            line.style.opacity = '0';
            line.style.transform = 'translateX(-10px)';
            line.style.transition = 'all 0.2s ease';

            // Enhanced color syntax with more options
            // Support original <color=...>text</color>
            let formattedMessage = message.replace(/<color=(.*?)>(.*?)<\/color>/g, (_, color, text) => {
                return `<span style="color:${color}">${text}</span>`;
            });

            // Additional syntax: <bold>text</bold> for bold text
            formattedMessage = formattedMessage.replace(/<bold>(.*?)<\/bold>/g, (_, text) => {
                return `<span style="font-weight:bold">${text}</span>`;
            });

            // Additional syntax: <italic>text</italic> for italic text
            formattedMessage = formattedMessage.replace(/<italic>(.*?)<\/italic>/g, (_, text) => {
                return `<span style="font-style:italic">${text}</span>`;
            });

            // Additional syntax: <glow>text</glow> for text with glow effect
            formattedMessage = formattedMessage.replace(/<glow>(.*?)<\/glow>/g, (_, text) => {
                return `<span style="text-shadow:0 0 5px #00ffaa">${text}</span>`;
            });

            // Automatically prefix with timestamp
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;

            line.innerHTML = `<span style="color:#00ffaa80;font-size:11px">[${timeStr}]</span> ${formattedMessage}`;
            content.appendChild(line);

            // Add entrance animation
            setTimeout(() => {
                line.style.opacity = '1';
            }, 10);

            // Auto-scroll to bottom
            content.scrollTop = content.scrollHeight;

            // Optional: Fade out old entries (keep last 50)
            const entries = content.children;
            if (entries.length > 50) {
                entries[0].style.opacity = '0';
                setTimeout(() => {
                    if (entries[0]) entries[0].remove();
                }, 300);
            }
        };

        // Add demo message
        setTimeout(() => {
            window.meowLog("<color=#00ffaa>✓</color> MeowLog console <bold>initialized</bold> <glow>successfully</glow>");
        }, 100);

        // Automatic opacity management (fade when not logging)
        let fadeTimeout;
        const originalLog = window.meowLog;
        window.meowLog = function(message) {
            logContainer.style.opacity = '1';
            clearTimeout(fadeTimeout);
            originalLog(message);
            fadeTimeout = setTimeout(() => {
                logContainer.style.opacity = '0.7';
            }, 3000);
        };
    }
}