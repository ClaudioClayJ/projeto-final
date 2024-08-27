// src/components/ListaProduto/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Menu from "../componentes/menu";  
import { db, collection, getDocs, deleteDoc, doc } from '../../firebaseConfig'; // Certifique-se de que deleteDoc está importado
import "../lista_produto/lista_produto.css"

export default function ListaProduto() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para buscar produtos do Firestore
        const fetchProdutos = async () => {
            try {
                // Referência para a coleção 'produtos'
                const produtosCollection = collection(db, 'produtos');
                // Obtém os documentos da coleção
                const produtosSnapshot = await getDocs(produtosCollection);
                // Extrai os dados dos documentos e configura o estado
                const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProdutos(produtosList);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao buscar produtos. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este produto?");
        if (confirmDelete) {
            try {
                // Referência ao documento do produto
                const produtoDoc = doc(db, 'produtos', id);
                // Remove o documento do Firestore
                await deleteDoc(produtoDoc);
                // Atualiza a lista de produtos após a exclusão
                setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id !== id));
                alert('Produto excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto. Tente novamente.');
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
        <div className="lista_produto-container">
            <div className="menu">
                    <Menu/>
            </div>
            <h2 className="lista_produto-title">Lista de Produtos</h2>
            <ul className="lista_produto-list">
                {produtos.length > 0 ? (
                    produtos.map(produto => (
                        <li key={produto.id} className="lista_produto-item">
                            <strong>Produto:</strong> {produto.nome} <br />
                            <strong>Categoria:</strong> {produto.categoria} <br />
                            <div className="lista_produto-actions">
                                <Link to={`/AlterarProduto/${produto.id}`}>
                                    <MdModeEditOutline size={30} color='#1601F0' />
                                </Link>
                                <FaTrash 
                                    size={25} 
                                    color='#F01A00' 
                                    onClick={() => handleDelete(produto.id)} 
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </ul>
        </div>
    );
}
