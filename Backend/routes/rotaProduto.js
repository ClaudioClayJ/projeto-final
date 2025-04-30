const express = require("express");
const router = express.Router();
const db = require("../sqlite/sqlite");

// Criação da tabela produtos caso não exista
db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco FLOAT
    )
`, (error) => {
    if (error) {
        console.error("Erro ao criar tabela produtos:", error.message);
    } else {
        console.log("Tabela de produtos criada ou já existe!");
    }
});


// GET - Buscar todos os produtos
router.get("/", async (req, res) => {
   
    try {
        const rows = await db.all('SELECT * FROM produtos');
        console.log("Produtos encontrados:", rows);
        res.status(200).send({
            mensagem: "Lista de produtos cadastrados:",
            produtos: rows
        });
    } catch (error) {
        console.error("Erro ao consultar produtos:", error.message);
        res.status(500).send({ error: error.message });
    }
});



// GET - Buscar um produto por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const row = await db.get('SELECT * FROM produtos WHERE id = ?', [id]);

        if (!row) {
            return res.status(404).send({ error: "Produto não encontrado." });
        }

        res.status(200).send({
            mensagem: "Produto encontrado:",
            produto: row
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// POST - Cadastrar novo produto
router.post("/", (req, res) => {
    const { nome, descricao, preco } = req.body;
  
    if (!nome || !preco) {
      return res.status(400).send({ error: "Nome e preço são obrigatórios." });
    }
  
    db.run(
      `INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)`,
      [nome, descricao, preco]
    ).then(result => {
      res.status(201).send({
        mensagem: "Produto cadastrado com sucesso!",
        id: result.id
      });
    }).catch(err => {
      res.status(500).send({ error: err.message });
    });
  });
  

// PUT - Atualizar produto
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).send({ error: "Nome e preço são obrigatórios." });
    }

    try {
        const result = await db.run(
            `UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?`,
            [nome, descricao, preco, id]
        );

        if (result.changes === 0) {
            return res.status(404).send({ error: "Produto não encontrado para atualização." });
        }

        res.status(200).send({
            mensagem: `Produto com ID ${id} atualizado com sucesso!`
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// DELETE - Deletar produto
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.run(`DELETE FROM produtos WHERE id = ?`, [id]);

        if (result.changes === 0) {
            return res.status(404).send({ error: "Produto não encontrado para deletar." });
        }

        res.status(200).send({
            mensagem: `Produto com ID ${id} foi deletado com sucesso!`
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = router;
