class ObjectPlacer {
    constructor(n, src, minHeight, maxHeight, width, height) {
        this.n = n;

        this.image = new Image();
        this.image.src = src;

        this.minHeight = minHeight;
        this.maxHeight = maxHeight;

        this.width = width;
        this.height = height;

        this.seed = Math.round(Math.random() * 1000);
    }

    mulberry32(seed) {
        return function() {
            let x = (seed += 0x6D2B79F5);
            x = Math.imul(x ^ (x >>> 15), x | 1);
            x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
            return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
        }
    }

    generateObjects() {
        let random = this.mulberry32(this.seed);
        let objects = [];

        for (let i = 0; i < this.n; i++) {
            let x = random() * 0.2;
            let y = - this.minHeight - (this.maxHeight - this.minHeight) * random();
            objects.push(new Position(x, y));
        }
        
        return objects;
    }

    draw(distance, b) {
        if (!view.showDetailView) return;
        const objects = this.generateObjects();
        view.detailView.drawObjects(this.image, objects, this.width, this.height, distance, b);
    }
}