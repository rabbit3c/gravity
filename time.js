class Time {
    constructor () {
        this.time = 0;
        this.baseTime = 0.005;
        this.options = [1, 2, 5, 10, 50, 100, 1000, 10000, 100000];
        this.index = 0;
        this.max = this.options.length - 1;
        document.addEventListener("keydown", this.changeTimewarp.bind(this));
    }

    dt() {
        return this.baseTime * this.timewarp();
    }

    increase() {
        this.time += this.dt();
        this.adjustTimewarp();
    }

    timewarp() {
        return this.options[this.index];
    }

    changeTimewarp(e) {
        switch (e.keyCode) {
            case 190:
                this.index += 1;
                const maxIndex = this.maxIndex();
                if (this.index > maxIndex) this.index = maxIndex;
                break
            case 188:
                this.index -= 1;
                if (this.index < 0) this.index = 0;
                break
            default:
                break
        }
    }

    timewarpToIndex(timewarp) {
        let index = 0;
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] > timewarp) break;
            index = i;
        }
        return index;
    }

    maxTimewarp() {
        return this.options[this.maxIndex()];
    }

    maxIndex() {
        const distance = view.detailView.focus.distanceGround();
        const maxDistance = this.timewarpToIndex(distance * 10 + 1);

        return Math.min(this.max, maxDistance);
    }

    setMaxTimewarp(timewarp=this.options[this.options.length - 1]) {
        this.max = this.timewarpToIndex(timewarp);
    }

    adjustTimewarp() { //Adjust Timewarp if rocket gets too close to object
        const maxIndex = this.maxIndex();
        if (this.index > maxIndex) this.index = maxIndex - 1;
        if (this.index < 0) this.index = 0;
    }

    draw() {
        let seconds = Math.floor(this.time % 60);
        let minutes = Math.floor((this.time / 60) % 60);
        let hours = Math.floor((this.time / 3600) % 24);
        let days = Math.floor(this.time / 86400);

        view.setFillColor("#222233");
        view.fillRect(0, 0, 50 * this.options.length + 15, 36);

        const maxIndex = this.maxIndex();

        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] == this.timewarp()) {
                if (this.options[i] >= 50) view.setFillColor("#FF0000");
                else view.setFillColor("#114565");
            }
            else view.setFillColor("#111122");

            view.fillRect(10 + i * 50, 8, 45, 20);

            if (i > maxIndex) view.setFillColor("#444444");
            else if (this.options[i] >= 50 && this.options[i] != this.timewarp()) view.setFillColor("#FF4444");
            else view.setFillColor("#FFFFFF");

            view.drawText(15 + i * 50, 21, this.options[i], 10);
        }

        view.setFillColor("#222233");
        view.fillRect(0, 36, 265, 38);

        view.setFillColor("#111122");
        view.fillRect(10, 36, 245, 30);

        view.setFillColor("#FFFFFF");
        view.drawText(20, 56, `T+ ${days} d ${hours} h ${minutes} min ${seconds} s`, 15);
    }
}