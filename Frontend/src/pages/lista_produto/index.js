import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Menu from "../componentes/menu";  
import axios from 'axios'; // Importando axios para requisições HTTP
import "../lista_produto/lista_produto.css";

export default function ListaProduto() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para buscar produtos do backend (SQLite)
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/produtos'); // Endpoint do backend
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao buscar produtos. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    // Função para deletar um produto
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este produto?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/produtos/${id}`); // Requisição para excluir produto
                setProdutos(produtos.filter(produto => produto.id !== id));
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
                <Menu />
            </div>
            <h2 className="lista_produto-title">Lista de Produtos</h2>
            
            {/* Botão de Cadastro */}
            <div className="lista_produto-add-button">
                <Link to="/CadastroProduto">
                    <button className="cadastro-button">Cadastrar Novo Produto</button>
                </Link>
            </div>
            
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
