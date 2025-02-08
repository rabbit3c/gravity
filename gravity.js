const view = new View();

const time = new Time();

const earth = new Earth(0, 0, 0, 0);
const moon = new Moon(-3.85e4, 0, 0, 1.02e-1);
const rocket = new Rocket(0, -6.37e2 - 0.0025, 0, 0);

view.detailView.setCenter(rocket);
view.mapView.setCenter(rocket);

let objects = [moon, earth];

function tick() {
    rocket.calculate(objects);
    moon.calculate(objects);
    time.increase();
}

function draw() {
    view.clearScreen();
    rocket.drawTrajectory();
    earth.draw();
    moon.draw();
    rocket.draw();
    earth.drawSurfaceObjects();
    rocket.drawStats();
    time.draw();

    requestAnimationFrame(draw);
}

let interval = setInterval(tick, 5);

tick();
draw();