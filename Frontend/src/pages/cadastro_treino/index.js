import React, { useState } from "react";
import axios from "axios";

const CadastroTreino = () => {
  const [idUsuario, setIdUsuario] = useState("");
  const [nomeTreino, setNomeTreino] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataTreino, setDataTreino] = useState("");

  const handleCadastrar = async (e) => {
    e.preventDefault();

    try {
      const treino = {
        id_usuario: idUsuario,
        nome_treino: nomeTreino,
        descricao,
        data_treino: dataTreino,
      };

      const response = await axios.post("http://localhost:5000/treinos", treino);

      alert("✅ Treino cadastrado com sucesso!");
      console.log("Resposta:", response.data);

      // Limpar campos
      setIdUsuario("");
      setNomeTreino("");
      setDescricao("");
      setDataTreino("");
    } catch (err) {
      console.error("Erro ao cadastrar treino:", err.message);
      alert("❌ Erro ao cadastrar treino.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Cadastro de Treino</h2>
      <form onSubmit={handleCadastrar}>
        <div>
          <label>ID do Usuário:</label>
          <input
            type="number"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nome do Treino:</label>
          <input
            type="text"
            value={nomeTreino}
            onChange={(e) => setNomeTreino(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <label>Data do Treino:</label>
          <input
            type="date"
            value={dataTreino}
            onChange={(e) => setDataTreino(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Treino</button>
      </form>
    </div>
  );
};

export default CadastroTreino;
