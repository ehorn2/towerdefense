class Map {
    constructor() {
        this.title
        this.nodes = []
        this.raw
        this.drawData
    }
    loadMapResolve(response) {
        return Promise.resolve(response)
    }
    loadMapJson(response) {
        return response.json()
    }
    loadMap(url) {
        return new Promise(function(resolve, reject) {
        fetch('./maps/' + url)
            .then(map.loadMapResolve)
            .then(map.loadMapJson)
            .then(function(data) {
                console.log('Map Loaded Successfully!', data)
                map.parseMap(data)
                console.log('Resolving map load')
                resolve()
            })
        })
    }
    parseMap(data) {
        this.raw = data
        this.nodes = data.nodes
        this.title = data.title
        this.drawData = data.drawData
        this.waves = data.waves
        console.log('Map Parsed Successfully!', map)
    }

}