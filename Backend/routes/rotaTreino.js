const express = require("express");
const router = express.Router();
const db = require("../sqlite/sqlite");

// Criação da tabela treino caso não exista
db.run(`
    CREATE TABLE IF NOT EXISTS treino (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INT,
        nome_treino TEXT,
        descricao TEXT,
        data_treino DATE
    )
`);

// 🟡 PUT - Alterar treino de um usuário específico
router.put("/:id", (req, res) => {
    const { id } = req.params; // ID do treino
    const { id_usuario, nome_treino, descricao, data_treino } = req.body;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!id_usuario || !nome_treino || !data_treino) {
        return res.status(400).send({ erro: "Campos obrigatórios não preenchidos." });
    }

    // Atualiza o treino
    db.run(
        `UPDATE treino 
         SET id_usuario = ?, nome_treino = ?, descricao = ?, data_treino = ? 
         WHERE id = ?`,
        [id_usuario, nome_treino, descricao, data_treino, id],
        function (error) {
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            if (this.changes === 0) {
                return res.status(404).send({ mensagem: "Treino não encontrado." });
            }

            res.status(200).send({
                mensagem: `Treino com ID ${id} foi atualizado com sucesso!`
            });
        }
    );
});

// 🟢 POST - Cadastrar um novo treino
router.post("/", (req, res) => {
    const { id_usuario, nome_treino, descricao, data_treino } = req.body;

    // Validação dos campos obrigatórios
    if (!id_usuario || !nome_treino || !data_treino) {
        return res.status(400).send({ erro: "Campos obrigatórios não preenchidos." });
    }

    // Verifica se a data de treino está no formato correto (yyyy-mm-dd)
    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(data_treino)) {
        return res.status(400).send({ erro: "Formato de data inválido. Use o formato yyyy-mm-dd." });
    }

    // Cadastra o novo treino
    db.run(
        `INSERT INTO treino (id_usuario, nome_treino, descricao, data_treino)
         VALUES (?, ?, ?, ?)`,
        [id_usuario, nome_treino, descricao, data_treino],
        function (error) {
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            res.status(201).send({
                mensagem: "✅ Treino cadastrado com sucesso!",
                id: this.lastID
            });
        }
    );
});

module.exports = router;
