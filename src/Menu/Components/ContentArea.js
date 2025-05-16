export class ContentArea {
    static getContentAreaTemplate() {
        const contentArea = document.createElement('div');
        contentArea.style.flex = '1';
        contentArea.style.overflowY = 'auto';
        contentArea.style.padding = '15px';
        contentArea.style.position = 'relative';

        return contentArea;
    }
}