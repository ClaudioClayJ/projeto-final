import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../cadastro_produto/cd_produto.css";
import { db, collection, addDoc } from '../../firebaseConfig'; // Certifique-se de que o caminho está correto

export default function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [categoria, setCategoriaProduto] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            // Adiciona os dados do produto ao Firestore
            await addDoc(collection(db, 'produtos'), {
                nome,
                categoria
            });

            console.log('Dados do produto:', { nome, categoria });
            alert('Cadastro realizado com sucesso!');
            
            // Limpar campos após o cadastro
            setNome('');
            setCategoriaProduto('');
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
                    <label className="cd_produto-label" htmlFor="categoria">Categoria:</label>
                    <input
                        type="text"
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
                <Link to="/" className="cd_produto-button-voltar">
                    Voltar
                </Link>
                <Link to="/AlterarProduto" className="cd_produto-button-alterar">
                    Alterar
                </Link>
                <Link to="/" className="cd_produto-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
