class Earth extends GravitationalObject {
    constructor (x, y, vx, vy) {
        super(5.97e16, 6.37e2, "#0000FF", x, y, vx, vy); //Scale 1 to 10'000 (Mass 1 to 100'000'000)

        this.image = new Image();
        this.image.src = "images/earth_moon.png";
    }

    draw() {
        canvas.setFillColor(this.color);
        canvas.drawPlanet(this.image, 0, 97, 96, 96, this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    }
}