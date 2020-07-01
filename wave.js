// scripts that spawns enemies
// also a restaurant with killer gnocchi

class Wave {
    constructor() {
        this.round = 0
        this.roundSpeed = 5
        this.roundTime = 0
        this.playing = false
    }
    begin() {
        this.playing = true
    }
    tick() {
        if (this.round <= 20) {
            if (Math.random() >= .99 - this.round / 500 && -1 * Math.cos(this.roundTime * .00175) + 1 + this.round / 8 >= Math.random() * 1.5 + 1.5) {
                enemies.push(new Crawler())
            }
        }
        if (this.round >= 4 && this.round <= 24) {
            if (Math.random() >= .99 - (this.round - 5) / 500 && -1 * Math.cos(this.roundTime * .00175) + 1 + (this.round - 4) / 8 >= Math.random() * 1.5 + 1.5) {
                enemies.push(new Dribbler())
            }
        }
        if (this.round >= 8 && this.round <= 28) {

        }
        
        this.roundTime++
        if (this.roundTime >= 3600 && Math.random() >= .995) {
            this.round++
            this.roundTime = 0
        }
        console.log(this.round, this.roundTime)
    }
}