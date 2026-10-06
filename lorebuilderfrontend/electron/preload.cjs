const { contextBridge, webUtils } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    getFilePath: (file) => {
        return webUtils.getPathForFile(file);
    }
});