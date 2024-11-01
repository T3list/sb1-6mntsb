const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getAllMangas: () => ipcRenderer.invoke('getAllMangas'),
  addManga: (manga) => ipcRenderer.invoke('addManga', manga),
  updateManga: (id, manga) => ipcRenderer.invoke('updateManga', id, manga),
  deleteManga: (id) => ipcRenderer.invoke('deleteManga', id),
});