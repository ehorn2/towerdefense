class Enemy {
    constructor() {
        this.nextNode = 1
        this.pos = new Vector(map.nodes[0].x, map.nodes[0].y)
        this.vel = new Vector(0, 0)
        this.offset = new Vector((Math.random() - .5) * 20, (Math.random() - .5) * 20)
        this.facing = 0
        this.remove = false
    }

    tick() {
        this.face()
        this.pos.add(this.vel)
        if (Math.abs(this.pos.x - map.nodes[this.nextNode].x) < 10 && Math.abs(this.pos.y - map.nodes[this.nextNode].y) < 10) {
            this.nextNode++
            if (map.nodes.length == this.nextNode) {
                this.remove = true
                lives--
            }
        }
    }
    
    face() {
        this.facing = Math.atan2(map.nodes[this.nextNode].y - this.pos.y + this.offset.y, map.nodes[this.nextNode].x - this.pos.x + this.offset.x) + Math.PI / 2
        let newFace = vectorFromAngle(this.facing)
        newFace.mult(this.speed)
        this.vel = newFace
    }

    hit(dmg) {
        this.health -= dmg
        if (this.health <= 0) {
            this.remove = true
            shop.money += this.reward
        }
    }
}


class Crawler extends Enemy {
    constructor() {
        super()
        this.health = 50
        this.speed = 1.5
        this.reward = 10
    }
    render() {
        ctx.strokeStyle = "#DDAA00"
        ctx.translate(this.pos.x, this.pos.y)
        ctx.rotate(this.facing)
        ctx.strokeRect(-5,-5,10,10)
        ctx.strokeRect(-2.5,-10,5,5)
        ctx.strokeRect(-2.5,5,5,5)
        ctx.resetTransform()
    }
}

class Dribbler extends Enemy {
    constructor() {
        super()
        this.health = 100
        this.speed = 1
        this.reward = 20
    }
    render() {
        ctx.strokeStyle = "#33AABB"
        ctx.translate(this.pos.x, this.pos.y)
        ctx.rotate(this.facing)
        ctx.strokeRect(-5,-5,10,10)
        ctx.strokeRect(-2.5,-10,5,5)
        ctx.strokeRect(-2.5,5,5,5)
        ctx.strokeRect(-10,-2.5,5,5)
        ctx.strokeRect(5,-2.5,5,5)
        ctx.resetTransform()
    }
}