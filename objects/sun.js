class Sun extends GravitationalObject {
    constructor (x, y, vx, vy) {
        super(1.99e18, 6.96e4, "#FFFF00", x, y, vx, vy);

        this.image = new Image();
        this.image.src = "images/sun.png";
    }

    draw() {
        view.setFillColor(this.color);
        view.drawPlanet(this.image, 2, 2, 29, 29, this.position, this.radius);
    }
}