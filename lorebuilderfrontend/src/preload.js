// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

// The Renderer will execute the function or event at the left
// The backend / main electron file will handle the function called by the renderer
contextBridge.exposeInMainWorld('electronAPI', {
    getData: () => ipcRenderer.invoke('data:get') 
})
