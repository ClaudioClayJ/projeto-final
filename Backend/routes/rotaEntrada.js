const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Criação da tabela entradas
db.run(`
    CREATE TABLE IF NOT EXISTS entradas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produto INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        valor_unitario REAL NOT NULL,
        total REAL NOT NULL,
        data_entrada TEXT NOT NULL,
        FOREIGN KEY (id_produto) REFERENCES produtos(id)
    )
`, (error) => {
    if (error) {
        return console.error("Erro ao criar tabela entradas:", error.message);
    }
});

// GET - Listar todas as entradas
router.get("/", (req, res) => {
    db.all(`
        SELECT e.*, p.nome AS nome_produto
        FROM entradas e
        JOIN produtos p ON e.id_produto = p.id
    `, (error, rows) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Entradas encontradas:",
            entradas: rows
        });
    });
});

// POST - Cadastrar nova entrada
router.post("/", (req, res) => {
    const { id_produto, quantidade, valor_unitario, total, data_entrada } = req.body;

    const insert = db.prepare(`
        INSERT INTO entradas (id_produto, quantidade, valor_unitario, total, data_entrada)
        VALUES (?, ?, ?, ?, ?)
    `);
    insert.run(id_produto, quantidade, valor_unitario, total, data_entrada, function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        // Atualizar a quantidade do produto no estoque
        db.run(`
            UPDATE produtos
            SET quantidade = quantidade + ?
            WHERE id = ?
        `, [quantidade, id_produto]);

        res.status(201).send({
            mensagem: "Entrada registrada com sucesso!",
            id: this.lastID
        });
    });
    insert.finalize();
});

module.exports = router;
