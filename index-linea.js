const electron = require('electron')
const path = require('path')
const url = require('url')
const { ipcMain, app, BrowserWindow } = require('electron')

const config = require('./config/index')
const jsonCtrl = require('./controllers/jsonfile.controller')

let closeable = false;
let status = true;
let webContLin;

app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'));

/*let createLinea = externalDisplay => {

    let linea = new BrowserWindow({
        x: externalDisplay.bounds.x + 50,
        y: externalDisplay.bounds.y + 50,
        width: externalDisplay.bounds.width,
        height: externalDisplay.bounds.height,
        fullscreen: true,
        alwaysOnTop: true,
        title: 'DTodoJuego VIP',
        closable: false
    })
    linea.setMenu(null);
    linea.loadURL(
        url.format({
            pathname: path.join(__dirname, '/public/loading.html'),
            protocol: 'file',
            slashes: true,
            title: 'Acceso al sistema',
        })
    );
    webContLin = linea.webContents;
}*/

let createKenoWin = () => {

    let displays = electron.screen.getAllDisplays();
    let externalDisplay = displays.find(display => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
    });
    if (externalDisplay) {
        let kenoWin = new BrowserWindow({
            x: externalDisplay.bounds.x + 50,
            y: externalDisplay.bounds.y + 50,
            width: electron.screen.getPrimaryDisplay().width,
            height: electron.screen.getPrimaryDisplay().height,
            fullscreen: true,
            title: 'DTodoJuego-VIP',
            webPreferences: {
                plugins: true,
            }
        })

        kenoWin.setMenu(null);
        kenoWin.loadURL(config.URLLINEA);

        kenoWin.on('close', evt => {
            app.exit();
        })

        /*let createModal = () => {
            let modal = new BrowserWindow({
                x: externalDisplay.bounds.x + 500,
                y: externalDisplay.bounds.y + 200,
                parent: kenoWin,
                modal: true,
                minimizable: false,
                maximizable: false,
                icon: config.icon,
                webPreferences: {
                    nodeIntegration: true
                }
            })
            modal.loadURL(
                url.format({
                    pathname: path.join(__dirname, '/public/login.html'),
                    protocol: 'file',
                    slashes: true,
                    title: 'Acceso al sistema',
                })
            );
            modal.setMenu(null);
            /*modal.on('close', evt => {
                if (!false) evt.preventDefault();
            });
    }*/

        let contents = kenoWin.webContents;

        jsonCtrl
            .readLoginJson()
            .then(login => {
                loginData = login;
                loadURL(loginData);
            })
            .catch(err => {
                console.log(err);
                createModal();
            });

        contents.addListener('did-navigate', function(evt, newURL, httpResponseCode, httpStatusText) {
            if (newURL.includes('/casino')) {
                contents.loadURL(config.URLLINEA);
                /*if (externalDisplay) {
                    webContLin.loadURL(config.URLLINEA)
                }*/
            } else if (newURL == config.URLLINEA) {
                kenoWin.setEnabled(closeable);
                //createModal();
            } else if (newURL == config.URLLINEA) jsonCtrl.readLoginJson();
        });

        contents.addListener('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
            if (errorCode == -106) {
                setTimeout(() => {
                    loadURL(loginData);
                }, 5000);
            }
        });

        ipcMain.on('onLogin', (evt, login) => {
            closeable = true;
            kenoWin.setEnabled(closeable);
            loadURL(login);
            jsonCtrl.writeLoginJson(login);
        });
        let loadURL = login => {
            kenoWin.loadURL(config.URLLINEA, {
                postData: [{
                    type: 'rawData',
                    bytes: Buffer.from('username=' + login.username + '&password=' + login.password),
                }, ],
                extraHeaders: 'Content-Type: application/x-www-form-urlencoded',
            });
        };
    }
}

app.on('ready', createKenoWin);