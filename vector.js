class Vector {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    static create(value, angle) {
        let x = Math.cos(angle) * value;
        let y = Math.sin(angle) * value;
        return new Vector(x, y);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    minus(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    divide(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    inverse() {
        return new Vector(- this.x, - this.y);
    }

    crossProduct(vector) {
        return this.x * vector.y - this.y * vector.x;
    }

    crossProductScalar(n) {
        return new Vector(this.y * n, - this.x * n);
    }

    angle() {
        return Math.atan2(this.y, this.x) / Math.PI * 180;
    }

    normalize() {
        if (this.magnitude() == 0) return this.copy();
        return this.copy().divide(this.magnitude());
    }
}