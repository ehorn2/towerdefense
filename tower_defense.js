let canvas
let ctx
let map
let shop
let wave
let loops = {}
let towers = []
let enemies = []
let buttons = []
let mousex
let mousey
let targetButton
let lives = 100

const bodyLoaded = async function() {
    console.log("body loaded!")
    getCanvasContext()
    addEvents()
    map = new Map()
    shop = new Shop()
    wave = new Wave()
    await map.loadMap('breezy.json')
    shop.loadButtons()
    for (let i in buttonsControl) {
        buttons.push(new Button(buttonsControl[i]))
    }
    continueGame()
}

const pauseGame = function() {
    clearInterval(loops.tick)
}

const continueGame = function() {
    if(loops.tick) clearInterval(loops.tick)
    loops.tick = setInterval(function(){tick()}, 12)
}

const tick = function() {
    // Update Enemies
    enemies.forEach(i => i.tick())
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].remove) enemies.splice(i, 1)
    }

    // Update Towers
    towers.forEach(i => i.tick())
    for(i = 0; i < towers.length; i++) {
        if (towers[i].remove) towers.splice(i, 1)
    }

    // Spawn Enemies
    if (wave.playing) wave.tick()

    render()
}

const render = function() {
    // Draw Background
    ctx.fillStyle = "#555555"
    ctx.fillRect(0,0,innerWidth,innerHeight)
    
    // Draw Path
    ctx.strokeStyle = "#111111"
    ctx.beginPath()
    for (i = 0; i < map.nodes.length; i++) {
        ctx.lineTo(map.nodes[i].x, map.nodes[i].y)
    }
    ctx.stroke()

    // Draw Entities
    enemies.forEach(i => i.render())
    towers.forEach(i => i.render())
    buttons.forEach(i => i.render())
    
    // Draw Shop
    shop.render()
}

const getCanvasContext = function() {
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext('2d')
}

const addEvents = function() {
    document.addEventListener('mousedown', evt => {
        buttons.forEach(i => {
            if (evt.x > i.x && evt.x < i.x + i.w && evt.y > i.y && evt.y < i.y + i.h) {
                targetButton = i
                i.pressed = true
            }
        })
    })

    document.addEventListener('mouseup', evt => {
        buttons.forEach(i => {
            if (evt.x > i.x && evt.x < i.x + i.w && evt.y > i.y && evt.y < i.y + i.h && buttons.indexOf(targetButton) == buttons.indexOf(i)) {
                i.click()
            }
        })
        if (targetButton) buttons[buttons.indexOf(targetButton)].pressed = false
        targetButton = undefined

        if (evt.x <= 900) {
            if (shop.placing) {
                shop.place(evt)
            } else {
                towers.forEach(i => {
                    i.highlight = false
                    if (Math.sqrt((i.pos.x - evt.x) * (i.pos.x - evt.x) + (i.pos.y - evt.y) * (i.pos.y - evt.y)) <= 20) {
                        i.highlight = true
                    }
                })
            }
        }
    })

    document.addEventListener('mousemove', evt => {
        mousex = evt.x
        mousey = evt.y
    })
}