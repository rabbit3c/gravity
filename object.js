class GravitationalObject {
    static G = 1/*6.67e-11*/

    constructor (mass, radius, color, x, y, vx, vy) {
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.position = new Position(x, y);
        this.velocity = new Velocity(vx, vy);
    }

    calculate(g2) {
        let distance = this.position.distance(g2.position)

        let a = GravitationalObject.G * g2.mass / (distance.value()**2)
        let acceleration = distance.mult(a / distance.value())

        this.velocity.calculate(acceleration)
        this.position.calculate(this.velocity);
        this.draw();
    }

    draw() {
        setFillColor(this.color);
        fillCircle(this.position.x, this.position.y, this.radius);
    }
}