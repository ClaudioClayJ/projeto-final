const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
         saida (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            id_produto INT, 
            quantidade FLOAT,
            valor_unitario FLOAT,
            data_saida DATE)
            `, (createTableError) => {
    if (createTableError) {
        return res.status(500).send({
            error: createTableError.message
        });
    }
});


//consultar todos os dados
router.get("/",(req,res,next)=>{
    db.all('SELECT * FROM saida', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista das Saidas",
            saida: rows
        });
    });
})

//consultar apenas uma saida pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM saida where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro da saida",
            saida: rows
        });
    });
})

// aqui salvamos dados da saida
router.post("/",(req,res,next)=>{
    const {id_produto, quantidade, valor_unitario, data_saida } = req.body;
   db.serialize(() => {
        const insertSaida = db.prepare(`
        INSERT INTO entrada(id_produto, quantidade, valor_unitario, data_saida) VALUES(?,?,?,?)`);
        insertSaida.run(id_produto, quantidade, valor_unitario, data_saida);
        insertSaida.finalize();
    });
    process.on("SIGINT", () => {
        db.close((err) => {
            if (err) {
                return res.status(304).send(err.message);
            }
        });
    });

    res.status(200)
    .send({ mensagem: "Saida salva com sucesso!" });
});

// aqui podemos alterar dados da saida
router.put("/",(req,res,next)=>{
 const {id,id_produto, quantidade, valor_unitario, data_saida} = req.body;
 db.run('UPDATE saida SET id_produto=?, quantidade=?, valor_unitario=?,  data_saida=?  WHERE id=?',[id_produto, quantidade, valor_unitario, data_saida ,id], (error, rows) => {
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
 // Aqui podemos deletar o cadastro de uma saida por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM saida where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }res.status(200).send(
            { mensagem: `Saida de id: ${id} foi deletado com sucesso!!!` 
        });
    })        
    


});
module.exports = router;