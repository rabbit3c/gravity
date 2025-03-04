const view = new View();

const time = new Time();

const sun = new Sun(0, 0, 0, 0);

const earth = new Earth(-1.49e7, 0, 0, 2.98e0);
const moon = new Moon(-1.49e7 - 3.85e4, 0, 0, 2.98e0 + 1.02e-1);
const rocket = new Rocket(-1.49e7, -6.37e2 - 0.0025, 0, 29.8e-1);

view.detailView.setCenter(rocket);
view.mapView.setCenter(rocket);

let objects = [sun, earth, moon];

function tick() {
    rocket.calculate(objects);
    moon.calculate(objects);
    earth.calculate(objects)
    time.increase();
}

function draw() {
    view.clearScreen();
    rocket.drawTrajectory();
    sun.draw();
    moon.draw();
    earth.draw();
    rocket.draw();
    earth.drawSurfaceObjects();
    rocket.drawStats();
    time.draw();

    requestAnimationFrame(draw);
}

let interval = setInterval(tick, 5);

tick();
draw();