import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../cadastro_saida/cd_saida.css";

export default function CadastroSaida() {
    const [idProduto, setIdProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [dataSaida, setDataSaida] = useState('');
    const [total, setTotal] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState('');

    useEffect(() => {
        const calculoTotal = () => {
            const quantidadeNum = parseFloat(quantidade);
            const valorUnitarioNum = parseFloat(valorUnitario);
            if (!isNaN(quantidadeNum) && !isNaN(valorUnitarioNum)) {
                const totalCalculado = quantidadeNum * valorUnitarioNum;
                setTotal(totalCalculado.toFixed(2));
            } else {
                setTotal('');
            }
        };
        calculoTotal();
    }, [quantidade, valorUnitario]);

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
                    
                    const quantidadeEntradas = entradasSnapshot.docs.reduce((acc, doc) => {
                        const data = doc.data();
                        return acc + (data.quantidade || 0);
                    }, 0);

                    const saidasCollection = collection(db, 'saidas');
                    const saidasQuery = query(saidasCollection, where('id_produto', '==', idProduto));
                    const saidasSnapshot = await getDocs(saidasQuery);

                    const quantidadeSaidas = saidasSnapshot.docs.reduce((acc, doc) => {
                        const data = doc.data();
                        return acc + (data.quantidade || 0);
                    }, 0);

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

        if (parseFloat(quantidade) > quantidadeDisponivel) {
            alert('Quantidade de saída não pode ser maior que a quantidade disponível.');
            return;
        }

        try {
            const saidaRef = collection(db, 'saidas');
            await addDoc(saidaRef, {
                id_produto: idProduto,
                quantidade: parseFloat(quantidade),
                valor_unitario: parseFloat(valorUnitario),
                total: parseFloat(total),
                data_saida: dataSaida,
            });

            const produtoRef = doc(db, 'produtos', idProduto);
            const produtoDoc = await getDoc(produtoRef);
            if (produtoDoc.exists()) {
                const produtoData = produtoDoc.data();
                const novaQuantidade = (produtoData.quantidade || 0) - parseFloat(quantidade);
                await updateDoc(produtoRef, { quantidade: novaQuantidade });
            }

            alert('Saída registrada com sucesso!');
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
                                {produto.nome}
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
                <Link to="/ListaSaidas" className="cd_saida-button-voltar">
                    Voltar
                </Link>
                <button type="submit" className="cd_saida-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
