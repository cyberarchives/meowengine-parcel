export class Dropdown {
    static getDropdownTemplate(options, selectedValue = '', onChange = null, label = '') {
        const dropdownContainer = document.createElement('div');
        dropdownContainer.style.margin = '10px 0';
        dropdownContainer.style.padding = '8px 10px';
        dropdownContainer.style.borderRadius = '5px';
        dropdownContainer.style.background = 'rgba(0, 0, 0, 0.2)';
        dropdownContainer.style.border = '1px solid rgba(0, 255, 170, 0.08)';

        if (label) {
            const labelElement = this.createLabel(label);
            dropdownContainer.appendChild(labelElement);
        }

        const dropdown = document.createElement('select');
        dropdown.style.width = '100%';
        dropdown.style.padding = '8px 12px';
        dropdown.style.border = '1px solid rgba(0, 255, 170, 0.2)';
        dropdown.style.borderRadius = '5px';
        dropdown.style.background = 'rgba(5, 5, 8, 0.7)';
        dropdown.style.color = '#00ffaa';
        dropdown.style.fontSize = '12px';
        dropdown.style.fontFamily = "'JetBrains Mono', 'Consolas', 'Courier New', monospace";
        dropdown.style.outline = 'none';
        dropdown.style.appearance = 'none';
        dropdown.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E%3Cpath fill=%27%2300ffaa%27 d=%27M7 10l5 5 5-5z%27/%3E%3C/svg%3E")';
        dropdown.style.backgroundRepeat = 'no-repeat';
        dropdown.style.backgroundPosition = 'right 8px center';
        dropdown.style.backgroundSize = '16px';

        options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            if (option.value === selectedValue) {
                opt.selected = true;
            }
            dropdown.appendChild(opt);
        });

        dropdown.addEventListener('change', (e) => {
            if (onChange) onChange(e.target.value);
        });

        dropdownContainer.appendChild(dropdown);
        window.featureCount++;
        return dropdownContainer;
    }
}