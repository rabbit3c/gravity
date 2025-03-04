class Moon extends Planet {
    constructor (x, y, vx, vy) {
        super(7.35e10, 1.74e2, "#5970A8", x, y, vx, vy);

        this.image = new Image();
        this.image.src = "images/earth_moon.png";

        this.trajectory = new Trajectory(this, earth);
    }

    draw() {
        this.drawTrajectory();

        view.setFillColor(this.color);
        if (view.showDetailView) {
            const distance = view.detailView.focus.position.distance(this.position).magnitude() - this.radius;
            view.detailView.drawSurface(distance, this.color);
            return;
        }
        view.drawPlanet(this.image, 97, 97, 29, 29, this.position, this.radius);
    }
}