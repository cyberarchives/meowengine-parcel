import Label from "./Label";

export class Slider {
    static getSliderTemplate(min, max, value, step, label = '', onChange = null) {
        const sliderContainer = document.createElement('div');
        sliderContainer.style.margin = '10px 0';
        sliderContainer.style.padding = '8px 10px';
        sliderContainer.style.borderRadius = '5px';
        sliderContainer.style.background = 'rgba(0, 0, 0, 0.2)';
        sliderContainer.style.border = '1px solid rgba(0, 255, 170, 0.08)';

        if (label) {
            const labelElement = Label.getLabelTemplate(label);
            sliderContainer.appendChild(labelElement);
        }

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.step = step;
        slider.style.width = '100%';
        slider.style.height = '8px';
        slider.style.background = 'rgba(0, 255, 170, 0.2)';
        slider.style.borderRadius = '4px';
        slider.style.outline = 'none';
        slider.style.accentColor = '#00ffaa';
        slider.style.cursor = 'pointer';

        const valueLabel = document.createElement('div');
        valueLabel.textContent = value;
        valueLabel.style.color = '#00ffaa';
        valueLabel.style.fontSize = '11px';
        valueLabel.style.marginTop = '8px';
        valueLabel.style.textAlign = 'right';

        slider.addEventListener('input', () => {
            valueLabel.textContent = slider.value;
            if (onChange) onChange(slider.value);
        });

        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(valueLabel);

        window.featureCount++;
        return sliderContainer;
    }
}

export default Slider;