import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Menu from "../componentes/menu";  
import "./lista_treinos.css";

export default function ListaTreinos() {
    const [treinos, setTreinos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carregar os treinos
    useEffect(() => {
        const fetchTreinos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/treino');
                setTreinos(response.data.treinos);
            } catch (error) {
                console.error('Erro ao buscar treinos:', error);
                setError('Erro ao buscar treinos. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchTreinos();
    }, []);

    // Deletar treino
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este treino?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/treino/${id}`);
                setTreinos(prevTreinos => prevTreinos.filter(treino => treino.id !== id));
                alert('Treino excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir treino:', error);
                alert('Erro ao excluir treino. Tente novamente.');
            }
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="lista-treinos-container">
            <div className="menu">
                <Menu />
            </div>
            <h2 className="lista-treinos-title">Lista de Treinos</h2>

            {/* Botão de Cadastro */}
            <div className="lista-treinos-add-button">
                <Link to="/CadastroTreino">
                    <button className="cadastro-button">Cadastrar Novo Treino</button>
                </Link>
            </div>

            <ul className="lista-treinos-list">
                {treinos.length > 0 ? (
                    treinos.map(treino => (
                        <li key={treino.id} className="lista-treinos-item">
                            <strong>Nome do Treino:</strong> {treino.nome_treino} <br />
                            <strong>Descrição:</strong> {treino.descricao} <br />
                            <strong>Data do Treino:</strong> {treino.data_treino} <br />
                            <div className="lista-treinos-actions">
                                <Link to={`/AlterarTreino/${treino.id}`}>
                                    <MdModeEditOutline size={30} color='#1601F0' />
                                </Link>
                                <FaTrash 
                                    size={25} 
                                    color='#F01A00' 
                                    onClick={() => handleDelete(treino.id)} 
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Nenhum treino encontrado.</p>
                )}
            </ul>
        </div>
    );
}
