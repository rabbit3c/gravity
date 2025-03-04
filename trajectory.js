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
        const relativeVelocity = this.object.velocity.relative(this.focus.velocity);
        const v = relativeVelocity.magnitude();
        const h = distance.crossProduct(relativeVelocity);
        const µ = GravitationalObject.G * this.focus.mass;

        const distanceNormalized = distance.normalize();
        const d = relativeVelocity.crossProductScalar(h).divide(µ);

        this.e = d.copy().minus(distanceNormalized);
        this.a = µ * r / (2 * µ - r * v ** 2);

        if (this.e.magnitude() < 1) this.b = this.a * Math.sqrt(1 - this.e.magnitude() ** 2);
        else this.b = this.a * Math.sqrt(this.e.magnitude() ** 2 - 1);

        this.c = this.e.copy().mult(this.a);
    }

    draw() {
        if (this.focus == null) return;
        this.calculate();
        view.setLineColor("#FFFFFF");
        if (this.e.magnitude() < 1) view.drawOrbit(this.focus.position, this.c, this.a, this.b, this.e.angle());
        else view.drawHyperbola(this.focus.position, this.a, this.b, this.c, this.e.angle());
    }
}