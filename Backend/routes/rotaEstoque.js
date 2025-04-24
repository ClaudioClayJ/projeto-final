const express = require("express");
const router = express.Router();
const db = require("../sqlite/sqlite");

// Criação da tabela estoque
db.run(`
    CREATE TABLE IF NOT EXISTS 
    estoque (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        id_produto INT, 
        quantidade FLOAT,
        valor_unitario FLOAT,
        total FLOAT
    )
`, (createTableError) => {
    if (createTableError) {
        console.error("Erro ao criar tabela de estoque:", createTableError.message);
    }
});

// Consultar todos os dados
router.get("/", async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM estoque');
        res.status(200).send({
            mensagem: "Aqui está a lista do Estoque",
            estoque: rows
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

// Consultar apenas um estoque pelo ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const row = await db.get('SELECT * FROM estoque WHERE id=?', [id]);
        res.status(200).send({
            mensagem: "Aqui está o cadastro de estoque",
            estoque: row
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

// Salvar dados do estoque
router.post("/", async (req, res) => {
    const { id_produto, quantidade, valor_unitario, total } = req.body;
    try {
        const insert = await db.run(`
            INSERT INTO estoque(id_produto, quantidade, valor_unitario, total)
            VALUES (?, ?, ?, ?)
        `, [id_produto, quantidade, valor_unitario, total]);

        res.status(200).send({
            mensagem: "Estoque salvo com sucesso!",
            id: insert.id
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

// Alterar dados do estoque
router.put("/", async (req, res) => {
    const { id, id_produto, quantidade, valor_unitario, total } = req.body;
    try {
        await db.run(`
            UPDATE estoque
            SET id_produto=?, quantidade=?, valor_unitario=?, total=?
            WHERE id=?
        `, [id_produto, quantidade, valor_unitario, total, id]);

        res.status(200).send({
            mensagem: `Dados de id: ${id} foram alterados com sucesso!`
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

// Deletar um estoque pelo ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.run('DELETE FROM estoque WHERE id=?', [id]);
        res.status(200).send({
            mensagem: `Estoque de id: ${id} foi deletado com sucesso!`
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

module.exports = router;
