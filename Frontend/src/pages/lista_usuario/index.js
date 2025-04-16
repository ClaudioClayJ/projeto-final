// src/pages/lista_usuario/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Menu from "../componentes/menu";
import "../lista_usuario/lista_usuario.css";

export default function ListaUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://localhost:5000/usuario");
                const data = await response.json();
                setUsuarios(data.usuarios);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                setError("Erro ao buscar usuários. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/usuario/${id}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
                    alert("Usuário excluído com sucesso!");
                } else {
                    const errorData = await response.json();
                    alert(`Erro ao excluir: ${errorData.error}`);
                }
            } catch (error) {
                console.error("Erro ao excluir usuário:", error);
                alert("Erro ao excluir usuário. Tente novamente.");
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
        <div className="lista_usuario-container">
            <div className="menu">
                <Menu />
            </div>
            <h2 className="lista_usuario-title">Lista de Usuários</h2>

            <div className="lista_usuario-add-button">
                <Link to="/CadastroUsuario">
                    <button className="cadastro-button">Cadastrar Novo Usuário</button>
                </Link>
            </div>

            <ul className="lista_usuario-list">
                {usuarios.length > 0 ? (
                    usuarios.map(usuario => (
                        <li key={usuario.id} className="lista_usuario-item">
                            <strong>Nome:</strong> {usuario.nome} <br />
                            <strong>Email:</strong> {usuario.email} <br />
                            <div className="lista_usuario-actions">
                                <Link to={`/AlterarUsuario/${usuario.id}`}>
                                    <MdModeEditOutline size={30} color='#1601F0' />
                                </Link>
                                <FaTrash
                                    size={25}
                                    color='#F01A00'
                                    onClick={() => handleDelete(usuario.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Nenhum usuário encontrado.</p>
                )}
            </ul>
        </div>
    );
}
