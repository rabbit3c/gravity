class Canvas {
    constructor(zoom, minZoom, maxZoom, facingAway) {
        this.zoom = zoom;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;

        this.facingAway = facingAway;

        this.focus = null;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        const c = document.getElementById("canvas");
        this.ctx = c.getContext("2d");

        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;
    }

    changeZoom(n) {
        this.zoom *= (1 + n * 0.0003);
        if (this.zoom < this.minZoom) this.zoom = this.minZoom;
        if (this.zoom > this.maxZoom) this.zoom = this.maxZoom;
    }

    angle(alpha) {
        return alpha - this.angleUp();
    }

    angleUp() {
        if (!this.facingAway) return 0;
        let vector = this.focus.distance();
        return vector.angle() + 90;
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
        x = x * this.zoom + this.width / 2 - this.focus.position.x * this.zoom; // calculate coordinates so that the focus object is in the center
        y = y * this.zoom + this.height / 2 - this.focus.position.y * this.zoom;
        this.ctx.translate(x, y);
    }

    translateScale(position) {
        this.scale();
        const x = position.x + (this.width / 2 / this.zoom - this.focus.position.x); // calculate coordinates so that the focus object is in the center
        const y = position.y + (this.height / 2 / this.zoom - this.focus.position.y);
        this.ctx.translate(x, y);
    }

    scale() {
        this.ctx.scale(this.zoom, this.zoom);
    }

    drawSymbolRocket(position, a, h, alpha) {
        let y1 = 0.5 * a;
        let y2 = - 0.5 * a;
        this.ctx.save();
        this.translate(position.x, position.y);
        this.ctx.rotate(alpha * Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.moveTo(-h / 8 * 3, y1);
        this.ctx.lineTo(-h / 8 * 3, y2);
        this.ctx.lineTo(h / 8 * 5, 0);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawText(x, y, text, a) {
        this.ctx.font = a + "px Arial";
        this.ctx.fillText(text, x, y);
    }

    drawOrbit(position, c, a, b, alpha) {
        alpha *= Math.PI / 180;
        this.ctx.save();
        this.translateScale(position);
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

    drawHyperbola(position, a, b, c, alpha) {
        alpha *= Math.PI / 180;

        let steps = 1000
        let mx = - c.x * Math.cos(-alpha) + c.y * Math.sin(-alpha);
        let my = - c.x * Math.sin(-alpha) - c.y * Math.cos(-alpha);

        this.ctx.save();
        this.translateScale(position);
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

    fillCircle(position, a) {
        this.ctx.save();
        this.translateScale(position);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, a, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    fillRect(x, y, width, height) {
        this.ctx.fillRect(x, y, width, height);
    }

    drawImage(image, sx, sy, sWidth, sHeight, position, width, height, alpha = 0) {
        if ((Math.abs(position.x - this.focus.position.x) - width) * this.zoom > this.width / 2) return; //Only render on screen images
        if ((Math.abs(position.y - this.focus.position.y) - height) * this.zoom > this.height / 2) return;

        alpha = this.angle(alpha);

        // Draw and scale the image on a temporary canvas
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");

        tempCanvas.width = width * this.zoom;
        tempCanvas.height = height * this.zoom;

        tempCtx.imageSmoothingEnabled = false;

        tempCtx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, tempCanvas.width, tempCanvas.height); // Display the image on the canvas

        this.ctx.save();

        this.translate(position.x - width / 2, position.y - height / 2);

        this.ctx.translate(width / 2 * this.zoom, height / 2 * this.zoom); // Translate to the image's center
        this.ctx.rotate(alpha * Math.PI / 180); // Convert degrees to radians
        this.ctx.translate(-width / 2 * this.zoom, -height / 2 * this.zoom); // Translate back

        this.ctx.drawImage(tempCanvas, 0, 0);
        this.ctx.restore();
    }

    drawObjects(image, positions, width, height, distance, b) {
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");

        tempCanvas.width = width * this.zoom;
        tempCanvas.height = height * this.zoom;

        tempCtx.imageSmoothingEnabled = false;

        tempCtx.drawImage(image, 0, 0, width * this.zoom, height * this.zoom);

        for (let position of positions) {
            let x = this.width / 2 + this.zoom * (position.x - b % 0.2 - 0.4 - width / 2);
            let y = this.height / 2 + this.zoom * (position.y + distance - height / 2);

            for (let i = 0; i < 4; i++) {
                this.ctx.drawImage(tempCanvas, x, y);
                x += this.zoom * 0.2;
            }
        }
    }

    drawPlanet(image, sx, sy, sWidth, sHeight, position, radius) {
        if (this.zoom * radius > 6) {
            this.drawImage(image, sx, sy, sWidth, sHeight, position, radius * 2, radius * 2);
            return
        }
        this.fillCircle(position, 6 / this.zoom);
    }

    drawSurface(distance, color) {
        const y = this.height / 2 + distance * this.zoom;
        if (y > this.height) return;

        this.setFillColor(color);
        this.fillRect(0, y, this.width, this.height / 2);
    }

    drawAtmosphere(distance, scale) {
        let x = 1 - Math.exp(- distance / scale);

        const r = 10 * (1 - x) + 5 * x;
        const g = 190 * (1 - x) + 15 * x;
        const b = 250 * (1 - x) + 30 * x;
        
        this.setFillColor(`rgb(${r}, ${g}, ${b})`)
        this.fillRect(0, 0, this.width, this.height);
    }

    drawArrow(x, y, n, alpha) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(alpha * Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-2*n, -n);
        this.ctx.lineTo(-2*n, n);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }  

    drawVelocityArrow(velocity) {
        if (velocity.magnitude() < 1e-8) return;
        velocity = velocity.normalize();

        const alpha = (this.angleUp()) * Math.PI / 180;

        const x = Math.cos(-alpha) * velocity.x - Math.sin(-alpha) * velocity.y;
        const y = Math.sin(-alpha) * velocity.x + Math.cos(-alpha) * velocity.y;

        this.setLineColor("#FFFFFF");
        this.ctx.beginPath();
        this.ctx.moveTo(this.width / 2, this.height / 2);
        this.ctx.lineTo(this.width / 2 + x * 150, this.height / 2 + y * 150);
        this.ctx.stroke();

        this.setFillColor("#FFFFFF");
        this.drawArrow(this.width / 2 + x * 150, this.height / 2 + y * 150, 8, velocity.angle() - alpha / Math.PI * 180);
    }
}