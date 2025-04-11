const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Criação da tabela produtos
db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco FLOAT
    )`, (error) => {
    if (error) {
        return console.error("Erro ao criar tabela produtos:", error.message);
    }
});

// GET - Buscar todos os produtos
router.get("/", (req, res) => {
    db.all('SELECT * FROM produtos', (error, rows) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Lista de produtos cadastrados:",
            produtos: rows
        });
    });
});

// GET - Buscar um produto por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM produtos WHERE id = ?', [id], (error, row) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Produto encontrado:",
            produto: row
        });
    });
});

// POST - Cadastrar novo produto
router.post("/", (req, res) => {
    const { nome, descricao, preco } = req.body;

    const insert = db.prepare(`
        INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)
    `);
    insert.run(nome, descricao, preco, function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        res.status(201).send({
            mensagem: "Produto cadastrado com sucesso!",
            id: this.lastID
        });
    });
    insert.finalize();
});

// PUT - Atualizar produto
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    db.run(
        `UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?`,
        [nome, descricao, preco, id],
        function (error) {
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            res.status(200).send({
                mensagem: `Produto com ID ${id} atualizado com sucesso!`
            });
        }
    );
});

// DELETE - Deletar produto
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM produtos WHERE id = ?`, [id], function (error) {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: `Produto com ID ${id} foi deletado com sucesso!`
        });
    });
});

module.exports = router;
