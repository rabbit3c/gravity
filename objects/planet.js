class Planet extends GravitationalObject {
    constructor (mass, radius, color, x, y, vx, vy) {
        super(mass, radius, color, x, y, vx, vy);

        this.trajectory = new Trajectory(this, sun);
    }

    draw() {
        this.drawTrajectory();

        if (view.showDetailView) {
            const distance = view.detailView.focus.position.distance(this.position).magnitude() - this.radius;
            view.detailView.drawSurface(distance, this.color);
            return;
        }                   
        
        super.draw();
    }

    drawTrajectory() {
        if (view.showDetailView) return;
        if (view.mapView.zoom * this.radius > 6) return;
        this.trajectory.draw();
    }
}