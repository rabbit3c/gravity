class GravitationalObject {
    static G = 8e-2/*6.67e-11*/

    constructor(mass, radius, color, x, y, vx, vy) {
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.position = new Position(x, y);
        this.velocity = new Velocity(vx, vy);
    }

    calculate(objects) {
        for (let g of objects) {
            if (g == this) continue;

            let distance = this.position.distance(g.position);

            if (this instanceof Rocket) {
                if (distance.magnitude() <= g.radius) { // Check for Collision
                    let distanceAfter = distance.copy();
                    distanceAfter.add(this.velocity);

                    if (distance.magnitude() >= distanceAfter.magnitude()) { // Check if moving away
                        this.velocity = g.velocity.copy();
                        break;
                    }
                }
            }

            let a = GravitationalObject.G * g.mass / (distance.magnitude() ** 2);
            let acceleration = distance.normalize().mult(-a);

            this.velocity.calculate(acceleration);
        }
        this.position.calculate(this.velocity);
        this.draw();
    }

    draw() {
        setFillColor(this.color);
        fillCircle(this.position.x, this.position.y, this.radius);
    }
}