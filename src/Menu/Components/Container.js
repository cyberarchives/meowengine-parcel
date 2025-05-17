export class Container {
    static getContainerTemplate(container) {
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

        Object.assign(container.style, styles);

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

        return styleElement;
    }
}

export default Container;