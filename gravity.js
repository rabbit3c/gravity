const view = new View();

const time = new Time();

const sun = new Sun(0, 0, 0, 0);

const earth = new Earth(-1.49e7, 0, 0, 2.98e0);
const moon = new Moon(-1.49e7 - 3.85e4, 0, 0, 2.98e0 + 1.02e-1);
const rocket = new Rocket(-1.49e7, -6.37e2 - 0.0025, 0, 2.98e0);

const mercury = new Planet(3.30e11, 2.44e1, "#91837D", -5.79e6, 0, 0, 4.79e0);
const venus = new Planet(4.87e12, 6.05e1, "#D4A373", -1.08e7, 0, 0, 3.5e0);
const mars = new Planet(6.42e11, 3.37e1, "#D99A3E", 0, 2.28e7, 2.41e0, 0);
const jupiter = new Planet(1.90e15, 6.99e2, "#A85C43", -7.78e7, 0, 0, 1.31e0);
const saturn = new Planet(5.68e14, 6.03e2, "#D2B16D", -1.43e8, 0, 0, 9.69e-1);
const uranus = new Planet(8.68e13, 2.00e2, "#66A8B1", -2.87e8, 0, 0, 6.81e-1);
const neptune = new Planet(1.02e14, 2.46e2, "#4E77A6", -4.50e8, 0, 0, 5.43e-1);

view.detailView.setCenter(rocket);
view.mapView.setCenter(rocket);

let planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
let objects = [sun, earth, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune];

function tick() {
    rocket.calculate(objects);
    moon.calculate(objects);
    calculatePlanets(objects);
    time.increase();
}

function draw() {
    view.clearScreen();
    rocket.drawTrajectory();
    sun.draw();
    moon.draw();
    drawPlanets();
    rocket.draw();
    earth.drawSurfaceObjects();
    rocket.drawStats();
    time.draw();

    requestAnimationFrame(draw);
}

function drawPlanets() {
    for (const planet of planets) {
        planet.draw();
    }
}

function calculatePlanets(objects) {
    for (const planet of planets) {
        planet.calculate(objects);
    }
}

let interval = setInterval(tick, 5);

tick();
draw();