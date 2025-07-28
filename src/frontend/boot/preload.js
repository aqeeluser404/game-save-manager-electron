// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, callback) =>
    ipcRenderer.on(channel, (event, message) => callback(message)),
  invoke: (channel, data) => ipcRenderer.invoke(channel, data)
});
