export class Notification {
    static getNotificationTemplate(title, type = 'info', message, duration = 3000) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = `${notifications.length * 60 + 20}px`;
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '6px';
        notification.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        notification.style.fontSize = '12px';
        notification.style.zIndex = '10004';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(20px)';
        notification.style.transition = 'all 0.3s ease';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        notification.style.maxWidth = '300px';

        const titleElement = document.createElement('div');
        titleElement.textContent = title;
        titleElement.style.fontWeight = '600';
        titleElement.style.marginBottom = '4px';

        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.fontSize = '11px';
        messageElement.style.opacity = '0.9';

        notification.appendChild(titleElement);
        notification.appendChild(messageElement);

        switch (type) {
            case 'success':
                notification.style.background = 'rgba(0, 150, 0, 0.9)';
                notification.style.border = '1px solid rgba(0, 255, 0, 0.3)';
                notification.style.color = '#ffffff';
                break;
            case 'error':
                notification.style.background = 'rgba(150, 0, 0, 0.9)';
                notification.style.border = '1px solid rgba(255, 0, 0, 0.3)';
                notification.style.color = '#ffffff';
                break;
            case 'warning':
                notification.style.background = 'rgba(150, 100, 0, 0.9)';
                notification.style.border = '1px solid rgba(255, 165, 0, 0.3)';
                notification.style.color = '#ffffff';
                break;
            default:
                notification.style.background = 'rgba(8, 8, 12, 0.95)';
                notification.style.border = '1px solid rgba(0, 255, 170, 0.2)';
                notification.style.color = '#00ffaa';
        }

        document.body.appendChild(notification);
        notifications.push(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                    notifications.splice(notifications.indexOf(notification), 1);
                    notifications.forEach((n, i) => {
                        n.style.bottom = `${i * 60 + 20}px`;
                    });
                }
            }, 300);
        }, duration);

        return notification;
    }
}