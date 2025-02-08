class Explosion {
    constructor (x, y, n) {
        this.objects = [];

        for (let i = 0; i < n; i++) {
            let v = ((Math.random() / 2) ** 4);
            let angle = Math.random() * Math.PI * 2;
            let velocity = Vector.create(v, angle);

            let r = (1 + Math.random()) / 2000;

            this.objects.push(new GravitationalObject(1e-11, r, this.getColor(v), x, y, velocity.x, velocity.y));
        }
    }

    calculate(objects) {
        for (let object of this.objects) {
            object.calculate(objects);
        }
    }

    draw() {
        for (let object of this.objects) {
            object.draw();
        }
    }

    getColor(v) {
        let normalizedV = Math.min(v * (2 ** 4), 1);

        let r = 255;
        let g = Math.floor(150 * (1 - normalizedV) + 50);
        let b = Math.floor(50 * (1 - normalizedV));

        return `rgb(${r},${g},${b})`;
    }
}