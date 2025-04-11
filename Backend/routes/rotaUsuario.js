const express = require("express");
const router = express.Router();
const db = require("../sqlite/sqlite");

// ✅ Criação da tabela sem res.status (evita erro fora de contexto de rota)
db.run(`CREATE TABLE IF NOT EXISTS 
    usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT, 
        email TEXT, 
        senha TEXT)
`);

// ✅ Consultar todos os dados
router.get("/", (req, res) => {
    db.all('SELECT * FROM usuario', (error, rows) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista de todos os Usuarios",
            usuarios: rows
        });
    });
});

// ✅ Logar um usuário específico
router.post("/login", (req, res) => {
    const { email, senha } = req.body;
    db.get('SELECT * FROM usuario WHERE email=? AND senha=?', [email, senha], (error, rows) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        const usuario = {
            id: rows?.id,
            nome: rows?.nome,
            email: rows?.email
        };

        res.status(200).send({
            mensagem: "Usuário logado com sucesso!!!",
            usuario: usuario
        });
    });
});

// ✅ Consultar um usuário por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM usuario WHERE id=?', [id], (error, rows) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro do Usuário",
            usuario: rows
        });
    });
});

// ✅ Cadastro de novo usuário
router.post("/", (req, res) => {
    const { nome, email, senha } = req.body;
    db.serialize(() => {
        const insertUsuario = db.prepare(`
            INSERT INTO usuario(nome, email, senha) VALUES(?,?,?)`);
        insertUsuario.run(nome, email, senha);
        insertUsuario.finalize();
    });

    res.status(200).send({ mensagem: "Usuário salvo com sucesso!" });
});

// ✅ Atualizar dados de um usuário
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    db.run(
        'UPDATE usuario SET nome=?, email=?, senha=? WHERE id=?',
        [nome, email, senha, id],
        (error) => {
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            res.status(200).send({
                mensagem: `Dados do usuário de id ${id} foram alterados com sucesso!`
            });
        }
    );
});

// ✅ Deletar usuário por ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM usuario WHERE id=?', [id], (error) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: `Usuário de id: ${id} foi deletado com sucesso!!!`
        });
    });
});

module.exports = router;
