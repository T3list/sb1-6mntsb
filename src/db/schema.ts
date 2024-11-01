const SCHEMA = `
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
`;

export default SCHEMA;