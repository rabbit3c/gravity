class Earth extends Planet {
    constructor (x, y, vx, vy) {
        super(5.97e12, 6.37e2, "#0000FF", x, y, vx, vy); //Scale 1 to 10'000 (Mass 1 to 1'000'000'000'000)

        this.planet = new Image();
        this.planet.src = "images/earth_moon.png";

        this.trees = new ObjectPlacer(50, "images/tree.png", -70e-4, 0, 60e-4, 60e-4);
        this.houses = new ObjectPlacer(5, "images/house.png", -110e-4, -60e-4, 63e-4, 52e-4);
        this.clouds = new ObjectPlacer(20, "images/cloud.png", 300e-4, 1500e-4, 336e-4, 192e-4);
    }

    draw() {
        this.drawTrajectory();

        view.setFillColor(this.color);
        if (view.showDetailView) {
            const distance = view.detailView.focus.position.distance(this.position).magnitude() - this.radius;
            view.detailView.drawAtmosphere(distance, 0.6);
            view.detailView.drawSurface(distance, "#82EF5F");
            return;
        }                   
        view.drawPlanet(this.planet, 0, 97, 96, 96, this.position, this.radius);
    }

    drawSurfaceObjects() {
        const distance = view.detailView.focus.position.distance(this.position);
        const d = distance.magnitude() - this.radius;
        const b = distance.angle() * Math.PI / 180 * this.radius;

        this.trees.draw(d, b);
        this.houses.draw(d, b);
        this.clouds.draw(d, b);
    }
}
