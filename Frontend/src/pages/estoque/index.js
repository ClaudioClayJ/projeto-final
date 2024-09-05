// src/pages/estoque/index.js
import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../../firebaseConfig';
import "../estoque/estoque.css";
import Menu from "../componentes/menu";  

export default function Estoque() {
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
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

                // Buscar saídas
                const saidasCollection = collection(db, 'saidas');
                const saidasSnapshot = await getDocs(saidasCollection);
                const saidasList = saidasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSaidas(saidasList);

                // Buscar produtos
                const produtosCollection = collection(db, 'produtos');
                const produtosSnapshot = await getDocs(produtosCollection);
                const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProdutos(produtosList);

                // Calcular o total do estoque
                const total = entradasList.reduce((acc, entrada) => {
                    const quantidadeEntrada = parseFloat(entrada.quantidade) || 0;
                    const valorUnitario = parseFloat(entrada.valor_unitario) || 0;

                    // Calcular as saídas correspondentes a esse produto
                    const saidasProduto = saidasList.filter(saida => saida.id_produto === entrada.id_produto);
                    const quantidadeSaidas = saidasProduto.reduce((accSaida, saida) => {
                        return accSaida + (parseFloat(saida.quantidade) || 0);
                    }, 0);

                    // Subtrair saídas das entradas
                    const quantidadeDisponivel = quantidadeEntrada - quantidadeSaidas;

                    // Acumular no total o valor do estoque
                    return acc + (quantidadeDisponivel * valorUnitario);
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
                        // Calcular as saídas correspondentes
                        const quantidadeEntrada = parseFloat(entrada.quantidade) || 0;
                        const valorUnitario = parseFloat(entrada.valor_unitario) || 0;

                        const saidasProduto = saidas.filter(saida => saida.id_produto === entrada.id_produto);
                        const quantidadeSaidas = saidasProduto.reduce((accSaida, saida) => {
                            return accSaida + (parseFloat(saida.quantidade) || 0);
                        }, 0);

                        // Quantidade disponível no estoque
                        const quantidadeDisponivel = quantidadeEntrada - quantidadeSaidas;
                        const totalEntrada = quantidadeDisponivel * valorUnitario;

                        // Obter o nome do produto usando o ID
                        const nomeProduto = produtoMap[entrada.id_produto] || 'Desconhecido';

                        return (
                            <li key={entrada.id} className="estoque-item">
                                <strong>Nome do Produto:</strong> {nomeProduto} <br />
                                <strong>ID do Produto:</strong> {entrada.id_produto} <br />
                                <strong>Quantidade no Estoque:</strong> {quantidadeDisponivel} <br />
                                <strong>Valor Unitário:</strong> R$ {entrada.valor_unitario} <br />
                                <strong>Total Disponível:</strong> R$ {totalEntrada.toFixed(2).replace('.', ',')} <br />
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
