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
                const response = await axios.get('http://localhost:5000/produtos');
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                alert('Erro ao buscar produtos. Tente novamente.');
            }
        };

        fetchProdutos();
    }, []);

    useEffect(() => {
        const fetchQuantidadeDisponivel = async () => {
            if (!idProduto) {
                setQuantidadeDisponivel('');
                return;
            }

            try {
                const entradasRes = await axios.get(`http://localhost:5000/entradas/${idProduto}`);
                const saidasRes = await axios.get(`http://localhost:5000/saidas/${idProduto}`);

                const quantidadeEntradas = entradasRes.data.reduce((acc, item) => acc + item.quantidade, 0);
                const quantidadeSaidas = saidasRes.data.reduce((acc, item) => acc + item.quantidade, 0);

                const disponivel = quantidadeEntradas - quantidadeSaidas;
                setQuantidadeDisponivel(disponivel >= 0 ? disponivel : 0);
            } catch (error) {
                console.error('Erro ao buscar quantidade disponível:', error);
                setQuantidadeDisponivel(0);
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
            const saidaData = {
                id_produto: idProduto,
                quantidade: parseFloat(quantidade),
                valor_unitario: parseFloat(valorUnitario),
                total: parseFloat(total),
                data_saida: dataSaida
            };

            await axios.post('http://localhost:5000/saidas', saidaData);

            // Atualiza quantidade do produto
            const produto = produtos.find(p => p.id === parseInt(idProduto));
            if (produto) {
                const novaQuantidade = produto.quantidade - parseFloat(quantidade);
                await axios.put(`http://localhost:5000/produtos/${idProduto}`, {
                    quantidade: novaQuantidade
                });
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
