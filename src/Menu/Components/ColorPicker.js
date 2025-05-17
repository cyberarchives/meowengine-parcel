import Label from "./Label";

export class ColorPicker {
    static getColorPickerTemplate(label, defaultColor = '#00ffaa', onChange = null) {
        const pickerContainer = document.createElement('div');
        pickerContainer.style.display = 'flex';
        pickerContainer.style.alignItems = 'center';
        pickerContainer.style.margin = '10px 0';
        pickerContainer.style.padding = '8px 10px';
        pickerContainer.style.borderRadius = '5px';
        pickerContainer.style.background = 'rgba(0, 0, 0, 0.2)';
        pickerContainer.style.border = '1px solid rgba(0, 255, 170, 0.08)';

        const pickerLabel = Label.getLabelTemplate(label); 
        pickerContainer.appendChild(pickerLabel);

        const pickerInput = document.createElement('input');
        pickerInput.type = 'color';
        pickerInput.value = defaultColor;
        pickerInput.style.width = '30px';
        pickerInput.style.height = '30px';
        pickerInput.style.border = 'none';
        pickerInput.style.borderRadius = '4px';
        pickerInput.style.cursor = 'pointer';
        pickerInput.style.background = 'transparent';
        pickerInput.style.marginLeft = 'auto';

        pickerInput.addEventListener('input', () => {
            if (onChange) onChange(pickerInput.value);
        });

        pickerContainer.appendChild(pickerInput);
        window.featureCount++;
        return pickerContainer;
    }
}

export default ColorPicker;