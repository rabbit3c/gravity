dt = 0.01;
earth = new GravitationalObject(1000000, 250, "#0000FF", xmax / 2, ymax / 2, 0, 0);
rocket = new Rocket(xmax / 2, ymax / 2 - 250, earth, 0, 0);
//g2 = new GravitationalObject(10000, 10, "#00FF00", 150, 500, 0, 37)
//g3 = new GravitationalObject(0.001, 5, "#FF0000", 135, 500, 0, 39)

objects = [earth, rocket];

function tick() {
    clearScreen();
    rocket.calculate(objects);
    earth.draw();
}

interval = setInterval(tick, 1);

