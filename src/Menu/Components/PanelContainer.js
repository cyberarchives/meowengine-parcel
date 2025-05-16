export class PanelContainer {
    static getPanelContainerTemplate(sideNav, contentArea) {
        const panelContainer = document.createElement('div');
        panelContainer.style.display = 'flex';
        panelContainer.style.flex = '1';
        panelContainer.style.overflow = 'hidden';

        panelContainer.appendChild(sideNav);
        panelContainer.appendChild(contentArea);

        return panelContainer;
    }

    static getPatternOverlay() {
        backgroundImageLayer = document.createElement('div');
        backgroundImageLayer.style.position = 'absolute';
        backgroundImageLayer.style.top = '0';
        backgroundImageLayer.style.left = '0';
        backgroundImageLayer.style.right = '0';
        backgroundImageLayer.style.bottom = '0';
        backgroundImageLayer.style.zIndex = '-2';
        backgroundImageLayer.style.backgroundSize = 'cover';
        backgroundImageLayer.style.backgroundPosition = 'center';
        backgroundImageLayer.style.backgroundRepeat = 'no-repeat';
        backgroundImageLayer.style.opacity = '0.15';

        const patternOverlay = document.createElement('div');
        patternOverlay.style.position = 'absolute';
        patternOverlay.style.top = '0';
        patternOverlay.style.left = '0';
        patternOverlay.style.right = '0';
        patternOverlay.style.bottom = '0';
        patternOverlay.style.zIndex = '-1';
        patternOverlay.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zm-16 4h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zm-16 4h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z\' fill=\'%2300ffaa\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")';
        patternOverlay.style.opacity = '0.5';
        return { patternOverlay, backgroundImageLayer };
    }
}