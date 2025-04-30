import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../alterar-produto/alterar_produto.css";

export default function AlterarProduto() {
    const [nome, setNome] = useState('');
    const [categoria, setCategoriaProduto] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await fetch(`http://localhost:5000/produto/${id}`);
                if (!response.ok) throw new Error("Produto não encontrado");
                const data = await response.json();

                setNome(data.nome);
                setCategoriaProduto(data.categoria);
            } catch (error) {
                console.error('Erro ao buscar o produto:', error);
                alert('Erro ao buscar o produto.');
            }
        };

        fetchProduto();
    }, [id]);

    const handleAlterar = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/produto/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, categoria })
            });

            if (response.ok) {
                alert('Produto alterado com sucesso!');
            } else {
                alert('Erro ao alterar o produto.');
            }
        } catch (error) {
            console.error('Erro ao alterar o produto:', error);
            alert('Erro ao alterar. Tente novamente.');
        }
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
                    <label className="alt_produto-label" htmlFor="categoria">Categoria:</label>
                    <input
                        type="text"
                        id="categoria"
                        className="alt_produto-input"
                        value={categoria}
                        onChange={(e) => setCategoriaProduto(e.target.value)}
                        required
                    />
                </div>
                <Link to="/ListaProdutos" className="alt_produto-button-voltar">
                    Voltar
                </Link>
                <button type="submit" className="alt_produto-button-alterar">
                    Alterar
                </button>
            </form>
        </div>
    );
}
