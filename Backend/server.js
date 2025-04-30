const http = require('http');
const app = require('./app');
const db = require('./sqlite/sqlite'); // ✅ Importa o SQLite corretamente

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});

// ✅ Fecha a conexão com o SQLite ao encerrar o servidor (Ctrl + C)
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("❌ Erro ao fechar o banco:", err.message);
    } else {
      console.log("✅ Conexão com SQLite fechada.");
    }
    process.exit(0); // Encerra o processo
  });
});

