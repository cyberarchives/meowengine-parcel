export class ButtonGroup {
    static getButtonGroupTemplate(buttons) {
        const buttonGroup = document.createElement('div');
        buttonGroup.style.display = 'flex';
        buttonGroup.style.gap = '8px';
        buttonGroup.style.margin = '10px 0';
        buttonGroup.style.flexWrap = 'wrap';

        buttons.forEach((btnConfig) => {
            const button = this.createButton(
                btnConfig.label,
                btnConfig.onClick,
                buttonGroup,
                btnConfig.toolTip
            );
        });

        return buttonGroup;
    }
}