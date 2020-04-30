const GRAVITATION_CONSTANT = 6.67e-11 * 10e10
const MAX_ACCELERATION_MAGNITUDE = 10000

const EXISTING_RADIUS_MIN = 2
const MASS_GIVEAWAY_FACTOR = 0.2

class Simulation {
    constructor({ numberOfParticles = 100, worldWidth = 2000, worldHeight = 2000, minVelocity = 100, 
        maxVelocity = 500, minRadius = 10, maxRadius = 50, minDensity = 1, maxDensity = 1 }) {
        this.numberOfParticles = numberOfParticles
        this.worldWidth = worldWidth
        this.worldHeight = worldHeight
        this.minVelocity = minVelocity
        this.maxVelocity = maxVelocity
        this.minRadius = minRadius
        this.maxRadius = maxRadius
        this.minDensity = minDensity
        this.maxDensity = maxDensity
        this.particles = this.generateParticles()
    }

    generateParticles() {
        let particles = []

        for(let i = 0; i < this.numberOfParticles; i++) {
            particles.push(new Particle({
                name: `particle-${i + 1}`,
                position: new Vector(random(-this.worldWidth, this.worldWidth), random(-this.worldHeight, this.worldHeight)), 
                velocity: new Vector(random(-this.minVelocity, this.minVelocity), random(-this.maxVelocity, this.maxVelocity)), 
                radius: random(this.minRadius, this.maxRadius),
                density: random(this.minRadius, this.maxRadius),
                simulation: this
            }))
        }

        return particles
    }

    update(dt) {
        this.particles.forEach(particle => particle.update(dt))
    }

    render() {
        this.particles.forEach(particle => particle.render())
    }

    removeParticle(particle) {
        this.particles = this.particles.filter(p => p != particle)
    }
}