const express = require("express");
const router = express.Router();
const db = require("../sqlite/sqlite");

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
router.get("/", async (req, res) => {
    try {
        const rows = await db.all(`
            SELECT e.*, p.nome AS nome_produto
            FROM entradas e
            JOIN produtos p ON e.id_produto = p.id
        `);

        res.status(200).send({
            mensagem: "Entradas encontradas:",
            entradas: rows
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// POST - Cadastrar nova entrada
router.post("/", async (req, res) => {
    const { id_produto, quantidade, valor_unitario, total, data_entrada } = req.body;

    const insert = await db.run(`
        INSERT INTO entradas (id_produto, quantidade, valor_unitario, total, data_entrada)
        VALUES (?, ?, ?, ?, ?)
    `, [id_produto, quantidade, valor_unitario, total, data_entrada]);

    if (insert.error) {
        return res.status(500).send({ error: insert.error.message });
    }

    try {
        // Atualizar a quantidade do produto no estoque
        await db.run(`
            UPDATE produtos
            SET quantidade = quantidade + ?
            WHERE id = ?
        `, [quantidade, id_produto]);

        res.status(201).send({
            mensagem: "Entrada registrada com sucesso!",
            id: insert.id
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
