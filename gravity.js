let dt = 0.01;

const canvas = new Canvas()

const earth = new GravitationalObject(1000000, 250, "#0000FF", canvas.width / 2, canvas.height / 2, 0, 0);
const rocket = new Rocket(canvas.width / 2, canvas.height / 2 - 250, earth, 0, 0);
//g2 = new GravitationalObject(10000, 10, "#00FF00", 150, 500, 0, 37)
//g3 = new GravitationalObject(0.001, 5, "#FF0000", 135, 500, 0, 39)

canvas.setCenter(rocket);

let objects = [earth, rocket];

function tick() {
    canvas.clearScreen();
    rocket.calculate(objects);
    earth.draw();
}

let interval = setInterval(tick, 1);