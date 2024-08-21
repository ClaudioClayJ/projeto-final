import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc } from '../../firebaseConfig';
import "../alterar_entrada/alterar_entrada.css"
export default function AlterarEntrada() {
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_entrada, setData_Entrada] = useState('');

    const handleAlterar = (e) => {
        e.preventDefault();
        console.log('Dados da entrada:', { id_produto, quantidade, valor_unitario, data_entrada });
    };

    return (
        <div className="alt_entrada-container">
            <h2 className="alt_entrada-title">Alterar Entrada</h2>
            <form className="alt_entrada-form" onSubmit={handleAlterar}>
                <div className="alt_entrada-input-group">
                    <label className="alt_entrada-label" htmlFor="text">Nome:</label>
                    <input
                        type="text"
                        id="Id_produto"
                        className="alt_entrada-input"
                        value={id_produto}
                        onChange={(e) => setId_Produto(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_entrada-input-group">
                    <label className="alt_entrada-label" htmlFor="quantidade">quantidade:</label>
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
                    <label className="alt_entrada-label" htmlFor="text">Valor Unitario:</label>
                    <input
                        type="text"
                        id="valor unitario"
                        className="alt_entrada-input"
                        value={valor_unitario}
                        onChange={(e) => setValor_Unitario(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_entrada-input-group">
                    <label className="alt_entrada-label" htmlFor="date">Data da Entrada:</label>
                    <input
                        type="date"
                        id="data_entrada"
                        className="alt_entrada-input"
                        value={data_entrada}
                        onChange={(e) => setData_Entrada(e.target.value)}
                        required
                    />
                </div>
                
                    <Link to="/" className="alt_entrada-button-alterar">
                        alterar
                    </Link>
                <Link to="/" className="alt_entrada-button-voltar">
                    Voltar
                </Link>
                <Link to="/" className="alt_entrada-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
