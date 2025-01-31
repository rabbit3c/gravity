const canvas = new Canvas()
const time = new Time()

const earth = new Earth(0, 0, 0, 0);
const moon = new Moon(-3.85e4, 0, 0, 1.02e1);
const rocket = new Rocket(0, -6.37e2 - 6, 0, 0);
//g2 = new GravitationalObject(10000, 10, "#00FF00", 150, 500, 0, 37)
//g3 = new GravitationalObject(0.001, 5, "#FF0000", 135, 500, 0, 39)

canvas.setCenter(rocket);

let objects = [moon, earth, rocket];

function tick() {
    canvas.clearScreen();
    rocket.calculate(objects);
    moon.calculate(objects);
    earth.draw();
    rocket.drawStats();
    time.draw();
}

let interval = setInterval(tick, 1);