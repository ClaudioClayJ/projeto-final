const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../sqlite/sqlite");

// Criação da tabela usuário
db.run(`
    CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT, 
        email TEXT UNIQUE, 
        senha TEXT
    )
`);

// ✅ Consultar todos os dados
router.get("/", async (req, res) => {
    try {
        const rows = await db.all('SELECT id, nome, email FROM usuario');
        res.status(200).send({
            mensagem: "Aqui está a lista de todos os Usuários",
            usuarios: rows
        });
    } catch (error) {
        res.status(500).send({ error: "Erro ao consultar os usuários. " + error.message });
    }
});

// ✅ Logar um usuário específico
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
        return res.status(400).send({ mensagem: "Email e senha são obrigatórios." });
    }

    try {
        const user = await db.get('SELECT * FROM usuario WHERE email=?', [email]);
        if (user && await bcrypt.compare(senha, user.senha)) {
            const usuario = { id: user.id, nome: user.nome, email: user.email };
            res.status(200).send({
                mensagem: "Usuário logado com sucesso!",
                usuario: usuario
            });
        } else {
            res.status(404).send({ mensagem: "Usuário não encontrado ou senha incorreta." });
        }
    } catch (error) {
        res.status(500).send({ error: "Erro ao fazer login: " + error.message });
    }
});

// ✅ Consultar um usuário por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.get('SELECT id, nome, email FROM usuario WHERE id=?', [id]);
        if (user) {
            res.status(200).send({
                mensagem: "Aqui está o cadastro do Usuário",
                usuario: user
            });
        } else {
            res.status(404).send({ mensagem: "Usuário não encontrado." });
        }
    } catch (error) {
        res.status(500).send({ error: "Erro ao consultar usuário: " + error.message });
    }
});

// ✅ Cadastro de novo usuário
router.post("/", async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send({ mensagem: "Nome, email e senha são obrigatórios." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(senha, salt);

        const result = await db.run(
            `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`,
            [nome, email, hashedSenha]
        );

        res.status(201).send({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).send({ error: "Erro ao cadastrar usuário: " + error.message });
    }
});

// ✅ Atualizar dados de um usuário
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send({ mensagem: "Nome, email e senha são obrigatórios." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(senha, salt);

        await db.run(
            'UPDATE usuario SET nome=?, email=?, senha=? WHERE id=?',
            [nome, email, hashedSenha, id]
        );

        res.status(200).send({
            mensagem: `Dados do usuário de id ${id} foram alterados com sucesso!`
        });
    } catch (error) {
        res.status(500).send({ error: "Erro ao atualizar usuário: " + error.message });
    }
});

// ✅ Deletar usuário por ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.run('DELETE FROM usuario WHERE id=?', [id]);
        res.status(200).send({
            mensagem: `Usuário de id: ${id} foi deletado com sucesso!`
        });
    } catch (error) {
        res.status(500).send({ error: "Erro ao deletar usuário: " + error.message });
    }
});

module.exports = router;
