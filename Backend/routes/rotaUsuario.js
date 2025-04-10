    const express = require("express");
    const router = express.Router();
    const db = require("../sqlite/sqlite");

    //testandooo
    db.run(`CREATE TABLE IF NOT EXISTS 
            usuario (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                nome TEXT, 
                email TEXT, 
                senha TEXT)
                `, (createTableError) => {
        if (createTableError) {
            return res.status(500).send({
                error: createTableError.message
            });
        }
    });


    //consultar todos os dados
    router.get("/",(req,res,next)=>{
        db.all('SELECT * FROM usuario', (error, rows) => {
            if (error) {
                return res.status(500).send({
                    error: error.message
                });
            }

            res.status(200).send({
                mensagem: "Aqui está a lista de todos os Usuarios",
                usuarios: rows
            });
        });
    })
    //logar um usuario especifico
    router.post("/login",(req,res,next)=>{
        const {email,senha} = req.body
        db.get('SELECT * FROM usuario WHERE email=? AND senha=?',[email,senha], (error, rows) => {
            if (error) {
                return res.status(500).send({
                    error: error.message
                });
            }
    const usuario = {
        id:rows.id,
        nome:rows.nome,
        email:rows.email
    }
            res.status(200).send({
                mensagem: "Usuario logado com sucesso!!!",
                usuario: usuario
            });
        });
    })
    //consultar apenas um usuario pelo id
    router.get("/:id",(req,res,next)=>{
        const {id} = req.params;
        db.get('SELECT * FROM usuario where id=?',[id], (error, rows) => {
            if (error) {
                return res.status(500).send({
                    error: error.message
                });
            }

            res.status(200).send({
                mensagem: "Aqui está o cadastro do Usuario",
                usuario: rows
            });
        });
    })

    // aqui salvamos dados do usuário
    router.post("/",(req,res,next)=>{
        const { nome, email, senha } = req.body;
    db.serialize(() => {
            const insertUsuario = db.prepare(`
            INSERT INTO usuario(nome, email, senha) VALUES(?,?,?)`);
            insertUsuario.run(nome, email, senha);
            insertUsuario.finalize();
        });
        process.on("SIGINT", () => {
            db.close((err) => {
                if (err) {
                    return res.status(304).send(err.message);
                }
            });
        });

        res.status(200)
        .send({ mensagem: "Usuário salvo com sucesso!" });
    });

    // aqui podemos alterar dados do usuário
   // alterar dados do usuário
    router.put("/:id", (req, res, next) => {
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

    // Aqui podemos deletar o cadastro de um usuário por meio do id
    router.delete("/:id",(req,res,next)=>{
        const {id} = req.params
        db.run('DELETE FROM usuario where id=?',[id], (error, rows) => {
            if (error) {
                return res.status(500).send({
                    error: error.message
                });
            }res.status(200).send(
                { mensagem: `Usuário de id: ${id} foi deletado com sucesso!!!` 
            });
        })        
        


    });
    module.exports = router;