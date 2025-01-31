class Canvas {
    constructor() {
        this.zoom = 1;
        this.focus = null;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        const c = document.getElementById("canvas");
        this.ctx = c.getContext("2d");

        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;

        document.onwheel = this.changeZoom.bind(this);
    }

    changeZoom(e) {
        this.zoom *= (1 + e.deltaY * 0.0003);
        if (this.zoom < 0.001) this.zoom = 0.001;
        if (this.zoom > 10) this.zoom = 10;
    }

    setCenter(center) {
        this.focus = center;
    }

    setFillColor(farbe) {
        this.ctx.fillStyle = farbe;
    }

    setLineColor(farbe) {
        this.ctx.strokeStyle = farbe;
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.setFillColor("#000000");
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    translate(x, y) {
        x = x * this.zoom + (this.width / 2 - this.focus.position.x * this.zoom); // calculate coordinates so that the focus object is in the center
        y = y * this.zoom + (this.height / 2 - this.focus.position.y * this.zoom);
        this.ctx.translate(x, y);
    }

    translateScale(x, y) {
        this.scale();
        x += (this.width / 2 / this.zoom - this.focus.position.x); // calculate coordinates so that the focus object is in the center
        y += (this.height / 2 / this.zoom - this.focus.position.y);
        this.ctx.translate(x, y);
    }

    scale() {
        this.ctx.scale(this.zoom, this.zoom);
    }

    drawSymbolRocket(x, y, a, h, alpha) {
        let x1 = 0.5 * a;
        let x2 = - 0.5 * a;
        this.ctx.save();
        this.translate(x, y);
        this.ctx.rotate(alpha * Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.moveTo(x1, h / 8 * 3);
        this.ctx.lineTo(x2, h / 8 * 3);
        this.ctx.lineTo(0, - h / 8 * 5);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawText(x, y, text, a) {
        this.ctx.font = a + "px Georgia";
        this.ctx.fillText(text, x, y);
    }

    drawOrbit(x, y, c, a, b, alpha) {
        alpha *= Math.PI / 180;
        this.ctx.save();
        this.translateScale(x, y);
        this.ctx.rotate(alpha + Math.PI);
        this.setFillColor("#00FFFF");
        this.drawMarker(c.x * Math.cos(-alpha) - c.y * Math.sin(-alpha) + a, c.x * Math.sin(-alpha) + c.y * Math.cos(-alpha), "Apogee");
        this.setFillColor("#FFFF00");
        this.drawMarker(c.x * Math.cos(-alpha) - c.y * Math.sin(-alpha) - a, c.x * Math.sin(-alpha) + c.y * Math.cos(-alpha), "Perigee");
        this.ctx.beginPath();
        this.ctx.ellipse(c.x * Math.cos(-alpha) - c.y * Math.sin(-alpha), c.x * Math.sin(-alpha) + c.y * Math.cos(-alpha), a, b, 0, 0, 2 * Math.PI); // Affinität für Rotieren
        this.ctx.restore();
        this.ctx.stroke();
    }

    drawHyperbola(x, y, a, b, c, alpha) {
        alpha *= Math.PI / 180;

        let steps = 1000
        let mx = - c.x * Math.cos(-alpha) + c.y * Math.sin(-alpha);
        let my = - c.x * Math.sin(-alpha) - c.y * Math.cos(-alpha);

        this.ctx.save();
        this.translateScale(x, y);
        this.ctx.rotate(alpha);

        this.setFillColor("#FFFF00");
        this.drawMarker(mx + a, my, "Perigee");

        this.ctx.beginPath();
    
        for (let i = -steps; i <= steps; i++) {
            let px = a * Math.cosh(i / Math.abs(steps) * 2);
            let py = b * Math.sinh(i / Math.abs(steps) * 2);

            py *= steps < 0 ? -1 : 1;
            this.ctx.lineTo(mx + px, my + py);
        }

        this.ctx.restore();
        this.ctx.stroke();
    }

    drawMarker(x, y, text) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3 / this.zoom, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.drawText(x + 5 / this.zoom, y, text, 8 / this.zoom);
    }

    fillCircle(x, y, a) {
        this.ctx.save();
        this.translateScale(x, y);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, a, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height, alpha = 0) {
        // Draw and scale the image on a temporary canvas
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");

        tempCanvas.width = width * this.zoom;
        tempCanvas.height = height * this.zoom;

        tempCtx.imageSmoothingEnabled = false;
        tempCtx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, tempCanvas.width, tempCanvas.height);

        // Display the image on the canvas
        this.ctx.save();
        this.translate(x - width / 2, y - height / 2);

        this.ctx.translate(width / 2 * this.zoom, height / 2 * this.zoom); // Translate to the image's center
        this.ctx.rotate(alpha * (Math.PI / 180)); // Convert degrees to radians
        this.ctx.translate(-width / 2 * this.zoom, -height / 2 * this.zoom); // Translate back

        this.ctx.drawImage(tempCanvas, 0, 0);
        this.ctx.restore();
    }

    drawPlanet(image, sx, sy, sWidth, sHeight, x, y, width, height) {
        if (this.zoom * width > 12) {
            this.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
            return
        }
        this.fillCircle(x, y, 12 / 2 / this.zoom); //Fix this
    }

    drawRocket(image, sx, sy, sWidth, sHeight, x, y, width, height, alpha) {
        if (this.zoom > 0.7) {
            this.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height, alpha);
            return;
        }
        this.drawSymbolRocket(x, y, width / 1.5, height / 2, alpha);
    }
}