const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const Database = require('better-sqlite3');

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL(
    isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );
}

function initializeDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'mangas.db');
  db = new Database(dbPath);
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS mangas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titre TEXT NOT NULL,
      tomes_total INTEGER NOT NULL,
      tomes_possedes TEXT,
      tomes_lus TEXT,
      statut TEXT,
      date_ajout DATETIME DEFAULT CURRENT_TIMESTAMP,
      date_modification DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

app.whenReady().then(() => {
  initializeDatabase();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('getAllMangas', async () => {
  try {
    return db.prepare('SELECT * FROM mangas ORDER BY titre').all();
  } catch (error) {
    console.error('Error getting mangas:', error);
    throw error;
  }
});

ipcMain.handle('addManga', async (event, manga) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO mangas (titre, tomes_total, tomes_possedes, tomes_lus, statut)
      VALUES (@titre, @tomes_total, @tomes_possedes, @tomes_lus, @statut)
    `);
    const result = stmt.run(manga);
    return result.lastInsertRowid;
  } catch (error) {
    console.error('Error adding manga:', error);
    throw error;
  }
});

ipcMain.handle('updateManga', async (event, id, manga) => {
  try {
    const stmt = db.prepare(`
      UPDATE mangas 
      SET titre = @titre,
          tomes_total = @tomes_total,
          tomes_possedes = @tomes_possedes,
          tomes_lus = @tomes_lus,
          statut = @statut,
          date_modification = CURRENT_TIMESTAMP
      WHERE id = @id
    `);
    stmt.run({ ...manga, id });
    return true;
  } catch (error) {
    console.error('Error updating manga:', error);
    throw error;
  }
});

ipcMain.handle('deleteManga', async (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM mangas WHERE id = ?');
    stmt.run(id);
    return true;
  } catch (error) {
    console.error('Error deleting manga:', error);
    throw error;
  }
});