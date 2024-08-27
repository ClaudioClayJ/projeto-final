// src/components/ListaUsuario/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Menu from "../componentes/menu"; 
import { db, collection, getDocs, deleteDoc, doc } from '../../firebaseConfig'; // Ajuste o caminho conforme necessário
import "../lista_usuario/lista_usuario.css"

export default function ListaUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para buscar usuários do Firestore
        const fetchUsuarios = async () => {
            try {
                // Referência para a coleção 'usuarios'
                const usuariosCollection = collection(db, 'usuarios');
                // Obtém os documentos da coleção
                const usuariosSnapshot = await getDocs(usuariosCollection);
                // Extrai os dados dos documentos e configura o estado
                const usuariosList = usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsuarios(usuariosList);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setError('Erro ao buscar usuários. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este usuário?");
        if (confirmDelete) {
            try {
                // Referência ao documento do usuário
                const userDoc = doc(db, 'usuarios', id);
                // Remove o documento do Firestore
                await deleteDoc(userDoc);
                // Atualiza a lista de usuários após a exclusão
                setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
                alert('Usuário excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
                alert('Erro ao excluir usuário. Tente novamente.');
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
                    <Menu/>
            </div>
            <h2 className="lista_usuario-title">Lista de Usuários</h2>
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
