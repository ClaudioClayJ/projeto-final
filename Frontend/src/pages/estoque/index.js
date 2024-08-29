// src/pages/estoque/index.js
import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../../firebaseConfig';
import "../estoque/estoque.css";
import Menu from "../componentes/menu";  

export default function Estoque() {
    const [entradas, setEntradas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalEstoque, setTotalEstoque] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Buscar entradas
                const entradasCollection = collection(db, 'entradas');
                const entradasSnapshot = await getDocs(entradasCollection);
                const entradasList = entradasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEntradas(entradasList);

                // Buscar produtos
                const produtosCollection = collection(db, 'produtos');
                const produtosSnapshot = await getDocs(produtosCollection);
                const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProdutos(produtosList);

                // Calcular o total do estoque
                const total = entradasList.reduce((acc, entrada) => {
                    const quantidade = parseFloat(entrada.quantidade) || 0;
                    const valorUnitario = parseFloat(entrada.valor_unitario) || 0;
                    return acc + (quantidade * valorUnitario);
                }, 0);
                setTotalEstoque(total);

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    // Criar um mapeamento de ID para nome do produto
    const produtoMap = produtos.reduce((acc, produto) => {
        acc[produto.id] = produto.nome;
        return acc;
    }, {});

    return (
        <div className="estoque-container">
            <div className="menu">
                <Menu />
            </div>
            <h2 className="estoque-title">Estoque</h2>

            <div className="estoque-summary">
                <p><strong>Total do Estoque:</strong> R$ {totalEstoque.toFixed(2).replace('.', ',')}</p>
            </div>

            <ul className="estoque-list">
                {entradas.length > 0 ? (
                    entradas.map(entrada => {
                        // Calcular o total da entrada
                        const quantidade = parseFloat(entrada.quantidade) || 0;
                        const valorUnitario = parseFloat(entrada.valor_unitario) || 0;
                        const totalEntrada = quantidade * valorUnitario;

                        // Obter o nome do produto usando o ID
                        const nomeProduto = produtoMap[entrada.id_produto] || 'Desconhecido';

                        return (
                            <li key={entrada.id} className="estoque-item">
                                <strong>Nome do Produto:</strong> {nomeProduto} <br />
                                <strong>ID do Produto:</strong> {entrada.id_produto} <br />
                                <strong>Quantidade:</strong> {entrada.quantidade} <br />
                                <strong>Valor Unitário:</strong> {entrada.valor_unitario} <br />
                                <strong>Total da Entrada:</strong> R$ {totalEntrada.toFixed(2).replace('.', ',')} <br />
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
