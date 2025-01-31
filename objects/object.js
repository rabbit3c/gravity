class GravitationalObject {
    static G = 6.67e-11/*6.67e-11*/

    constructor(mass, radius, color, x, y, vx, vy) {
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.position = new Position(x, y);
        this.velocity = new Velocity(vx, vy);
    }

    calculate(objects) {
        let maxA = 0;
        let strongestObject = null;

        for (let g of objects) {
            if (g == this) continue;

            let distance = this.position.distance(g.position);

            if (this instanceof Rocket) {
                if (distance.magnitude() - this.radius / 2 <= g.radius) { // Check for Collision
                    let distanceAfter = distance.copy();
                    distanceAfter.add(this.velocity.relative(g.velocity));

                    if (distance.magnitude() >= distanceAfter.magnitude()) { // Check if moving away
                        this.velocity = g.velocity.copy();
                        this.landed = true;
                        break;
                    }
                    this.landed = false;
                }
            }

            let a = GravitationalObject.G * g.mass / (distance.magnitude() ** 2);
            let acceleration = distance.normalize().mult(-a);

            this.velocity.calculate(acceleration);

            if (a > maxA) {
                maxA = a;
                strongestObject = g;
            }
        }
        this.position.calculate(this.velocity);
        if (this.trajectory) this.trajectory.focus = strongestObject;
        
        this.draw();
    }

    draw() {
        canvas.setFillColor(this.color);
        canvas.fillCircle(this.position.x, this.position.y, this.radius);
    }
}