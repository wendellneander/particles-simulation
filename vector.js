class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    add(vector) {
        this.x += vector.x
        this.y += vector.y
        return this
    }

    sub(vector) {
        this.x -= vector.x
        this.y -= vector.y
        return this
    }

    scale(factorX, factorY = factorX) {
        this.x *= factorX
        this.y *= factorY
        return this
    }

    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y))
    }

    normalize() {
        let magnitude = this.magnitude()
        this.x /= magnitude
        this.y /= magnitude
        return this
    }

    copy() {
        return new Vector(this.x, this.y)
    }

    toString() {
        return `[${this.x}, ${this.y}]`
    }
}