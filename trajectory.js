class Trajectory {
    constructor (object, focus) {
        this.object = object;
        this.focus = focus;
        this.a = 0;
        this.b = 0;
        this.e = null;
        this.c = null;
    }

    // https://astronomy.stackexchange.com/questions/49489/how-can-i-calculate-an-orbital-elliptic-trajectory-from-the-velocity-vector 
    calculate() {
        const distance = this.object.position.distance(this.focus.position); 
        const r = distance.magnitude();
        const v = this.object.velocity.magnitude();
        const h = distance.crossProduct(this.object.velocity);
        const µ = GravitationalObject.G * this.focus.mass;

        const distanceNormalized = distance.normalize();
        const d = this.object.velocity.crossProductScalar(h).divide(µ);

        this.e = d.copy().minus(distanceNormalized);
        this.a = µ * r / (2 * µ - r * v ** 2);
        this.b = this.a * Math.sqrt(1 - this.e.magnitude() ** 2);
        this.c = this.e.copy().mult(this.a);
    }

    draw() {
        this.calculate();
        setLineColor("#FFFFFF");
        ellipseRotate(this.focus.position.x, this.focus.position.y, this.c, this.a, this.b, this.e.angle());
    }
}