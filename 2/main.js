const {app, BrowserWindow} = require('electron');


function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile('index.html').then(r => console.log(r))
    // win.setMenu(true);
}

app.on('ready', createWindow)