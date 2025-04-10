import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "../alterar_saida/alterar_saida.css";

export default function AlterarSaida() {
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_saida, setData_Saida] = useState('');
    const [total, setTotal] = useState('');
    const { id } = useParams(); // id da saída

    useEffect(() => {
        const fetchSaida = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/saida/${id}`);
                const saida = response.data;
                setId_Produto(saida.id_produto);
                setQuantidade(saida.quantidade);
                setValor_Unitario(saida.valor_unitario);
                setData_Saida(saida.data_saida);
                setTotal(saida.total);
            } catch (error) {
                console.error("Erro ao buscar a saída:", error);
                alert("Erro ao carregar os dados da saída.");
            }
        };

        if (id) fetchSaida();
    }, [id]);

    useEffect(() => {
        const totalCalculado = quantidade * valor_unitario;
        setTotal(totalCalculado.toFixed(2));
    }, [quantidade, valor_unitario]);

    const handleAlterar = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/saida/${id}`, {
                id_produto,
                quantidade,
                valor_unitario,
                data_saida,
                total
            });

            alert("Saída alterada com sucesso!");
        } catch (error) {
            console.error("Erro ao alterar a saída:", error);
            alert("Erro ao alterar a saída. Tente novamente.");
        }
    };

    return (
        <div className="alt_saida-container">
            <h2 className="alt_saida-title">Alterar Saída</h2>
            <form className="alt_saida-form" onSubmit={handleAlterar}>
                <div className="alt_saida-input-group">
                    <label htmlFor="id_produto">ID do Produto:</label>
                    <input
                        type="text"
                        id="id_produto"
                        value={id_produto}
                        onChange={(e) => setId_Produto(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_saida-input-group">
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input
                        type="number"
                        id="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_saida-input-group">
                    <label htmlFor="valor_unitario">Valor Unitário:</label>
                    <input
                        type="number"
                        id="valor_unitario"
                        value={valor_unitario}
                        onChange={(e) => setValor_Unitario(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_saida-input-group">
                    <label htmlFor="total">Total:</label>
                    <input type="text" id="total" value={total} readOnly />
                </div>
                <div className="alt_saida-input-group">
                    <label htmlFor="data_saida">Data da Saída:</label>
                    <input
                        type="date"
                        id="data_saida"
                        value={data_saida}
                        onChange={(e) => setData_Saida(e.target.value)}
                        required
                    />
                </div>
                <Link to="/" className="alt_saida-button-voltar">Voltar</Link>
                <button type="submit" className="alt_saida-button-alterar">Alterar</button>
            </form>
        </div>
    );
}
