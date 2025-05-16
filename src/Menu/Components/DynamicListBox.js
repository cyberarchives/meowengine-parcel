export class DynamicListBox {
    static getDynamicListBoxTemplate() {
        const listBox = document.createElement('div');
        listBox.classList.add('dynamic-list-box');
        listBox.style.padding = '10px';
        listBox.style.background = 'rgba(5, 5, 8, 0.8)';
        listBox.style.color = '#00ffaa';
        listBox.style.height = '150px';
        listBox.style.overflowY = 'auto';
        listBox.style.border = '1px solid rgba(0, 255, 170, 0.15)';
        listBox.style.borderRadius = '5px';
        listBox.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        listBox.style.fontSize = '11px';
        listBox.style.margin = '10px 0';

        const ListManager = {
            items: {},
            addItem: (key, content, color = '#00ffaa') => {
                if (ListManager.items[key]) return;
                const listItem = document.createElement('div');
                listItem.textContent = content;
                listItem.style.marginBottom = '4px';
                listItem.style.color = color;
                listBox.appendChild(listItem);
                ListManager.items[key] = listItem;
                listBox.scrollTop = listBox.scrollHeight;
            },
            removeItem: (key) => {
                if (!ListManager.items[key]) return;
                listBox.removeChild(ListManager.items[key]);
                delete ListManager.items[key];
            },
            updateItem: (key, content, color = '#00ffaa') => {
                if (!ListManager.items[key]) return;
                ListManager.items[key].textContent = content;
                ListManager.items[key].style.color = color;
            },
            clearAll: () => {
                Object.keys(ListManager.items).forEach((key) => {
                    if (ListManager.items[key].parentNode === listBox) {
                        listBox.removeChild(ListManager.items[key]);
                    }
                });
                ListManager.items = {};
            },
        };

        listBox.ListManager = ListManager;
        window.featureCount++;
        return { listBox, ListManager };
    }
}