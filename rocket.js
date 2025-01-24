class Rocket extends GravitationalObject {
    constructor (x, y, focus, vx, vy) {
        super(1, 12, "#FF0000", x, y, vx, vy);
        this.direction = 270;
        this.keyMap = {65: false, 68: false, 87: false};
        this.trajectory = new Trajectory(this, focus);
        this.throttle = 1;
        document.onkeydown = document.onkeyup = this.keylogger.bind(this);
    }

    keylogger(e) {
        this.keyMap[e.keyCode] = e.type == "keydown";
    }

    calculate(objects) {
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
        if (this.keyMap[87]) this.accelerate(2 * this.throttle);
        super.calculate(objects);
    }

    accelerate(value) {
        let vector = Vector.create(value * time.dt(), this.direction * Math.PI / 180);
        this.velocity.add(vector);
    }

    draw() {
        canvas.setFillColor(this.color);
        canvas.drawRocket(this.position.x, this.position.y, this.radius * 0.7, this.radius, this.direction - 90);
        canvas.setFillColor("#FFFFFF");
        canvas.drawText(10, 20, "Throttle: " + this.throttle.toFixed(2), 15);
        this.trajectory.draw();
    }
}