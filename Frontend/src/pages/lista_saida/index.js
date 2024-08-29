// src/pages/lista_saida/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { db, collection, getDocs, deleteDoc, doc } from '../../firebaseConfig';
import "./lista_saida.css";
import Menu from "../componentes/menu";  

export default function ListaSaida() {
    const [saidas, setSaidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSaidas = async () => {
            try {
                const saidasCollection = collection(db, 'saidas');
                const saidasSnapshot = await getDocs(saidasCollection);
                const saidasList = saidasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSaidas(saidasList);
            } catch (error) {
                console.error('Erro ao buscar saídas:', error);
                setError('Erro ao buscar saídas. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchSaidas();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta saída?");
        if (confirmDelete) {
            try {
                const saidaDoc = doc(db, 'saidas', id);
                await deleteDoc(saidaDoc);
                setSaidas(prevSaidas => prevSaidas.filter(saida => saida.id !== id));
                alert('Saída excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir saída:', error);
                alert('Erro ao excluir saída. Tente novamente.');
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
        <div className="lista-saidas-container">
            <div className="menu">
                <Menu/>
            </div>
            <h2 className="lista-saidas-title">Lista de Saídas</h2>

            {/* Botão de Cadastro */}
            <div className="lista-saidas-add-button">
                <Link to="/CadastroSaida">
                    <button className="cadastro-button">Cadastrar Nova Saída</button>
                </Link>
            </div>

            <ul className="lista-saidas-list">
                {saidas.length > 0 ? (
                    saidas.map(saida => (
                        <li key={saida.id} className="lista-saidas-item">
                            <strong>ID do Produto:</strong> {saida.id_produto} <br />
                            <strong>Quantidade:</strong> {saida.quantidade} <br />
                            <strong>Data da Saída:</strong> {saida.data_saida} <br />
                            <div className="lista-saidas-actions">
                                <Link to={`/AlterarSaida/${saida.id}`}>
                                    <MdModeEditOutline size={30} color='#1601F0' />
                                </Link>
                                <FaTrash 
                                    size={25} 
                                    color='#F01A00' 
                                    onClick={() => handleDelete(saida.id)} 
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Nenhuma saída encontrada.</p>
                )}
            </ul>
        </div>
    );
}
