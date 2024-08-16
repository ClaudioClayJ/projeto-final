import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../cadastro_saida/cd_saida.css"

export default function CadastroSaida() {
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_saida, setData_Saida] = useState('');
    const [total, setTotal] = useState('');

    // Função para calcular o total
    useEffect(() => {
        const calculoTotal = () => {
            const totalCalculado = quantidade * valor_unitario;
            setTotal(totalCalculado.toFixed(2)); // Convertendo para duas casas decimais
        };

        calculoTotal();
    }, [quantidade, valor_unitario]); // Recalcula quando quantidade ou valor unitário mudam

    const handleCadastro = (e) => {
        e.preventDefault();
        console.log('Dados da saida:', { id_produto, quantidade, valor_unitario, data_saida, total });
    };

    return (
        <div className="cd_saida-container">
            <h2 className="cd_saida-title">Cadastro de Saida</h2>
            <form className="cd_saida-form" onSubmit={handleCadastro}>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="Id_produto">Nome:</label>
                    <input
                        type="text"
                        id="Id_produto"
                        className="cd_saida-input"
                        value={id_produto}
                        onChange={(e) => setId_Produto(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="quantidade">Quantidade:</label>
                    <input
                        type="text"
                        id="quantidade"
                        className="cd_saida-input"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="valor_unitario">Valor Unitário:</label>
                    <input
                        type="text"
                        id="valor_unitario"
                        className="cd_saida-input"
                        value={valor_unitario}
                        onChange={(e) => setValor_Unitario(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="total">Total:</label>
                    <input
                        type="text"
                        id="total"
                        className="cd_saida-input"
                        value={total}
                        readOnly
                    />
                </div>
                <div className="cd_saida-input-group">
                    <label className="cd_saida-label" htmlFor="data_saida">Data da Saida:</label>
                    <input
                        type="date"
                        id="data_saida"
                        className="cd_saida-input"
                        value={data_saida}
                        onChange={(e) => setData_Saida(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cd_saida-button">
                    Cadastrar
                </button>
                <Link to="/" className="cd_saida-button-voltar">
                    Voltar
                </Link>
                <Link to="/" className="cd_saida-button-alterar">
                    Alterar
                </Link>
                <Link to="/" className="cd_saida-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
