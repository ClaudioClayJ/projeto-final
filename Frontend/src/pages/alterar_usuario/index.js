import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc } from '../../firebase'; // Ajuste o caminho conforme necessário
import "../alterar_usuario/alterar_usuario.css";

export default function AlterarUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleAlterar = async (e) => {
        e.preventDefault();

        try {
            // Adiciona os dados do usuário ao Firestore
            await addDoc(collection(db, 'usuarios'), {
                nome,
                email,
                senha
            });

            console.log('Dados do usuário:', { nome, email, senha });
            alert('Alterado com sucesso!');
        } catch (error) {
            console.error('Erro ao alterar o usuário:', error);
            alert('Erro ao alterar. Tente novamente.');
        }
    };

    return (
        <div className="alt_usuario-container">
            <h2 className="alt_usuario-title">Alterar Usuário</h2>
            <form className="alt_usuario-form" onSubmit={handleAlterar}>
                <div className="alt_usuario-input-group">
                    <label className="alt_usuario-label" htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="alt_usuario-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_usuario-input-group">
                    <label className="alt_usuario-label" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="alt_usuario-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_usuario-input-group">
                    <label className="alt_usuario-label" htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        className="alt_usuario-input"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <Link to="/" className="alt_usuario-button-alterar">
                    Alterar
                </Link>
                <Link to="/" className="alt_usuario-button-voltar">
                    Voltar
                </Link>
            </form>
        </div>
    );
}
