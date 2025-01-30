class Time {
    constructor () {
        this.baseTime = 0.001;
        this.options = [1, 2, 5, 10, 50, 100, 500, 1000];
        this.index = 0;
        document.addEventListener("keydown", this.changeTimewarp.bind(this));
    }

    dt() {
        return this.baseTime * this.timewarp();
    }

    timewarp() {
        return this.options[this.index];
    }

    changeTimewarp(e) {
        switch (e.keyCode) {
            case 190:
                this.index += 1;
                if (this.index >= this.options.length) this.index = this.options.length - 1;
                break
            case 188:
                this.index -= 1;
                if (this.index < 0) this.index = 0;
                break
            default:
                break
        }
    }
w
    draw() {
        canvas.setFillColor("#FFFFFF");
        canvas.drawText(10, 50, "Timewarp: " + this.timewarp(), 15);
    }
}