import React, { useState, useEffect } from "react";
import '../../global.css'; 
import Menu from "../componentes/menu";

export default function Produtos() {
    const [dias, setDias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Substitua pela URL real da sua API
        fetch('https://api.exemplo.com/treinos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados recebidos:', data);
                setDias(data.dias); // Ajuste conforme a estrutura real dos dados
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
                setError(error.message);
            });
    }, []);

    return (
        <div className="dia-dashboard-container">
            <div className="dia-menu">
                <Menu />
            </div>
            <div className="dia-content">
                <h2>Treinos</h2>
                {error && <p className="dia-error-message">Erro ao carregar os treinos: {error}</p>}
                {dias.length > 0 ? (
                    dias.map((dia, index) => (
                        <div key={index} className="dia-dia-treino-card">
                            <h3 className="dia-dia-titulo">{dia.dia}</h3>
                            <ul className="dia-exercicios-list">
                                {dia.exercicios.map((exercicio, i) => (
                                    <li key={i} className="dia-exercicio-item">
                                        <h4 className="dia-exercicio-nome">{exercicio.nome}</h4>
                                        <p className="dia-exercicio-descricao">{exercicio.descricao}</p>
                                        <p className="dia-exercicio-duracao">Duração: {exercicio.duracao}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>Carregando treinos...</p>
                )}
            </div>
        </div>
    );
}
