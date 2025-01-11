class Vector {
    constructor (x, y) {
        this.x = x
        this.y = y
    }

    value() {
        return Math.sqrt(this.x**2 + this.y**2)
    }

    static calculate(value, angle) {
        let x = Math.cos(angle) * value
        let y = Math.sin(angle) * value
        return new Vector(x, y)
    }

    mult(n) {
        this.x *= n
        this.y *= n
        return this
    }
}