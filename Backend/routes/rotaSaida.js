const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Criação da tabela saidas
db.run(`
    CREATE TABLE IF NOT EXISTS saidas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produto INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        valor_unitario REAL NOT NULL,
        total REAL NOT NULL,
        data_saida TEXT NOT NULL,
        FOREIGN KEY (id_produto) REFERENCES produtos(id)
    )
`, (error) => {
    if (error) {
        return console.error("Erro ao criar tabela saidas:", error.message);
    }
});

// GET - Listar todas as saídas
router.get("/", (req, res) => {
    db.all(`
        SELECT s.*, p.nome AS nome_produto
        FROM saidas s
        JOIN produtos p ON s.id_produto = p.id
    `, (error, rows) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send(rows);  // Retorna diretamente as saídas com o nome do produto
    });
});


// POST - Registrar nova saída
router.post("/", (req, res) => {
    const { id_produto, quantidade, valor_unitario, total, data_saida } = req.body;

    // Verificar se há estoque suficiente
    db.get(`SELECT quantidade FROM produtos WHERE id = ?`, [id_produto], (err, row) => {
        if (err) return res.status(500).send({ error: err.message });

        const quantidadeDisponivel = row?.quantidade || 0;
        if (quantidade > quantidadeDisponivel) {
            return res.status(400).send({ mensagem: "Estoque insuficiente para essa saída." });
        }

        const insert = db.prepare(`
            INSERT INTO saidas (id_produto, quantidade, valor_unitario, total, data_saida)
            VALUES (?, ?, ?, ?, ?)
        `);
        insert.run(id_produto, quantidade, valor_unitario, total, data_saida, function (err) {
            if (err) {
                return res.status(500).send({ error: err.message });
            }

            // Atualizar estoque
            db.run(`
                UPDATE produtos
                SET quantidade = quantidade - ?
                WHERE id = ?
            `, [quantidade, id_produto]);

            res.status(201).send({
                mensagem: "Saída registrada com sucesso!",
                id: this.lastID
            });
        });
        insert.finalize();
    });
});

// DELETE - Excluir uma saída
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const deleteQuery = `DELETE FROM saidas WHERE id = ?`;
    db.run(deleteQuery, [id], function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send({ mensagem: "Saída não encontrada." });
        }
        res.status(200).send({ mensagem: "Saída excluída com sucesso!" });
    });
});


module.exports = router;
