const { BrowserWindow, app, ipcMain, net } = require("electron");
const isDev = process.env.NODE_ENV === "development"
const Store = require("electron-store");
const store = new Store({
    cwd: "app-cache",
});
function createWindow() {
    // 创建一个浏览器窗口.
    let window = new BrowserWindow({
        width: 1580,
        height: 740,
        minWidth: 1024,
        minHeight: 660,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: false,
            contextIsolation: false,
            preload: __dirname + '\\preload.js'
        },
        frame: false,
    });

    if (isDev) {
        window.loadURL("http://localhost:3000");
        window.webContents.openDevTools();
    } else {
        window.loadFile('file://' + __dirname + './build/index.html')
    }

    window.on("closed", function () {
        window = null;
    });

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

    ipcMain.on('setStore', function (event, key, data) {
        store.set(key, data)
    })

    ipcMain.on('setMusicStore', function (event, musicId, data) {
        const musicStore = store.get('musicStore', [])
        const shouldAdd = true
        musicStore.forEach(item => {
            if (item.musicId == musicId) {
                item.data = data
                shouldAdd = false
            }
        })
        shouldAdd && musicStore.push({ musicId, data })
    })

    ipcMain.on("setPlaylistStore", function (event, playlistId, data) {
        const playlistStore = store.get('playlistStore', [])
        const shouldAdd = true
        musicStore.forEach(item => {
            if (item.playlistId == playlistId) {
                item.data = data
                shouldAdd = false
            }
        })
        shouldAdd && playlistStore.push({ musicId, data })
    })

    ipcMain.handle('getStore', async (event, key) => {
        const res = store.get(key, null)
        return res
    })

    ipcMain.handle('getAllStore', async (event, key) => {
        const res = store.store
        return res
    })

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
