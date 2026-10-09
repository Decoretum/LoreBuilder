const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const fs = require("fs");

function createWindow() {
    const win = new BrowserWindow({
            width: 1280,
            minWidth: 1280,
            height: 800,
            minHeight: 800,
            webPreferences: {
                preload: path.join(__dirname, "preload.cjs"),
                contextIsolation: true,
                nodeIntegration: false
            },
        icon: path.join(__dirname, "../public/assets/wizard.ico")
    });

    win.webContents.setWindowOpenHandler(( {url} ) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            shell.openExternal(url);
        }

        return { action: 'deny' };
    })

    if (app.isPackaged) {
        win.loadFile(
            path.join(__dirname, "../dist/index.html")
        );
    } else {
        win.loadURL('http://localhost:5173');
    }

    // Enable this for Dev Tools
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});