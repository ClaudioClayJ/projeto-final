import React, { useState } from 'react';
import "../cadastro_produto/cd_produto.css"
export default function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [categoria, setCategoriaProduto] = useState('');

    const handleCadastro = (e) => {
        e.preventDefault();
        console.log('Dados do produto:', { nome, categoria });
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
                    <label className="cd_produto-label" htmlFor="categoria">categoria:</label>
                    <input
                        type="categoria"
                        id="categoria"
                        className="cd_produto-input"
                        value={categoria}
                        onChange={(e) => setCategoriaProduto(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cd_produto-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
