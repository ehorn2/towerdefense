class Vector {
    constructor(x, y, z) {
        if (x != undefined) this.x = x
        if (y != undefined) this.y = y
        if (z != undefined) this.z = z
        this.max = -1
        return this
    }
    add(v) {
        if (v.constructor.name == "Vector") {
            if (this.x != undefined && v.x != undefined) this.x += v.x
            if (this.y != undefined && v.y != undefined) this.y += v.y
            if (this.z != undefined && v.z != undefined) this.z += v.z
        } else console.error("Tried adding a vector to a non-vector!")
    }
    mult(scalar) {
        if (this.x != undefined) this.x *= scalar
        if (this.y != undefined) this.y *= scalar
        if (this.z != undefined) this.z *= scalar
    }
}

const vectorFromAngle = function(angle) {
    return new Vector(
        Math.cos(angle - Math.PI / 2),
        Math.sin(angle - Math.PI / 2)
    )
}