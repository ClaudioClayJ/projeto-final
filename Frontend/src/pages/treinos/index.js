import React, { useState } from "react";
import Menu from "../componentes/menu";
import '../../pages/treinos/treinos.css'

const treinos = {
  treinoA: ["Supino Reto 4x8", "Remada Curvada 3x10", "Agachamento 4x8", "Desenvolvimento Militar 3x12", "Crucifixo Inclinado 3x12"],
  treinoB: ["Puxada Frontal 4x12", "Desenvolvimento 3x10", "Leg Press 4x12", "Cadeira Extensora 3x15", "Panturrilha 4x15"],
  treinoC: ["Barra Fixa 3x8", "Crucifixo 3x12", "Stiff 3x10", "Rosca Alternada 3x12", "Tríceps na Polia 3x15"],
  treinoD: ["Desenvolvimento Arnold 3x10", "Rosca Direta 3x12", "Extensão de Tríceps 3x12", "Abdominal 3x20", "Puxada na Polia 3x12"],
  treinoE: ["Puxada na Barra 3x12", "Peck Deck 3x10", "Cadeira Abdutora 3x15", "Prancha 3x1min", "Elevação de Pernas 3x15"]
};

export default function Treino() {
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);

  const handleClick = (treino) => {
    setTreinoSelecionado(treino);
  };

  return (
    <div className="dashboard-container treino-container">
      <div className="menu treino-menu">
        <Menu />
      </div>
      <div className="treino-buttons">
        {Object.keys(treinos).map((treino) => (
          <button 
            key={treino} 
            className={`treino-button ${treinoSelecionado === treino ? 'selected' : ''}`}
            onClick={() => handleClick(treino)}
          >
            {treino.replace(/([A-Z])/g, ' $1').toUpperCase()}
          </button>
        ))}
      </div>
      <div className="treino-list">
        {treinoSelecionado && (
          <ul>
            {treinos[treinoSelecionado].map((exercicio, index) => (
              <li key={index} className="treino-item">{exercicio}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
