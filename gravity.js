dt = 0.01
g1 = new GravitationalObject(1000000, 50, "#0000FF", 500, 500, 0, 0)
g2 = new GravitationalObject(1000, 10, "#00FF00", 150, 500, 0, 37)
g3 = new GravitationalObject(0.001, 5, "#FF0000", 135, 500, 0, 39)

function tick() {
    clearScreen()
    g1.calculate(g2)
    g1.calculate(g3)
    g2.calculate(g1)
    g2.calculate(g3)
    g3.calculate(g1)
    g3.calculate(g2)
}

interval = setInterval(tick, dt * 1000)

