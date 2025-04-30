import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../cadastro_produto/cd_produto.css";

export default function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/produto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, descricao, preco: parseFloat(preco) }),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar produto');
            }

            const data = await response.json();
            console.log('Produto cadastrado:', data);
            alert('Cadastro realizado com sucesso!');

            // Limpar os campos
            setNome('');
            setDescricao('');
            setPreco('');
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        }
    };

    return (
        <div className="cd_produto-container">
            <h2 className="cd_produto-title">Cadastro de Produto</h2>
            <form className="cd_produto-form" onSubmit={handleCadastro}>
                <div className="cd_produto-input-group">
                    <label className="cd_produto-label" htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="cd_produto-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_produto-input-group">
                    <label className="cd_produto-label" htmlFor="descricao">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        className="cd_produto-input"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_produto-input-group">
                    <label className="cd_produto-label" htmlFor="preco">Preço (R$):</label>
                    <input
                        type="number"
                        step="0.01"
                        id="preco"
                        className="cd_produto-input"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </div>
                <Link to="/ListaProdutos" className="cd_produto-button-voltar">
                    Voltar
                </Link>
                <button type="submit" className="cd_produto-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
