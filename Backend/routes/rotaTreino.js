const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Criação da tabela treino (caso não exista ainda)
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

module.exports = router;
