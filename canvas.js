class Canvas {
    constructor () {
        this.zoom = 1;
        this.focus = null;

        let c = document.getElementById("myCanvas");
        this.ctx = c.getContext("2d");

        this.width = window.innerWidth;						
        this.height = window.innerHeight;	
        this.ctx.canvas.width=this.width;
	    this.ctx.canvas.height=this.height;	
        
        document.addEventListener("wheel", this.changeZoom.bind(this))
    }

    changeZoom(event) {
        this.zoom *= (1 + event.deltaY * 0.0003);
        if (this.zoom < 0.01) this.zoom = 0.01;
        if (this.zoom > 10) this.zoom = 10;
    }
    
    setCenter(center) {
        this.focus = center;
    }

    setFillColor(farbe){
        this.ctx.fillStyle = farbe;
    }

    setLineColor(farbe){
        this.ctx.strokeStyle = farbe;
    }

    clearScreen(){
        this.ctx.clearRect(0,0, canvas.width, canvas.height);
        this.setFillColor("#000000");
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    translate(x, y) {
        x += (this.width / 2 / this.zoom - this.focus.position.x); // calculate coordinates so that the focus object is in the center
        y += (this.height / 2 / this.zoom - this.focus.position.y);
        this.ctx.translate(x, y);
    }

    scale() {
        this.ctx.scale(this.zoom, this.zoom);
    }

    drawRocket(x, y, a, h, alpha) {
        let x1 = 0.5 * a;
        let x2 =- 0.5 * a;
        alpha *= Math.PI/180; 
        this.ctx.save();
        this.scale();
        this.translate(x, y);
        this.ctx.rotate(alpha);
        this.ctx.beginPath();
        this.ctx.moveTo(x1, 0);
        this.ctx.lineTo(x2, 0);
        this.ctx.lineTo(0, h);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawText(x, y, text, a) {
        this.ctx.font = a + "px Georgia";
        this.ctx.fillText(text, x, y);
    }

    drawEllipse(x, y, c, a, b, alpha) {
        alpha *= Math.PI / 180;		
        this.ctx.save();
        this.scale();	
        this.translate(x, y);
        this.ctx.rotate(alpha + Math.PI);
        this.ctx.beginPath();
        this.ctx.ellipse(c.x * Math.cos(-alpha) - c.y * Math.sin(-alpha), c.x * Math.sin(-alpha) + c.y * Math.cos(-alpha), a, b, 0, 0, 2 * Math.PI); // Affinität für Rotieren
        this.ctx.restore();
        this.ctx.stroke();
    }

    fillCircle(x,y,a){
        this.ctx.save();
        this.scale();
        this.translate(x, y);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, a, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
}