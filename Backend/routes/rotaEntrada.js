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

function atualizarestoque(id_produto, quantidade, valor_unitario) {
    db.get('SELECT * FROM estoque WHERE id_produto = ?', [id_produto], (error, row) => {
        if (error) {
            console.error(error.message);
            return;
        }

        const total = quantidade * valor_unitario;

        if (row) {
            const quantidadeAtualizada = parseFloat(row.quantidade + quantidade);

            const updateEstoque = db.prepare(`
                UPDATE estoque SET quantidade = ?, valor_unitario = ?, total = ? WHERE id_produto = ?
            `);
            updateEstoque.run(quantidadeAtualizada, valor_unitario, total, id_produto);
            updateEstoque.finalize();
        } else {
            const insertEstoque = db.prepare(`
                INSERT INTO estoque(id_produto, quantidade, valor_unitario, total) VALUES(?, ?, ?, ?)
            `);
            insertEstoque.run(id_produto, quantidade, valor_unitario, total);
            insertEstoque.finalize();
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
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    db.get('SELECT * FROM entrada WHERE id=?', [id], (error, row) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro da entrada",
            entrada: row // <- Aqui o frontend espera por isso!
        });
    });
});


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
// Aqui podemos alterar dados da entrada
router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const { id_produto, quantidade, valor_unitario, data_entrada } = req.body;

    db.run(
        'UPDATE entrada SET id_produto=?, quantidade=?, valor_unitario=?, data_entrada=? WHERE id=?',
        [id_produto, quantidade, valor_unitario, data_entrada, id],
        (error) => {
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            res.status(200).send({
                mensagem: `Entrada com ID ${id} atualizada com sucesso!`,
            });
        }
    );
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