const {app, BrowserWindow} = require('electron')

var newWindow = function() {
    const win = new BrowserWindow({
        width: 200,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.setContentSize(1200, 600)
    win.center()
    win.loadFile('index.html')
}

app.on('ready', () => {
    newWindow()
})