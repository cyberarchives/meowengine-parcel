export class ToggleGroup {
    static getToggleGroupTemplate(toggles) {
        const groupContainer = document.createElement('div');
        groupContainer.style.display = 'grid';
        groupContainer.style.gap = '8px';
        groupContainer.style.margin = '10px 0';

        toggles.forEach(({ label, initialState, onChange, toolTip }) => {
            const toggle = this.createToggleSwitch(label, initialState, onChange, toolTip);
            groupContainer.appendChild(toggle);
        });

        return groupContainer;
    }
}