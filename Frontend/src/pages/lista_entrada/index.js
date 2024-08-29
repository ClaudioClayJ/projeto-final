// src/pages/lista_entrada/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { db, collection, getDocs, deleteDoc, doc } from '../../firebaseConfig';
import "../lista_entrada/lista_entrada.css";
import Menu from "../componentes/menu";  

export default function ListaEntradas() {
    const [entradas, setEntradas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Buscar produtos
                const produtosCollection = collection(db, 'produtos');
                const produtosSnapshot = await getDocs(produtosCollection);
                const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProdutos(produtosList);

                // Buscar entradas
                const entradasCollection = collection(db, 'entradas');
                const entradasSnapshot = await getDocs(entradasCollection);
                const entradasList = entradasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEntradas(entradasList);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setError('Erro ao buscar entradas. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta entrada?");
        if (confirmDelete) {
            try {
                const entradaDoc = doc(db, 'entradas', id);
                await deleteDoc(entradaDoc);
                setEntradas(prevEntradas => prevEntradas.filter(entrada => entrada.id !== id));
                alert('Entrada excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir entrada:', error);
                alert('Erro ao excluir entrada. Tente novamente.');
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
        <div className="lista-entradas-container">
            <div className="menu">
                <Menu/>
            </div>
            <h2 className="lista-entradas-title">Lista de Entradas</h2>

            {/* Botão de Cadastro */}
            <div className="lista-entradas-add-button">
                <Link to="/CadastroEntrada">
                    <button className="cadastro-button">Cadastrar Nova Entrada</button>
                </Link>
            </div>

            <ul className="lista-entradas-list">
                {entradas.length > 0 ? (
                    entradas.map(entrada => {
                        // Encontrar o nome do produto correspondente
                        const produto = produtos.find(prod => prod.id === entrada.id_produto);
                        const produtoNome = produto ? produto.nome : 'Produto não encontrado';

                        // Calcular o total da entrada
                        const quantidade = parseFloat(entrada.quantidade) || 0;
                        const valorUnitario = parseFloat(entrada.valor_unitario) || 0;
                        const totalEntrada = quantidade * valorUnitario;

                        return (
                            <li key={entrada.id} className="lista-entradas-item">
                                <strong>Produto:</strong> {produtoNome} <br />
                                <strong>ID do Produto:</strong> {entrada.id_produto} <br />
                                <strong>Quantidade:</strong> {entrada.quantidade} <br />
                                <strong>Valor Unitário:</strong> {entrada.valor_unitario} <br />
                                <strong>Data da Entrada:</strong> {entrada.data_entrada} <br />
                                <strong>Total da Entrada:</strong> R$ {totalEntrada.toFixed(2).replace('.', ',')} <br />
                                <div className="lista-entradas-actions">
                                    <Link to={`/AlterarEntrada/${entrada.id}`}>
                                        <MdModeEditOutline size={30} color='#1601F0' />
                                    </Link>
                                    <FaTrash 
                                        size={25} 
                                        color='#F01A00' 
                                        onClick={() => handleDelete(entrada.id)} 
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <p>Nenhuma entrada encontrada.</p>
                )}
            </ul>
        </div>
    );
}
