class Button {
    constructor(x, y, w, h, text) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.pressed = false
    }

    render() {
        ctx.strokeStyle = "#111111"
        if (this.pressed) ctx.fillStyle = "#6655DD"
        else ctx.fillStyle = "#8877EE"
        ctx.translate(this.x, this.y)
        ctx.strokeRect(0,0,this.w,this.h)
        ctx.fillRect(0,0,this.w,this.h)
        ctx.resetTransform()
    }

    click() {
        if (this.pressed) this.pressed = false
        else this.pressed = true
        if (this.action) this.action()
    }
}

class ShopButton extends Button {
    constructor(x, y, w, h, text, id) {
        super(x, y, w, h, text)
        this.id = id
    }
    action() {
        console.log(this.id)
    }
}