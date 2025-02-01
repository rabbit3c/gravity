class Rocket extends GravitationalObject {
    constructor (x, y, vx, vy, focus) {
        super(1, 12, "#FF0000", x, y, vx, vy);
        this.direction = 270;
        this.keyMap = {65: false, 68: false, 87: false};
        this.trajectory = new Trajectory(this, focus);
        this.throttle = 1;
        this.landed = true;

        this.image = new Image();
        this.image.src = "images/rocket.png";

        document.onkeydown = document.onkeyup = this.keylogger.bind(this);
    }

    keylogger(e) {
        this.keyMap[e.keyCode] = e.type == "keydown";
    }

    calculate(objects) {
        if (this.explosion) {
            this.explosion.calculate(objects);
            return;
        }

        if (this.keyMap[65]) this.direction -= 0.3;
        if (this.keyMap[68]) this.direction += 0.3;
        if (this.keyMap[17]) {
            this.throttle -= 0.001;
            if (this.throttle < 0) this.throttle = 0;
        }
        if (this.keyMap[16]) {
            this.throttle += 0.001;
            if (this.throttle > 1) this.throttle = 1;
        }
        if (this.keyMap[87]) this.accelerate(100e-4 * this.throttle);

        super.calculate(objects);
    }

    accelerate(value) {
        let vector = Vector.create(value * time.dt(), this.direction * Math.PI / 180);
        this.velocity.add(vector);
    }

    draw() {
        if (this.explosion) {
            this.explosion.draw();
            return;
        }

        if (!this.landed) this.trajectory.draw();
        canvas.setFillColor(this.color);
        canvas.drawRocket(this.image, 11, 5, 20, 49, this.position, this.radius / 49 * 20 * 2, this.radius * 2, this.direction + 90);
    }

    drawStats() {
        canvas.setFillColor("#FFFFFF");
        canvas.drawText(10, 80, "Throttle: " + this.throttle.toFixed(2), 15);
        canvas.drawText(10, 110, `Velocity: ${(this.velocity.relative(this.trajectory.focus.velocity).magnitude() * 1e4).toFixed(0)} m/s`, 15);
    }
}