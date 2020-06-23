class Tower {
    constructor(x, y) {
        this.pos = new Vector(x, y)
        this.facing = 0
        this.target
        this.timer = 0
        this.highlight = false
    }
    tick() {
        if (this.timer >= this.shootSpeed) {
            this.shoot()
            this.timer = 0
        }
        this.timer++
    }
    shoot() {
        let distances = []
        for (i = 0; i < enemies.length; i++) {
            distances.push(Math.sqrt((this.pos.x - enemies[i].pos.x) * (this.pos.x - enemies[i].pos.x) + (this.pos.y - enemies[i].pos.y) * (this.pos.y - enemies[i].pos.y)))
        }
        let index = distances.indexOf(Math.min.apply(Math, distances))
        if (distances[index] <= this.range) {
            this.face(index)
            enemies[index].hit(this.damage)
        }

    }
    face(i) {
        this.facing = Math.atan2(enemies[i].pos.y - this.pos.y, enemies[i].pos.x - this.pos.x) + Math.PI / 2
    }
}

class Basic extends Tower {
    constructor(x, y) {
        super(x, y)
        this.shootSpeed = 20
        this.damage = 10
        this.range = 150
    }

    render() {
        ctx.strokeStyle = "#AADD00"
        ctx.translate(this.pos.x, this.pos.y)
        ctx.rotate(this.facing)
        ctx.strokeRect(-8,-8,16,16)
        if (this.highlight) {
            ctx.globalAlpha = .3
            ctx.fillStyle = "#222222"
            ctx.beginPath()
            ctx.arc(0, 0, this.range, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1
        }
        ctx.resetTransform()
    }
}

class Lava extends Tower {
    constructor(x, y) {
        super(x, y)
        this.shootSpeed = 20
        this.damage = 25
        this.range = 125
    }

    render() {
        ctx.strokeStyle = "#DD2233"
        ctx.translate(this.pos.x, this.pos.y)
        ctx.rotate(this.facing)
        ctx.strokeRect(-8,-8,16,16)
        if (this.highlight) {
            ctx.globalAlpha = .3
            ctx.fillStyle = "#222222"
            ctx.beginPath()
            ctx.arc(0, 0, this.range, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1
        }
        ctx.resetTransform()
    }
}