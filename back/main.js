// `主进程`入口
const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const isDev = require('electron-is-dev');
function createWindow() {
    // 创建一个浏览器窗口.
    const window = new BrowserWindow({
        width: 1580,
        height: 740,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
        frame: false,
    });

    if (isDev) {
        window.loadURL("http://localhost:3000");
    } else {
        window.loadFile(path.join(__dirname, '../front/build/index.html'))
    }

    window.on("closed", function () {
        window = null;
    });

    window.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    ipcMain.on("window-min", function () {
        mainWindow.minimize();
    });

    ipcMain.on("window-max", function () {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
        } else {
            mainWindow.maximize();
        }
    });

    ipcMain.on("window-close", function () {
        mainWindow.close();
    });


})
