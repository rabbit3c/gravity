class View {
    constructor () {
        this.detailView = new Canvas(10000, 5000, 60000, true);
        this.mapView = new Canvas(1, 0.001, 2, false);

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.showDetailView = true;
        
        document.onwheel = this.onWheel.bind(this);
        document.addEventListener("keydown", this.changeView.bind(this));
    }

    currentView() {
        if (this.showDetailView) return this.detailView;
        return this.mapView;
    }

    changeView(e) {
        if (e.keyCode == 77) {
            this.showDetailView = !this.showDetailView;
        }
    }

    onWheel(e) {
        this.changeZoom(e.deltaY);
    }

    setCenter(focus) {
        this.currentView().setCenter(focus);
    }

    changeZoom(n) {
        const view = this.currentView();
        view.changeZoom(n);
    }

    clearScreen() {
        this.currentView().clearScreen();
    }

    setFillColor(color) {
        this.currentView().setFillColor(color);
    }

    setLineColor(color) {
        this.currentView().setLineColor(color);
    }

    fillCircle(position, a) {
        this.currentView().fillCircle(position, a);
    }

    fillRect(x, y, width, height) {
        this.currentView().fillRect(x, y, width, height);
    }

    drawText(x, y, text, a) {
        this.currentView().drawText(x, y, text, a);
    }

    drawRocket(image, sx, sy, sWidth, sHeight, position, width, height, alpha, velocity) {
        if (this.showDetailView) {
            this.detailView.drawVelocityArrow(velocity);
            this.detailView.drawImage(image, sx, sy, sWidth, sHeight, position, width, height, alpha + 90);
            return;
        }
        this.mapView.drawSymbolRocket(position, width * 2000, height / 1.5 * 2000, alpha);
    }

    drawPlanet(image, sx, sy, sWidth, sHeight, position, radius) {
        this.currentView().drawPlanet(image, sx, sy, sWidth, sHeight, position, radius);
    }

    drawOrbit(position, c, a, b, alpha) {
        if (this.showDetailView) return;
        this.mapView.drawOrbit(position, c, a, b, alpha);
    }

    drawHyperbola(position, a, b, c, alpha) {
        if (this.showDetailView) return;
        this.mapView.drawHyperbola(position, a, b, c, alpha);
    }
}