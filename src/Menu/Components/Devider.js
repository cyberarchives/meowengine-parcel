export class Divider {
    static getDividerTemplate() {
        const divider = document.createElement('div');
        divider.style.borderTop = '1px solid rgba(0, 255, 170, 0.15)';
        divider.style.margin = '10px 0';
        return divider;
    }
}

export default Divider;