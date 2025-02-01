class Rocket extends GravitationalObject {
    constructor(x, y, vx, vy, focus) {
        super(1, 12, "#FF0000", x, y, vx, vy);
        this.direction = 270;
        this.keyMap = { 65: false, 68: false, 87: false };
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
            this.throttle -= 0.003;
            if (this.throttle < 0) this.throttle = 0;
        }
        if (this.keyMap[16]) {
            this.throttle += 0.003;
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
        // Draw Throttle
        canvas.setFillColor("#222233");
        canvas.fillRect(0, canvas.height - 220, 60, 220);

        canvas.setFillColor("#111122");
        canvas.fillRect(10, canvas.height - 180 - 10, 40, 180);

        canvas.setFillColor("#FFFFFF");
        canvas.drawText(10, canvas.height - 200, "Throttle", 12);
        canvas.fillRect(10, canvas.height - this.throttle * 180 - 10, 40, this.throttle * 180);

        // Draw velocity
        canvas.setFillColor("#222233");
        canvas.fillRect(60, canvas.height - 60, 200, 60);

        canvas.setFillColor("#111122");
        canvas.fillRect(60, canvas.height - 50, 190, 40);

        canvas.setFillColor("#FFFFFF");
        canvas.drawText(70, canvas.height - 22, `${(this.velocity.relative(this.trajectory.focus.velocity).magnitude() * 1e4).toFixed(0)} m/s`, 20);


        // Draw height
        canvas.setFillColor("#222233");
        canvas.fillRect(canvas.width / 2 - 120, 0, 240, 70);

        canvas.setFillColor("#111122");
        canvas.fillRect(canvas.width / 2 - 110, 10, 220, 50);
        canvas.setFillColor("#FFFFFF");

        let distance = this.position.distance(this.trajectory.focus.position).magnitude();
        distance -= Math.abs(this.trajectory.focus.radius + this.radius / 2);
        distance *= 1e4

        if (distance > 10000) {
            distance /= 1000;

            canvas.drawText(canvas.width / 2 - 95, 50, distance.toFixed(0), 40);
            canvas.drawText(canvas.width / 2 + 45, 50, "km", 40);
        }
        else {
            canvas.drawText(canvas.width / 2 - 95, 50, distance.toFixed(0), 40);
            canvas.drawText(canvas.width / 2 + 65, 50, "m", 40);
        }
    }
}