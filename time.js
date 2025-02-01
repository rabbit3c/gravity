class Time {
    constructor () {
        this.time = 0;
        this.baseTime = 0.005;
        this.options = [1, 2, 5, 10, 50, 100, 1000, 10000, 100000];
        this.index = 0;
        document.addEventListener("keydown", this.changeTimewarp.bind(this));
    }

    dt() {
        return this.baseTime * this.timewarp();
    }

    increase() {
        this.time += this.dt();
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

    draw() {
        let seconds = Math.floor(this.time % 60);
        let minutes = Math.floor((this.time / 60) % 60);
        let hours = Math.floor((this.time / 3600) % 24);
        let days = Math.floor(this.time / 86400);

        canvas.setFillColor("#222233");
        canvas.fillRect(0, 0, 50 * this.options.length + 15, 36);

        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] == this.timewarp()) canvas.setFillColor("#111144");
            else canvas.setFillColor("#111122");

            canvas.fillRect(10 + i * 50, 8, 45, 20);

            canvas.setFillColor("#FFFFFF");
            canvas.drawText(15 + i * 50, 21, this.options[i], 10);
        }

        canvas.setFillColor("#222233");
        canvas.fillRect(0, 36, 265, 38);

        canvas.setFillColor("#111122");
        canvas.fillRect(10, 36, 245, 30);

        canvas.setFillColor("#FFFFFF");
        canvas.drawText(20, 56, `T+ ${days} d ${hours} h ${minutes} min ${seconds} s`, 15);
        //canvas.drawText(10, 50, "Timewarp: " + this.timewarp(), 15);
    }
}