import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../alterar-produto/alterar_produto.css"
export default function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [categoria, setCategoriaProduto] = useState('');

    const handleAlterar = (e) => {
        e.preventDefault();
        console.log('Dados do produto:', { nome, categoria });
    };

    return (
        <div className="alt_produto-container">
            <h2 className="alt_produto-title">Alterar Produto</h2>
            <form className="alt_produto-form" onSubmit={handleAlterar}>
                <div className="alt_produto-input-group">
                    <label className="alt_produto-label" htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="alt_produto-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_produto-input-group">
                    <label className="alt_produto-label" htmlFor="categoria">categoria:</label>
                    <input
                        type="categoria"
                        id="categoria"
                        className="alt_produto-input"
                        value={categoria}
                        onChange={(e) => setCategoriaProduto(e.target.value)}
                        required
                    />
                </div>
                <Link to="/" className="alt_produto-button-alterar">
                    Alterar
                </Link>
                <Link to="/" className="alt_produto-button-voltar">
                    Voltar
                </Link>
                <Link to="/" className="alt_produto-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
