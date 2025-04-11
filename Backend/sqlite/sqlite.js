const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { promisify } = require("util");

const dbPath = path.resolve(__dirname, "..", "database.db");

const sqlite = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao SQLite:", err.message);
  } else {
    console.log("✅ Banco SQLite conectado com sucesso!");
  }
});

// Promisificar métodos principais
const db = {
  run: (...args) => new Promise((resolve, reject) => {
    sqlite.run(...args, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  }),
  get: promisify(sqlite.get.bind(sqlite)),
  all: promisify(sqlite.all.bind(sqlite)),
  close: promisify(sqlite.close.bind(sqlite))
};

module.exports = db;
