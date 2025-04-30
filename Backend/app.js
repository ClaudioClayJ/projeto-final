const express = require('express')
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
const morgan = require("morgan");
app.use(morgan("dev"));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"

    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).send({});
    }
    next();
})

const rotaUsuario = require("./routes/rotaUsuario");
const rotaProduto = require("./routes/rotaProduto");
const rotaEstoque = require("./routes/rotaEstoque");
const rotaEntrada = require("./routes/rotaEntrada");
const rotaSaida = require("./routes/rotaSaida");
const rotaMatricula = require('./routes/rotaMatricula');
const rotaOfertas = require('./routes/rotaOfertas');
const rotaTreino = require("./routes/rotaTreino");

app.use("/usuario",rotaUsuario)
app.use("/produto",rotaProduto)
app.use("/estoque",rotaEstoque)
app.use("/entrada",rotaEntrada)
app.use("/saida",rotaSaida)
app.use("/matricula", rotaMatricula);
app.use("/oferta", rotaOfertas);
app.use("/treino", rotaTreino);
module.exports = app
