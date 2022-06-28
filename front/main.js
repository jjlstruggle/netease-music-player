const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV === "development"

function createWindow() {
    // 创建一个浏览器窗口.
    let window = new BrowserWindow({
        width: 1580,
        height: 740,
        minWidth: 1024,
        minHeight: 640,
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
        window.loadFile(path.join(__dirname, './build/index.html'))
    }

    window.on("closed", function () {
        window = null;
    });

    window.webContents.openDevTools();
    return window
}

app.whenReady().then(() => {

    let window = createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) (window = createWindow())
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    ipcMain.on("min", function () {
        window.minimize();
    });

    ipcMain.handle('windowIsMaximized', async () => {
        const res = window.isMaximized()
        return res
    })

    ipcMain.on("max", function () {
        if (window.isMaximized()) {
            window.restore();
        } else {
            window.maximize();
        }
    });

    ipcMain.on("close", function () {
        window.close();
    });

})
