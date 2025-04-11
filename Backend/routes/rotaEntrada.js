const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Criação da tabela entrada
db.run(`
    CREATE TABLE IF NOT EXISTS entrada (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        id_produto INT, 
        quantidade FLOAT,
        valor_unitario FLOAT,
        data_entrada DATE
    )`, (createTableError) => {
    if (createTableError) {
        return console.error("Erro ao criar tabela entrada:", createTableError.message);
    }
});

// Atualiza ou insere no estoque
function atualizarestoque(id_produto, quantidade, valor_unitario) {
    db.get('SELECT * FROM estoque WHERE id_produto = ?', [id_produto], (error, row) => {
        if (error) {
            console.error(error.message);
            return;
        }

        const total = quantidade * valor_unitario;

        if (row) {
            const quantidadeAtualizada = row.quantidade + quantidade;
            const updateEstoque = db.prepare(`
                UPDATE estoque SET quantidade = ?, valor_unitario = ?, total = ? WHERE id_produto = ?
            `);
            updateEstoque.run(quantidadeAtualizada, valor_unitario, total, id_produto);
            updateEstoque.finalize();
        } else {
            const insertEstoque = db.prepare(`
                INSERT INTO estoque(id_produto, quantidade, valor_unitario, total) VALUES (?, ?, ?, ?)
            `);
            insertEstoque.run(id_produto, quantidade, valor_unitario, total);
            insertEstoque.finalize();
        }
    });
}

// GET - Listar todas as entradas
router.get("/", (req, res) => {
    db.all('SELECT * FROM entrada', (error, rows) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Lista de entradas cadastradas:",
            entrada: rows
        });
    });
});

// GET - Buscar uma entrada por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM entrada WHERE id = ?', [id], (error, row) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Entrada encontrada:",
            entrada: row
        });
    });
});

// POST - Cadastrar nova entrada
router.post("/", (req, res) => {
    const { id_produto, quantidade, valor_unitario, data_entrada } = req.body;

    const insertEntrada = db.prepare(`
        INSERT INTO entrada(id_produto, quantidade, valor_unitario, data_entrada) VALUES (?, ?, ?, ?)
    `);
    insertEntrada.run(id_produto, quantidade, valor_unitario, data_entrada, function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        atualizarestoque(id_produto, quantidade, valor_unitario);

        res.status(200).send({
            mensagem: "Entrada cadastrada com sucesso!"
        });
    });
    insertEntrada.finalize();
});

// PUT - Atualizar entrada
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { id_produto, quantidade, valor_unitario, data_entrada } = req.body;

    db.run(
        `UPDATE entrada SET id_produto=?, quantidade=?, valor_unitario=?, data_entrada=? WHERE id=?`,
        [id_produto, quantidade, valor_unitario, data_entrada, id],
        (error) => {
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            res.status(200).send({
                mensagem: `Entrada com ID ${id} atualizada com sucesso!`
            });
        }
    );
});

// DELETE - Remover entrada
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM entrada WHERE id = ?', [id], (error) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: `Entrada com ID ${id} foi deletada com sucesso!`
        });
    });
});

// Rota de teste para cálculo (corrigido)
router.get("/calculo", (req, res) => {
    const n1 = 10;
    const n2 = 20;
    const total = parseFloat(n1) + parseFloat(n2);
    console.log(total);
    res.send({ resultado: total });
});

module.exports = router;
