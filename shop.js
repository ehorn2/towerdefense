class Shop {
    constructor() {
        this.placing = false
        this.money = 50
        this.dummy
        this.towerInfo = {
            basic: {
                price: 10
            },
            lava: {
                price: 120
            }
        }
    }

    loadButtons() {
        for (let i in buttonsShop) {
            buttons.push(new Button(buttonsShop[i]))
        }
    }

    render() {
        ctx.textAlign = "center"
        ctx.font = "600 24px monospace"
        ctx.fillStyle = "#449944"
        ctx.fillText(this.money, 995, 40)
        ctx.fillStyle = "#994444"
        ctx.fillText(lives, 1105, 40)
    }

    buy(id) {
        if(!this.placing) {
            this.placing = id
            pauseGame()
            // Set up mouse tracker
            switch(id) {
                case "basic":
                    this.dummy = new Basic()
                    break;
                case "lava":
                    this.dummy = new Lava()
                    break;
            }
            this.dummy.highlight = true
            loops.tracker = setInterval(() => {
                shop.dummy.pos.x = mousex
                shop.dummy.pos.y = mousey
                render()
                shop.dummy.render()
            }, 12)
        } else {
            this.placing = false
            if (loops.tracker) clearInterval(loops.tracker)
            continueGame()
        }
    }

    place(evt) {
        if (this.placing) {
            switch(this.placing) {
                case "basic":
                    towers.push(new Basic(evt.x, evt.y))
                    shop.money -= shop.towerInfo.basic.price
                    break;
                case "lava":
                    towers.push(new Lava(evt.x, evt.y))
                    shop.money -= shop.towerInfo.lava.price
                    break;
            }
            this.placing = false
            if (loops.tracker) clearInterval(loops.tracker)
            continueGame()
        }
    }
}

const buttonsShop = {
    "basic":{
        x:950,
        y:100,
        w:90,
        h:40,
        text:"Basic : 10",
        color:"#6666BB",
        pressedColor:"#444499",
        inactive:false,
        inactiveColor:"#994444",
        inactiveCheck:function(){
            if (shop.money < shop.towerInfo.basic.price) this.inactive = true
            else this.inactive = false
        },
        call:function(){
            shop.buy("basic")
        }
    },
    "lava":{
        x:1060,
        y:100,
        w:90,
        h:40,
        text:"Lava : 120",
        color:"#6666BB",
        pressedColor:"#444499",
        inactive:false,
        inactiveColor:"#994444",
        inactiveCheck:function(){
            if (shop.money < shop.towerInfo.lava.price) this.inactive = true
            else this.inactive = false
        },
        call:function(){
            shop.buy("lava")
        }
    }
}