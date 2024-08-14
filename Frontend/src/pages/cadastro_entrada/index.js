import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../cadastro_entrada/cd_entrada.css"
export default function CadastroEntrada() {
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_entrada, setData_Entrada] = useState('');

    const handleCadastro = (e) => {
        e.preventDefault();
        console.log('Dados da entrada:', { id_produto, quantidade, valor_unitario, data_entrada });
    };

    return (
        <div className="cd_entrada-container">
            <h2 className="cd_entrada-title">Cadastro de Entrada</h2>
            <form className="cd_entrada-form" onSubmit={handleCadastro}>
                <div className="cd_entrada-input-group">
                    <label className="cd_entrada-label" htmlFor="text">Nome:</label>
                    <input
                        type="text"
                        id="Id_produto"
                        className="cd_entrada-input"
                        value={id_produto}
                        onChange={(e) => setId_Produto(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_entrada-input-group">
                    <label className="cd_entrada-label" htmlFor="quantidade">quantidade:</label>
                    <input
                        type="text"
                        id="quantidade"
                        className="cd_entrada-input"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_entrada-input-group">
                    <label className="cd_entrada-label" htmlFor="text">Valor Unitario:</label>
                    <input
                        type="text"
                        id="valor unitario"
                        className="cd_entrada-input"
                        value={valor_unitario}
                        onChange={(e) => setValor_Unitario(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_entrada-input-group">
                    <label className="cd_entrada-label" htmlFor="date">Data da Entrada:</label>
                    <input
                        type="date"
                        id="data_entrada"
                        className="cd_entrada-input"
                        value={data_entrada}
                        onChange={(e) => setData_Entrada(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cd_entrada-button">
                    Cadastrar
                </button>
                <Link to="/" className="cd_entrada-button-voltar">
                    Voltar
                </Link>
            </form>
        </div>
    );
}
