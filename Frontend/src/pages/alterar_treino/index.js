import React, { useState } from 'react';
import axios from 'axios';
import './alterar_treino.css';

export default function AlterarTreino() {
    const [id, setId] = useState('');
    const [id_usuario, setIdUsuario] = useState('');
    const [nome_treino, setNomeTreino] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data_treino, setDataTreino] = useState('');

    const handleAlterar = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/alterar_treino/${id}`, {
                id_usuario,
                nome_treino,
                descricao,
                data_treino
            });
            alert(response.data.mensagem);
        } catch (error) {
            alert("Erro ao alterar treino: " + error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="alt_saida-container">
            <h1 className="alt_saida-title">Alterar Treino</h1>
            <div className="alt_saida-form">
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label">ID do Treino</label>
                    <input className="alt_saida-input" value={id} onChange={e => setId(e.target.value)} />
                </div>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label">ID do Usuário</label>
                    <input className="alt_saida-input" value={id_usuario} onChange={e => setIdUsuario(e.target.value)} />
                </div>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label">Nome do Treino</label>
                    <input className="alt_saida-input" value={nome_treino} onChange={e => setNomeTreino(e.target.value)} />
                </div>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label">Descrição</label>
                    <input className="alt_saida-input" value={descricao} onChange={e => setDescricao(e.target.value)} />
                </div>
                <div className="alt_saida-input-group">
                    <label className="alt_saida-label">Data do Treino</label>
                    <input type="date" className="alt_saida-input" value={data_treino} onChange={e => setDataTreino(e.target.value)} />
                </div>
                <button className="alt_saida-button-alterar" onClick={handleAlterar}>Alterar</button>
                <a className="alt_saida-button-voltar" href="/">Voltar</a>
            </div>
        </div>
    );
}
