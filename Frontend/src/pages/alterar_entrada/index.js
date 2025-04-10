import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // usamos axios para chamadas HTTP
import "../alterar_entrada/alterar_entrada.css";

export default function AlterarEntrada() {
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_entrada, setData_Entrada] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchEntrada = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/entradas/${id}`);
                const entrada = response.data;

                setId_Produto(entrada.id_produto);
                setQuantidade(entrada.quantidade);
                setValor_Unitario(entrada.valor_unitario);
                setData_Entrada(entrada.data_entrada);
            } catch (error) {
                console.error('Erro ao buscar a entrada:', error);
                alert('Erro ao buscar entrada. Verifique o console.');
            }
        };

        fetchEntrada();
    }, [id]);

    const handleAlterar = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/entradas/${id}`, {
                id_produto,
                quantidade,
                valor_unitario,
                data_entrada
            });

            alert('Entrada alterada com sucesso!');
        } catch (error) {
            console.error('Erro ao alterar a entrada:', error);
            alert('Erro ao alterar. Tente novamente.');
        }
    };

    return (
        <div className="alt_entrada-container">
            <h2 className="alt_entrada-title">Alterar Entrada</h2>
            <form className="alt_entrada-form" onSubmit={handleAlterar}>
                <div className="alt_entrada-input-group">
                    <label htmlFor="id_produto" className="alt_entrada-label">ID do Produto:</label>
                    <input
                        type="text"
                        id="id_produto"
                        className="alt_entrada-input"
                        value={id_produto}
                        onChange={(e) => setId_Produto(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_entrada-input-group">
                    <label htmlFor="quantidade" className="alt_entrada-label">Quantidade:</label>
                    <input
                        type="text"
                        id="quantidade"
                        className="alt_entrada-input"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_entrada-input-group">
                    <label htmlFor="valor_unitario" className="alt_entrada-label">Valor Unitário:</label>
                    <input
                        type="text"
                        id="valor_unitario"
                        className="alt_entrada-input"
                        value={valor_unitario}
                        onChange={(e) => setValor_Unitario(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_entrada-input-group">
                    <label htmlFor="data_entrada" className="alt_entrada-label">Data da Entrada:</label>
                    <input
                        type="date"
                        id="data_entrada"
                        className="alt_entrada-input"
                        value={data_entrada}
                        onChange={(e) => setData_Entrada(e.target.value)}
                        required
                    />
                </div>

                <Link to="/ListaEntradas" className="alt_entrada-button-voltar">
                    Voltar
                </Link>
                <button type="submit" className="alt_entrada-button-alterar">
                    Alterar
                </button>
            </form>
        </div>
    );
}
