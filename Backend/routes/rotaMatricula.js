const express = require('express');
const router = express.Router();
const db = require('../sqlite/sqlite.js');

// Criação da tabela Matricula, caso não exista
db.run(`
    CREATE TABLE IF NOT EXISTS Matricula (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT,
        cpf TEXT UNIQUE NOT NULL,
        rg TEXT,
        dataNascimento TEXT,
        email TEXT,
        telefone TEXT,
        cep TEXT,
        endereco TEXT,
        bairro TEXT,
        genero TEXT,
        plano TEXT,
        valorPlano REAL,
        descricaoPlano TEXT
    )
`, (err) => {
    if (err) {
        console.error("Erro ao criar a tabela Matricula:", err.message);
    }
});

// POST - Cadastrar nova matrícula
router.post("/", async (req, res) => {
    const {
        nome, cpf, rg, dataNascimento, email, telefone,
        cep, endereco, bairro, genero,
        plano, valorPlano, descricaoPlano
    } = req.body;

    // Validação básica
    if (!nome || !cpf || !plano) {
        return res.status(400).json({ erro: "Campos obrigatórios (nome, cpf, plano) não foram preenchidos." });
    }

    try {
        // Verifica se o CPF já está cadastrado
        const existente = await db.get("SELECT cpf FROM Matricula WHERE cpf = ?", [cpf]);
        if (existente) {
            return res.status(409).json({ erro: "Já existe uma matrícula com esse CPF." });
        }

        await db.run(`
            INSERT INTO Matricula 
            (nome, cpf, rg, dataNascimento, email, telefone, cep, endereco, bairro, genero, plano, valorPlano, descricaoPlano) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nome, cpf, rg, dataNascimento, email, telefone, cep, endereco, bairro, genero, plano, valorPlano, descricaoPlano]
        );

        res.status(200).json({ mensagem: "Matrícula cadastrada com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar matrícula:", error);
        res.status(500).json({ erro: "Erro ao salvar matrícula." });
    }
});

// PUT - Alterar matrícula por CPF
router.put("/alterar", async (req, res) => {
    const {
        nome, cpf, rg, dataNascimento, email, telefone,
        cep, endereco, bairro, genero,
        plano, valorPlano, descricaoPlano
    } = req.body;

    if (!nome || !cpf || !plano) {
        return res.status(400).json({ erro: "Campos obrigatórios (nome, cpf, plano) não foram preenchidos." });
    }

    try {
        const result = await db.run(`
            UPDATE Matricula SET
                nome = ?, rg = ?, dataNascimento = ?, email = ?, telefone = ?,
                cep = ?, endereco = ?, bairro = ?, genero = ?,
                plano = ?, valorPlano = ?, descricaoPlano = ?
            WHERE cpf = ?`,
            [
                nome, rg, dataNascimento, email, telefone,
                cep, endereco, bairro, genero,
                plano, valorPlano, descricaoPlano,
                cpf
            ]
        );

        if (result.changes === 0) {
            return res.status(404).json({ erro: "Matrícula não encontrada para o CPF informado." });
        }

        res.status(200).json({ mensagem: "Matrícula atualizada com sucesso!" });
    } catch (error) {
        console.error("Erro ao alterar matrícula:", error);
        res.status(500).json({ erro: "Erro ao alterar matrícula." });
    }
});

// GET - Buscar matrícula por CPF
router.get("/:cpf", async (req, res) => {
    const { cpf } = req.params;

    try {
        const matricula = await db.get("SELECT * FROM Matricula WHERE cpf = ?", [cpf]);

        if (!matricula) {
            return res.status(404).json({ erro: "Matrícula não encontrada." });
        }

        res.status(200).json(matricula);
    } catch (error) {
        console.error("Erro ao buscar matrícula:", error);
        res.status(500).json({ erro: "Erro ao buscar matrícula." });
    }
});

// GET - Listar todas as matrículas
router.get("/", async (req, res) => {
    try {
        const matriculas = await db.all("SELECT * FROM Matricula");
        res.status(200).json(matriculas);
    } catch (error) {
        console.error("Erro ao listar matrículas:", error);
        res.status(500).json({ erro: "Erro ao listar matrículas." });
    }
});

// DELETE - Excluir matrícula por CPF
router.delete("/:cpf", async (req, res) => {
    const { cpf } = req.params;

    try {
        const result = await db.run("DELETE FROM Matricula WHERE cpf = ?", [cpf]);

        if (result.changes === 0) {
            return res.status(404).json({ erro: "Matrícula não encontrada." });
        }

        res.status(200).json({ mensagem: "Matrícula excluída com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir matrícula:", error);
        res.status(500).json({ erro: "Erro ao excluir matrícula." });
    }
});

module.exports = router;
