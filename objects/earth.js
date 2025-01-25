class Earth extends GravitationalObject {
    constructor (...args) {
        super(...args);

        this.image = new Image();
        this.image.src = "images/earth_moon.png";
    }

    draw() {
        canvas.drawImage(this.image, 0, 97.2, 95.8, 95.8, this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    }
}