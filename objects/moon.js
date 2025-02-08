class Moon extends GravitationalObject {
    constructor (x, y, vx, vy) {
        super(7.35e10, 1.74e2, "#5970A8", x, y, vx, vy);

        this.trajectory = new Trajectory(this);

        this.image = new Image();
        this.image.src = "images/earth_moon.png";
    }

    draw() {
        this.trajectory.draw();

        view.setFillColor(this.color);
        if (view.showDetailView) {
            const distance = view.detailView.focus.distance().magnitude() - this.radius;
            view.detailView.drawSurface(distance, this.color);
            return;
        }
        view.drawPlanet(this.image, 97, 97, 29, 29, this.position, this.radius);
    }
}