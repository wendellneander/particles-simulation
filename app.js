let simulation, zoom = 0.1, canvasX = 0, canvasY = 0

function setup() {
    createCanvas(windowWidth, windowHeight)

    simulation = new Simulation({
        numberOfParticles: 1000,
        worldWidth: windowWidth * 10,
        worldHeight: windowHeight * 10,
    })
}

function draw() {
    background(27)

    translate(width / 2 + canvasX, height / 2 + canvasY)
    scale(zoom)

    simulation.update()
    simulation.render()
}

function mouseDragged(e) {
    canvasX = (canvasX || 0) + e.movementX
    canvasY = (canvasY || 0) + e.movementY
}

function mouseWheel(event) {
    zoom += zoom * (event.deltaY / 100)
    return false
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}