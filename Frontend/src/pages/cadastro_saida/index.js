// src/pages/cadastro_saida/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc, doc, updateDoc, getDoc, getDocs, query, where, getCountFromServer } from '../../firebaseConfig'; // Certifique-se de que os métodos estão importados
import "../cadastro_saida/cd_saida.css";

export default function CadastroSaida() {
    const [idProduto, setIdProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [dataSaida, setDataSaida] = useState('');
    const [total, setTotal] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState('');

    // Função para calcular o total
    useEffect(() => {
        const calculoTotal = () => {
            // Garantir que quantidade e valorUnitario são números
            const quantidadeNum = parseFloat(quantidade);
            const valorUnitarioNum = parseFloat(valorUnitario);
            if (!isNaN(quantidadeNum) && !isNaN(valorUnitarioNum)) {
                const totalCalculado = quantidadeNum * valorUnitarioNum;
                setTotal(totalCalculado.toFixed(2)); // Convertendo para duas casas decimais
            } else {
                setTotal('');
            }
        };

        calculoTotal();
    }, [quantidade, valorUnitario]); // Recalcula quando quantidade ou valor unitário mudam

    // Buscar produtos disponíveis no Firestore
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const produtosCollection = collection(db, 'produtos');
                const produtosSnapshot = await getDocs(produtosCollection);
                const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProdutos(produtosList);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                alert('Erro ao buscar produtos. Tente novamente.');
            }
        };

        fetchProdutos();
    }, []);

    useEffect(() => {
        const fetchQuantidadeDisponivel = async () => {
            if (idProduto) {
                try {
                    const entradasCollection = collection(db, 'entradas');
                    const entradasQuery = query(entradasCollection, where('id_produto', '==', idProduto));
                    const entradasSnapshot = await getDocs(entradasQuery);
                    
                    // Soma a quantidade de todas as entradas para o produto
                    const quantidadeEntradas = entradasSnapshot.docs.reduce((acc, doc) => {
                        const data = doc.data();
                        return acc + (data.quantidade || 0);
                    }, 0);

                    const saidasCollection = collection(db, 'saidas');
                    const saidasQuery = query(saidasCollection, where('id_produto', '==', idProduto));
                    const saidasSnapshot = await getDocs(saidasQuery);

                    // Soma a quantidade de todas as saídas para o produto
                    const quantidadeSaidas = saidasSnapshot.docs.reduce((acc, doc) => {
                        const data = doc.data();
                        return acc + (data.quantidade || 0);
                    }, 0);

                    // Calcula a quantidade disponível
                    const quantidadeDisponivel = quantidadeEntradas - quantidadeSaidas;
                    setQuantidadeDisponivel(quantidadeDisponivel >= 0 ? quantidadeDisponivel : 0);
                } catch (error) {
                    console.error('Erro ao buscar quantidade disponível:', error);
                    setQuantidadeDisponivel(0);
                }
            } else {
                setQuantidadeDisponivel('');
            }
        };

        fetchQuantidadeDisponivel();
    }, [idProduto]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Adicionar nova saída
            const saidaRef = collection(db, 'saidas');
            await addDoc(saidaRef, {
                id_produto: idProduto,
                quantidade: parseFloat(quantidade),
                valor_unitario: parseFloat(valorUnitario),
                total: parseFloat(total),
                data_saida: dataSaida,
            });

            // Atualizar o estoque
            const produtoRef = doc(db, 'produtos', idProduto);
            const produtoDoc = await getDoc(produtoRef);
            if (produtoDoc.exists()) {
                const produtoData = produtoDoc.data();
                const novaQuantidade = (produtoData.quantidade || 0) - parseFloat(quantidade);
                await updateDoc(produtoRef, { quantidade: novaQuantidade });
            }

            alert('Saída registrada com sucesso!');
            // Limpar campos após o cadastro
            setIdProduto('');
            setQuantidade('');
            setValorUnitario('');
            setDataSaida('');
            setTotal('');
            setQuantidadeDisponivel('');
        } catch (error) {
            console.error('Erro ao cadastrar saída:', error);
            alert('Erro ao cadastrar saída. Tente novamente.');
        }
    };

    return (
        <div className="cd_saida-container">
            <h2 className="cd_saida-title">Cadastro de Saída</h2>
            <form className="cd_saida-form" onSubmit={handleSubmit}>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="idProduto">Produto:</label>
                    <select
                        id="idProduto"
                        className="cd_saida-input"
                        value={idProduto}
                        onChange={(e) => setIdProduto(e.target.value)}
                        required
                    >
                        <option value="">Selecione um produto</option>
                        {produtos.map(produto => (
                            <option key={produto.id} value={produto.id}>
                                {produto.nome} {/* Exiba o nome do produto */}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="quantidadeDisponivel">Quantidade Disponível:</label>
                    <input
                        type="text"
                        id="quantidadeDisponivel"
                        className="cd_saida-input"
                        value={quantidadeDisponivel}
                        readOnly
                    />
                </div>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="quantidade">Quantidade:</label>
                    <input
                        type="number"
                        id="quantidade"
                        className="cd_saida-input"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="valorUnitario">Valor Unitário:</label>
                    <input
                        type="number"
                        id="valorUnitario"
                        className="cd_saida-input"
                        value={valorUnitario}
                        onChange={(e) => setValorUnitario(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="total">Total:</label>
                    <input
                        type="text"
                        id="total"
                        className="cd_saida-input"
                        value={total}
                        readOnly
                    />
                </div>
                
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="dataSaida">Data da Saída:</label>
                    <input
                        type="date"
                        id="dataSaida"
                        className="cd_saida-input"
                        value={dataSaida}
                        onChange={(e) => setDataSaida(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cd_saida-button">
                    Cadastrar
                </button>
                <Link to="/ListaSaidas" className="cd_saida-button-voltar">
                    Voltar
                </Link>
            </form>
        </div>
    );
}
