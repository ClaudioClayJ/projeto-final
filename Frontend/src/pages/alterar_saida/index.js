import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db, doc, getDoc, updateDoc } from '../../firebaseConfig';
import "../alterar_saida/alterar_saida.css";

export default function AlterarSaida() {
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_saida, setData_Saida] = useState('');
    const [total, setTotal] = useState('');
    const { id } = useParams(); // Obtém o ID da saída da URL

    // Função para buscar a saída pelo ID
    useEffect(() => {
        const fetchSaida = async () => {
            if (id) {
                try {
                    const saidaDoc = doc(db, 'saidas', id);
                    const saidaSnapshot = await getDoc(saidaDoc);

                    if (saidaSnapshot.exists()) {
                        const saidaData = saidaSnapshot.data();
                        setId_Produto(saidaData.id_produto);
                        setQuantidade(saidaData.quantidade);
                        setValor_Unitario(saidaData.valor_unitario);
                        setData_Saida(saidaData.data_saida);
                        setTotal(saidaData.total);
                    } else {
                        console.error('Saída não encontrada!');
                    }
                } catch (error) {
                    console.error('Erro ao buscar a saída:', error);
                }
            }
        };

        fetchSaida();
    }, [id]); // Recarrega quando o ID da saída muda

    // Função para calcular o total
    useEffect(() => {
        const calculoTotal = () => {
            const totalCalculado = quantidade * valor_unitario;
            setTotal(totalCalculado.toFixed(2)); // Convertendo para duas casas decimais
        };

        calculoTotal();
    }, [quantidade, valor_unitario]); // Recalcula quando quantidade ou valor unitário mudam

    const handleAlterar = async (e) => {
        e.preventDefault();

        if (!id) {
            alert('Saída não encontrada!');
            return;
        }

        try {
            // Atualiza a saída no Firestore
            const saidaDoc = doc(db, 'saidas', id);
            await updateDoc(saidaDoc, {
                id_produto,
                quantidade,
                valor_unitario,
                data_saida,
                total
            });

            console.log('Dados da saída:', { id_produto, quantidade, valor_unitario, data_saida, total });
            alert('Saída alterada com sucesso!');
        } catch (error) {
            console.error('Erro ao alterar a saída:', error);
            alert('Erro ao alterar. Tente novamente.');
        }
    };

    return (
        <div className="alt_saida-container">
            <h2 className="alt_saida-title">Alterar Saída</h2>
            <form className="alt_saida-form" onSubmit={handleAlterar}>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label" htmlFor="id_produto">ID do Produto:</label>
                    <input
                        type="text"
                        id="id_produto"
                        className="alt_saida-input"
                        value={id_produto}
                        onChange={(e) => setId_Produto(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label" htmlFor="quantidade">Quantidade:</label>
                    <input
                        type="number"
                        id="quantidade"
                        className="alt_saida-input"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label" htmlFor="valor_unitario">Valor Unitário:</label>
                    <input
                        type="number"
                        id="valor_unitario"
                        className="alt_saida-input"
                        value={valor_unitario}
                        onChange={(e) => setValor_Unitario(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label" htmlFor="total">Total:</label>
                    <input
                        type="text"
                        id="total"
                        className="alt_saida-input"
                        value={total}
                        readOnly
                    />
                </div>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label" htmlFor="data_saida">Data da Saída:</label>
                    <input
                        type="date"
                        id="data_saida"
                        className="alt_saida-input"
                        value={data_saida}
                        onChange={(e) => setData_Saida(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="alt_saida-button-alterar">
                    Alterar
                </button>
                <Link to="/" className="alt_saida-button-voltar">
                    Voltar
                </Link>
                <Link to={`/ExcluirSaida/${id}`} className="alt_saida-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
