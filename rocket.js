class Rocket extends GravitationalObject {
    constructor (x, y) {
        super(1, 15, "#FF0000", x, y, 0, 0);
        this.direction = 270;
        this.keyMap = {65: false, 68: false, 87: false};
        document.onkeydown = document.onkeyup = this.keylogger.bind(this);
    }

    keylogger(e) {
        this.keyMap[e.keyCode] = e.type == "keydown";
    }

    calculate(objects) {
        if (this.keyMap[65]) this.direction -= 0.3;
        if (this.keyMap[68]) this.direction += 0.3;
        if (this.keyMap[87]) this.accelerate(0.02);
        super.calculate(objects);
    }

    accelerate(value) {
        let vector = Vector.create(value, this.direction * Math.PI / 180);
        this.velocity.add(vector);
    }

    draw() {
        setFillColor(this.color);
        fillIsoTriangleRotate(this.position.x, this.position.y, this.radius * 0.7, this.radius, this.direction - 270);
    }
}