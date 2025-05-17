export class SideNav {
    static getSideNavTemplate() {
        const sideNav = document.createElement('div');
        sideNav.style.width = '60px';
        sideNav.style.borderRight = '1px solid rgba(0, 255, 170, 0.15)';
        sideNav.style.display = 'flex';
        sideNav.style.flexDirection = 'column';
        sideNav.style.background = 'rgba(5, 5, 8, 0.8)';
        sideNav.style.padding = '10px 0';
        sideNav.style.gap = '8px';
        sideNav.style.alignItems = 'center';

        return sideNav;
    }
}

export default SideNav;