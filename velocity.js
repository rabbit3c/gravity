class Velocity extends Vector {
    constructor (x, y) {
        super(x, y);
    }

    calculate(acceleration) {
        this.x += acceleration.x * dt
        this.y += acceleration.y * dt
    }
}