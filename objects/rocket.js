class Rocket extends GravitationalObject {
    constructor(x, y, vx, vy, focus) {
        super(1, 5e-3, "#FF0000", x, y, vx, vy); //Rocket has radius 50m so 100m high
        this.direction = -90;
        this.keyMap = { 65: false, 68: false, 87: false };
        this.trajectory = new Trajectory(this, focus, true);
        this.throttle = 1;
        this.landed = false;
        this.burning = false;

        this.image = new Image();
        this.image.src = "images/rocket.png";

        this.engineAudio = new Audio("audio/engine.mp3");
        this.engineAudio.loop = true;
        this.engineAudio.volume = 0.1;

        document.onkeydown = document.onkeyup = this.keylogger.bind(this);
    }

    keylogger(e) {
        this.keyMap[e.keyCode] = e.type == "keydown";
    }

    relativeVelocity() {
        return this.velocity.relative(this.trajectory.focus.velocity);
    }

    distance() {
        return this.position.distance(this.trajectory.focus.position);
    }

    distanceGround() {
        if (this.trajectory.focus == null) return;
        return this.distance().magnitude() - this.trajectory.focus.radius;
    }

    calculate(objects) {
        if (this.explosion) {
            this.explosion.calculate(objects);
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
        else {
            this.burning = false;
            this.engineAudio.pause();
            time.setMaxTimewarp();
        }

        if (this.keyMap[38]) view.changeZoom(10);
        if (this.keyMap[40]) view.changeZoom(-10);

        super.calculate(objects);
    }

    accelerate(value) {
        if (time.timewarp() >= 50) return;

        if (this.burning == false) this.engineAudio.play();

        this.burning = true;
        time.setMaxTimewarp(10);
        let vector = Vector.create(value * time.dt(), this.direction * Math.PI / 180);
        this.velocity.add(vector);
    }

    draw() {
        if (this.explosion) {
            this.explosion.draw();
            return;
        }

        view.setFillColor(this.color);

        if (this.burning) {
            view.drawRocket(this.image, 11, 5, 20, 49, this.position, this.radius / 49 * 20 * 2, this.radius * 2, this.direction, this.relativeVelocity());
        }
        else {
            view.drawRocket(this.image, 74, 184, 20, 49, this.position, this.radius / 49 * 20 * 2, this.radius * 2, this.direction, this.relativeVelocity());
        }
    }

    drawTrajectory() {
        if (!this.landed) this.trajectory.draw();
    }

    drawStats() {
        // Draw Throttle
        view.setFillColor("#222233");
        view.fillRect(0, view.height - 220, 60, 220);

        view.setFillColor("#111122");
        view.fillRect(10, view.height - 180 - 10, 40, 180);

        if (time.timewarp() >= 50) view.setFillColor("#606060")
        else view.setFillColor("#FFFFFF");
        view.drawText(10, view.height - 200, "Throttle", 12);
        view.fillRect(10, view.height - this.throttle * 180 - 10, 40, this.throttle * 180);

        // Draw velocity
        view.setFillColor("#222233");
        view.fillRect(60, view.height - 60, 200, 60);

        view.setFillColor("#111122");
        view.fillRect(60, view.height - 50, 190, 40);

        view.setFillColor("#FFFFFF");
        view.drawText(70, view.height - 22, `${(this.relativeVelocity().magnitude() * 1e4).toFixed(0)} m/s`, 20);


        // Draw height
        view.setFillColor("#222233");
        view.fillRect(view.width / 2 - 120, 0, 240, 70);

        view.setFillColor("#111122");
        view.fillRect(view.width / 2 - 110, 10, 220, 50);
        view.setFillColor("#FFFFFF");

        let distance = this.distance().magnitude();
        distance -= Math.abs(this.trajectory.focus.radius + this.radius / 2);
        distance *= 1e4

        if (distance > 10000000000) {
            distance /= 1000000000;

            view.drawText(view.width / 2 - 95, 50, distance.toFixed(0), 40);
            view.drawText(view.width / 2 + 45, 50, "Gm", 40);
        }
        else if (distance > 10000) {
            distance /= 1000;

            view.drawText(view.width / 2 - 95, 50, distance.toFixed(0), 40);
            view.drawText(view.width / 2 + 45, 50, "km", 40);
        }
        else {
            view.drawText(view.width / 2 - 95, 50, distance.toFixed(0), 40);
            view.drawText(view.width / 2 + 65, 50, "m", 40);
        }
    }
}