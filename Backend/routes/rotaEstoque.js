const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
         estoque (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            id_produto INT, 
            quantidade FLOAT,
            valor_unitario FLOAT,
            total FLOAT)
            `, (createTableError) => {
    if (createTableError) {
        return res.status(500).send({
            error: createTableError.message
        });
    }
});


//consultar todos os dados
router.get("/",(req,res,next)=>{
    db.all('SELECT * FROM estoque', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista do Estoque",
            estoque: rows
        });
    });
})

//consultar apenas um estoque pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM estoque where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro de estoque",
            estoque: rows
        });
    });
})

// aqui salvamos dados do estoque
router.post("/",(req,res,next)=>{
    const {id_produto, quantidade, valor_unitario, total } = req.body;
   db.serialize(() => {
        const insertEstoque = db.prepare(`
        INSERT INTO entrada(id_produto, quantidade, valor_unitario, total) VALUES(?,?,?,?)`);
        insertEstoque.run(id_produto, quantidade, valor_unitario, total);
        insertEstoque.finalize();
    });
    process.on("SIGINT", () => {
        db.close((err) => {
            if (err) {
                return res.status(304).send(err.message);
            }
        });
    });

    res.status(200)
    .send({ mensagem: "Estoque salvo com sucesso!" });
});

// aqui podemos alterar dados do estoque
router.put("/",(req,res,next)=>{
 const {id,id_produto, quantidade, valor_unitario, total} = req.body;
 db.run('UPDATE estoque SET id_produto=?, quantidade=?, valor_unitario=?,  total=?  WHERE id=?',[id_produto, quantidade, valor_unitario, total ,id], (error, rows) => {
    if (error) {
        return res.status(500).send({
            error: error.message
        });
    }res.status(200).send(
        { mensagem: `Dados de ${id_produto} e de id: ${id} foi aterado com sucesso!!!` 
        // { mensagem: "Dados de "+descricao+" e de id: "+id+" foi aterado com sucesso!!!" 
    });
})   
});
 // Aqui podemos deletar o cadastro de um estoque por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM estoque where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }res.status(200).send(
            { mensagem: `Estoque de id: ${id} foi deletado com sucesso!!!` 
        });
    })        
    


});
module.exports = router;