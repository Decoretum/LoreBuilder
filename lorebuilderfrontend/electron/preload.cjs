const { contextBridge, webUtils } = require("electron");

console.log("webUtils exists:", !!webUtils);

contextBridge.exposeInMainWorld("electronAPI", {
    getFilePath: (file) => {
        console.log("getFilePath called");
        return webUtils.getPathForFile(file);
    }
});