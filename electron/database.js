const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

const dbPath = path.join(app.getPath('userData'), 'mangas.db');
const db = new Database(dbPath);

// Initialiser le schéma
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

module.exports = db;