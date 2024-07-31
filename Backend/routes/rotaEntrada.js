const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
         entrada (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            id_produto INT, 
            quantidade FLOAT,
            valor_unitario FLOAT,
            data_entrada DATE)
            `, (createTableError) => {
    if (createTableError) {
        return res.status(500).send({
            error: createTableError.message
        });
    }
});

function atualizarestoque(id_produto,quantidade,valor_unitario){

    db.get('SELECT * FROM estoque where id_produto=?',[id_produto], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }
        
        if(rows.length>0){
           // atualizar a quantidade no estoque 1
           //acrescentando aquantidade inserida na entrada
           const quantidaEstoque = rows[0].quantidade;
           const quantidadeAtualizada = parseFloat(quantidade + quantidaEstoque)
           const total = quantidade*valor_unitario
           const updateEstoque = db.prepare(`
           UPDATE estoque SET quantidade=?, valor_unitario=?, total=? WHERE quantidade= ?`);
           updateEstoque.run(quantidadeAtualizada, quantidade, valor_unitario, total, id_produto);
           updateEstoque.finalize();
        }else{
            //inserir a mesma quabtidade inserida na entrada
            db.serialize(() => {
                const total = quantidade*valor_unitario
                const insertEstoque = db.prepare(`
                INSERT INTO estoque(id_produto, quantidade, valor_unitario, total) VALUES(?,?,?,?)`);
                insertEstoque.run(id_produto, quantidade, valor_unitario, total);
                insertEstoque.finalize();
        
                // const idgerado = insertEntrada.LAST_INERT_ID()
           
            });


        }
       
    });

}

//consultar todos os dados
router.get("/",(req,res,next)=>{
    db.all('SELECT * FROM entrada', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista das Entradas",
            entrada: rows
        });
    });
})

//consultar apenas uma entrada pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM entrada where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro da entrada",
            entrada: rows
        });
    });
})

// aqui salvamos dados da entrada
router.post("/",(req,res,next)=>{
    const {id_produto, quantidade, valor_unitario, data_entrada } = req.body;
   db.serialize(() => {
        const insertEntrada = db.prepare(`
        INSERT INTO entrada(id_produto, quantidade, valor_unitario, data_entrada) VALUES(?,?,?,?)`);
        insertEntrada.run(id_produto, quantidade, valor_unitario, data_entrada);
        insertEntrada.finalize();

        // const idgerado = insertEntrada.LAST_INERT_ID()
   
    });

    atualizarestoque(id_produto,quantidade,valor_unitario);

    process.on("SIGINT", () => {
        db.close((err) => {
            if (err) {
                return res.status(304).send(err.message);
            }
        });
    });

    res.status(200)
    .send({ mensagem: "Entrada salva com sucesso!" });
});


router.get("/calculo",(req,res,next)=>{
const n1 = 10
const n2 = 20
const total = parsetFloat(n1 + n2)
console.log(total)
})
// aqui podemos alterar dados da entrada
router.put("/",(req,res,next)=>{
 const {id,id_produto, quantidade, valor_unitario, data_entrada} = req.body;
 db.run('UPDATE entrada SET id_produto=?, quantidade=?, valor_unitario=?,  data_entrada=?  WHERE id=?',[id_produto, quantidade, valor_unitario, data_entrada ,id], (error, rows) => {
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
 // Aqui podemos deletar o cadastro de uma entrada por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM entrada where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }res.status(200).send(
            { mensagem: `Entrada de id: ${id} foi deletado com sucesso!!!` 
        });
    })        
    


});
module.exports = router;