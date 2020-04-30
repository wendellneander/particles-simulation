function newtonGravitationLaw(m1, m2, d) {
    const G = GRAVITATION_CONSTANT
    return G * (m1 * m2 / (d * d))
}

class Particle {
    constructor({ position = new Vector(), velocity = new Vector(), radius = 1, density = 1, name, simulation }) {
        this.position = position
        this.velocity = velocity
        this.acceleration = new Vector()
        this.forces = new Vector()

        this.radius = radius
        this.volume = 4 / 3 * Math.PI * Math.pow(radius, 3)
        this.density = density
        this.mass = this.volume * density

        this.simulation = simulation
        this.name = name
        this.removed = false
    }

    update(dt = 0.015) {
        let collidingParticle = this.collidingParticle()
        
        if (collidingParticle) {
          this.mergeWith(collidingParticle, dt)
        }

        this.forces = this.computeTotalForces()

        this.acceleration = this.forces.copy().scale(1 / this.mass)

        if (this.acceleration.magnitude() > MAX_ACCELERATION_MAGNITUDE) {
            this.exceeded_max_acceleration = true

            this.acceleration.scale(0)
        } else {
            this.exceeded_max_acceleration = false
        }

        this.velocity.add(this.acceleration.copy().scale(dt))

        this.position.add(this.velocity.copy().scale(dt))
    }

    render() {
        noStroke()
        fill('#dc3787')
        ellipse(this.position.x, this.position.y, this.radius, this.radius)
    }

    attractionTo(particle) {
        if (particle == this) {
            return new Vector()
        }

        const distanceBetweenParticles = particle.position.copy().sub(this.position)
        const distanceBetweenParticlesScalar = distanceBetweenParticles.magnitude()
        const forceScalar = newtonGravitationLaw(this.mass, particle.mass, distanceBetweenParticlesScalar)
        const newForce = distanceBetweenParticles.normalize().scale(forceScalar)

        return newForce
    }

    computeTotalForces() {
        let particles = this.simulation.particles

        let totalForces = particles.reduce((forces, particle) => {
            return forces.add(this.attractionTo(particle))
        }, new Vector())

        return totalForces
    }

    collidingParticle() {
        return this.simulation.particles.find(p => this.collidingWith(p))
    }

    collidingWith(particle) {
        if (particle == this || particle.mass < this.mass || this.removed) {
            return false
        }

        let distanceScalar = particle.position.copy().sub(this.position).magnitude()
        if (distanceScalar < particle.radius + this.radius) {
            return true
        }

        return false
    }

    addMass(mass) {
        let increase = (this.mass + mass) / this.mass
        this.volume *= increase
        this.radius = Math.pow((3 / 4 * 1 / Math.PI * this.volume), (1 / 3))
        this.mass += mass
    }

    mergeWith(particle, dt) {
        let giveMass = MASS_GIVEAWAY_FACTOR * this.mass * dt * 100

        if (this.radius < EXISTING_RADIUS_MIN) {
            giveMass = this.mass
        }

        particle.addMass(giveMass)
        this.addMass(-giveMass, particle.position)

        if (this.mass <= 0.1) {
            this.removed = true
            this.simulation.removeParticle(this)
        }
    }
}