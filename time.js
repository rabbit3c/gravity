class Time {
    constructor () {
        this.baseTime = 0.01;
        this.timewarp = 1;
        document.addEventListener("keydown", this.changeTimewarp.bind(this));
    }

    dt() {
        return this.baseTime * this.timewarp;
    }

    changeTimewarp(e) {
        switch (e.keyCode) {
            case 190:
                this.timewarp += 1;
                if (this.timewarp > 10) this.timewarp = 10;
                break
            case 188:
                this.timewarp -= 1;
                if (this.timewarp < 1) this.timewarp = 1;
                break
            default:
                break
        }
    }
w
    draw() {
        canvas.setFillColor("#FFFFFF");
        canvas.drawText(10, 50, "Timewarp: " + this.timewarp, 15);
    }
}