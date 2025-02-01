class Moon extends GravitationalObject {
    constructor (x, y, vx, vy) {
        super(7.35e10, 1.74e2, "#5970A8", x, y, vx, vy);

        this.trajectory = new Trajectory(this);

        this.image = new Image();
        this.image.src = "images/earth_moon.png";
    }

    draw() {
        this.trajectory.draw();
        canvas.setFillColor(this.color);
        canvas.drawPlanet(this.image, 97, 97, 29, 29, this.position, this.radius);
    }
}