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
            if (distance.magnitude() == 0) continue;

            if (this instanceof Rocket) {
                if (distance.magnitude() - this.radius / 2 <= g.radius) { // Check for Collision
                    let distanceAfter = distance.copy();
                    distanceAfter.add(this.velocity.relative(g.velocity));

                    if (distance.magnitude() >= distanceAfter.magnitude()) { // Check if movingw away
                        if (this.velocity.relative(g.velocity).magnitude() * 1e4 > 200) { //Check if rocket should explode
                            this.explosion = new Explosion(this.position.x, this.position.y, 2000);
                        }

                        this.velocity = g.velocity.copy();
                        this.landed = true;
                        strongestObject = g;
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
    }

    draw() {
        view.setFillColor(this.color);
        view.fillCircle(this.position, this.radius);
    }
}