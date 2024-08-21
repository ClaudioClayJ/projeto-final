import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { db, doc, getDoc, updateDoc } from '../../firebaseConfig';
import "../alterar-produto/alterar_produto.css";

export default function AlterarProduto() {
    const [nome, setNome] = useState('');
    const [categoria, setCategoriaProduto] = useState('');
    const { id } = useParams(); // Obtém o ID do produto da URL

    // Função para buscar o produto pelo ID
    useEffect(() => {
        const fetchProduto = async () => {
            if (id) {
                try {
                    const produtoDoc = doc(db, 'produtos', id);
                    const produtoSnapshot = await getDoc(produtoDoc);

                    if (produtoSnapshot.exists()) {
                        const produtoData = produtoSnapshot.data();
                        setNome(produtoData.nome);
                        setCategoriaProduto(produtoData.categoria);
                    } else {
                        console.error('Produto não encontrado!');
                    }
                } catch (error) {
                    console.error('Erro ao buscar o produto:', error);
                }
            }
        };

        fetchProduto();
    }, [id]); // Recarrega quando o ID do produto muda

    const handleAlterar = async (e) => {
        e.preventDefault();

        try {
            // Atualiza o produto no Firestore
            const produtoDoc = doc(db, 'produtos', id);
            await updateDoc(produtoDoc, {
                nome,
                categoria
            });

            console.log('Dados do produto:', { nome, categoria });
            alert('Produto alterado com sucesso!');
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
                <button type="submit" className="alt_produto-button-alterar">
                    Alterar
                </button>
                <Link to="/" className="alt_produto-button-voltar">
                    Voltar
                </Link>
                <Link to={`/ExcluirProduto/${id}`} className="alt_produto-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
