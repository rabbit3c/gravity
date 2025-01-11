class Position {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    calculate(velocity) {
        this.x += velocity.x * dt;
        this.y += velocity.y * dt;
    }

    distance(p2) {
        return new Vector(p2.x - this.x, p2.y - this.y);
    }
}