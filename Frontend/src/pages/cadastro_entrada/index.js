import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc } from '../../firebaseConfig'; // Certifique-se de que o caminho está correto
import "../cadastro_entrada/cd_entrada.css";

export default function CadastroEntrada() {
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_entrada, setData_Entrada] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            // Adiciona os dados da entrada ao Firestore
            await addDoc(collection(db, 'entradas'), {
                id_produto,
                quantidade,
                valor_unitario,
                data_entrada
            });

            console.log('Dados da entrada:', { id_produto, quantidade, valor_unitario, data_entrada });
            alert('Cadastro realizado com sucesso!');
            
            // Limpar campos após o cadastro
            setId_Produto('');
            setQuantidade('');
            setValor_Unitario('');
            setData_Entrada('');
        } catch (error) {
            console.error('Erro ao cadastrar entrada:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        }
    };

    return (
        <div className="cd_entrada-container">
            <h2 className="cd_entrada-title">Cadastro de Entrada</h2>
            <form className="cd_entrada-form" onSubmit={handleCadastro}>
                <div className="cd_entrada-input-group">
                    <label className="cd_entrada-label" htmlFor="id_produto">ID do Produto:</label>
                    <input
                        type="text"
                        id="id_produto"
                        className="cd_entrada-input"
                        value={id_produto}
                        onChange={(e) => setId_Produto(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_entrada-input-group">
                    <label className="cd_entrada-label" htmlFor="quantidade">Quantidade:</label>
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
                    <label className="cd_entrada-label" htmlFor="valor_unitario">Valor Unitário:</label>
                    <input
                        type="text"
                        id="valor_unitario"
                        className="cd_entrada-input"
                        value={valor_unitario}
                        onChange={(e) => setValor_Unitario(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_entrada-input-group">
                    <label className="cd_entrada-label" htmlFor="data_entrada">Data da Entrada:</label>
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
                <Link to="/AlterarEntrada/:id" className="cd_entrada-button-alterar">
                    Alterar
                </Link>
                <Link to="/" className="cd_entrada-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
