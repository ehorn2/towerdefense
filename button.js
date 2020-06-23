class Button {
    constructor(obj) {
        this.x = obj.x
        this.y = obj.y
        this.w = obj.w
        this.h = obj.h
        this.color = obj.color
        this.pressedColor = obj.pressedColor
        this.inactive = obj.inactive
        this.inactiveColor = obj.inactiveColor
        this.inactiveCheck = obj.inactiveCheck
        this.text = obj.text
        this.call = obj.call
        this.pressed = false
    }

    render() {
        this.inactiveCheck()
        ctx.strokeStyle = "#111111"
        if (this.inactive) ctx.fillStyle = this.inactiveColor
        else if (!this.pressed) ctx.fillStyle = this.color
        else ctx.fillStyle = this.pressedColor
        ctx.translate(this.x, this.y)
        ctx.strokeRect(0,0,this.w,this.h)
        ctx.fillRect(0,0,this.w,this.h)
        ctx.resetTransform()
    }

    click() {
        if (!this.inactive) this.call()
    }
}

const buttonsControl = {
    "startRound":{

    },
    "pauseRound":{

    }
}