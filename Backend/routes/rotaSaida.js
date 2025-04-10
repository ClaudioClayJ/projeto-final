const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Criação da tabela (sem uso de res)
db.run(`
    CREATE TABLE IF NOT EXISTS saida (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        id_produto INT, 
        quantidade FLOAT,
        valor_unitario FLOAT,
        data_saida DATE
    )
`);

// 🟢 GET - Listar todas as saídas
router.get("/", (req, res) => {
    db.all("SELECT * FROM saida", (error, rows) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Lista de todas as saídas:",
            saida: rows
        });
    });
});

// 🟢 GET - Buscar uma saída pelo ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM saida WHERE id = ?", [id], (error, row) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        if (!row) {
            return res.status(404).send({ mensagem: "Saída não encontrada." });
        }

        res.status(200).send(row); // <-- direto o objeto
    });
});

// 🟢 POST - Inserir nova saída
router.post("/", (req, res) => {
    const { id_produto, quantidade, valor_unitario, data_saida } = req.body;

    db.run(
        `INSERT INTO saida (id_produto, quantidade, valor_unitario, data_saida) 
         VALUES (?, ?, ?, ?)`,
        [id_produto, quantidade, valor_unitario, data_saida],
        function (error) {
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            res.status(201).send({
                mensagem: "Saída registrada com sucesso!",
                id: this.lastID
            });
        }
    );
});

// 🟡 PUT - Atualizar uma saída específica
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { id_produto, quantidade, valor_unitario, data_saida } = req.body;

    db.run(
        `UPDATE saida 
         SET id_produto = ?, quantidade = ?, valor_unitario = ?, data_saida = ? 
         WHERE id = ?`,
        [id_produto, quantidade, valor_unitario, data_saida, id],
        function (error) {
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            if (this.changes === 0) {
                return res.status(404).send({ mensagem: "Saída não encontrada." });
            }

            res.status(200).send({
                mensagem: `Saída com ID ${id} atualizada com sucesso!`
            });
        }
    );
});

// 🔴 DELETE - Remover uma saída
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM saida WHERE id = ?", [id], function (error) {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        if (this.changes === 0) {
            return res.status(404).send({ mensagem: "Saída não encontrada." });
        }

        res.status(200).send({
            mensagem: `Saída com ID ${id} foi deletada com sucesso!`
        });
    });
});

module.exports = router;
