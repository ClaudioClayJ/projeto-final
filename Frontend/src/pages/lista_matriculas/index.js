// src/pages/lista_matriculas/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import "../lista_matriculas/lista_matricula.css";
import Menu from "../componentes/menu";

export default function ListaMatriculas() {
    const [matriculas, setMatriculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Buscando as matrículas do backend (SQLite)
    useEffect(() => {
        const fetchMatriculas = async () => {
            try {
                const response = await fetch('http://localhost:5000/matriculas'); // Endereço da API no backend
                if (!response.ok) {
                    throw new Error('Erro ao buscar matrículas');
                }
                const data = await response.json();
                setMatriculas(data.matriculas || []);
            } catch (error) {
                console.error(error);
                setError('Erro ao buscar matrículas. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchMatriculas();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta matrícula?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/matriculas/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Erro ao excluir matrícula');
                }
                setMatriculas((prevMatriculas) => prevMatriculas.filter((matricula) => matricula.id !== id));
                alert('Matrícula excluída com sucesso!');
            } catch (error) {
                console.error(error);
                alert('Erro ao excluir matrícula. Tente novamente mais tarde.');
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
        <div className="lista-matriculas-container">
            <div className="menu">
                <Menu />
            </div>
            <h2 className="lista-matriculas-title">Lista de Matrículas</h2>

            <div className="lista-matriculas-add-button">
                <Link to="/CadastroMatricula">
                    <button className="cadastro-button">Cadastrar Nova Matrícula</button>
                </Link>
            </div>

            <ul className="lista-matriculas-list">
                {matriculas.length > 0 ? (
                    matriculas.map((matricula) => (
                        <li key={matricula.id} className="lista-matriculas-item">
                            <div className="justificado">
                                <strong>Nome do Aluno:</strong> {matricula.nome} <br />
                                <strong>CPF:</strong> {matricula.cpf} <br />
                                <strong>Email:</strong> {matricula.email} <br />
                                <strong>Plano:</strong> {matricula.plano} <br />
                                <strong>Valor do Plano:</strong> R$ {matricula.valorPlano} <br />
                                <strong>Descrição do Plano:</strong> {matricula.descricaoPlano} <br />
                            </div>
                            <div className="lista-matriculas-actions">
                                <Link to={`/AlterarMatricula/${matricula.id}`}>
                                    <MdModeEditOutline size={30} color='#1601F0' />
                                </Link>
                                <FaTrash
                                    size={25}
                                    color='#F01A00'
                                    onClick={() => handleDelete(matricula.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Nenhuma matrícula encontrada.</p>
                )}
            </ul>
        </div>
    );
}
