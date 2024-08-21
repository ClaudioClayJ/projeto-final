import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db, doc, getDoc, updateDoc } from '../../firebaseConfig';
import "../alterar_entrada/alterar_entrada.css";

export default function AlterarEntrada() {
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_entrada, setData_Entrada] = useState('');
    const { id } = useParams(); // Obtém o ID da entrada da URL

    // Função para buscar a entrada pelo ID
    useEffect(() => {
        const fetchEntrada = async () => {
            if (id) {
                try {
                    const entradaDoc = doc(db, 'entradas', id);
                    const entradaSnapshot = await getDoc(entradaDoc);

                    if (entradaSnapshot.exists()) {
                        const entradaData = entradaSnapshot.data();
                        setId_Produto(entradaData.id_produto);
                        setQuantidade(entradaData.quantidade);
                        setValor_Unitario(entradaData.valor_unitario);
                        setData_Entrada(entradaData.data_entrada);
                    } else {
                        console.error('Entrada não encontrada!');
                    }
                } catch (error) {
                    console.error('Erro ao buscar a entrada:', error);
                }
            }
        };

        fetchEntrada();
    }, [id]); // Recarrega quando o ID da entrada muda

    const handleAlterar = async (e) => {
        e.preventDefault();

        if (!id) {
            alert('Entrada não encontrada!');
            return;
        }

        try {
            // Atualiza a entrada no Firestore
            const entradaDoc = doc(db, 'entradas', id);
            await updateDoc(entradaDoc, {
                id_produto,
                quantidade,
                valor_unitario,
                data_entrada
            });

            console.log('Dados da entrada:', { id_produto, quantidade, valor_unitario, data_entrada });
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
                    <label className="alt_entrada-label" htmlFor="id_produto">ID do Produto:</label>
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
                    <label className="alt_entrada-label" htmlFor="quantidade">Quantidade:</label>
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
                    <label className="alt_entrada-label" htmlFor="valor_unitario">Valor Unitário:</label>
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
                    <label className="alt_entrada-label" htmlFor="data_entrada">Data da Entrada:</label>
                    <input
                        type="date"
                        id="data_entrada"
                        className="alt_entrada-input"
                        value={data_entrada}
                        onChange={(e) => setData_Entrada(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="alt_entrada-button-alterar">
                    Alterar
                </button>
                <Link to="/" className="alt_entrada-button-voltar">
                    Voltar
                </Link>
                <Link to={`/ExcluirEntrada/${id}`} className="alt_entrada-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
