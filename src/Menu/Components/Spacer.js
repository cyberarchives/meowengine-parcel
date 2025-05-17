export class Spacer {
    static getSpacerTemplate(height = '10px') {
        const spacer = document.createElement('div');
        spacer.style.height = height;
        spacer.style.width = '100%';
        return spacer;
    }

    static addSpacer(height = '10px', container = null) {
        const spacer = this.getSpacerTemplate(height);
        if (container) {
            container.appendChild(spacer);
        }
        return spacer;
    }
}

export default Spacer;