// src/components/CadastroUsuario/index.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../cadastro_usuario/cd_usuario.css";

export default function CadastroUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            await fetch('http://localhost:5000/usuario', {

            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha}),
           });

            console.log('Dados do usuário:', { nome, email, senha });
            alert('Cadastro realizado com sucesso!');
            // Limpar campos após o cadastro
            setNome('');
            setEmail('');
            setSenha('');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        }
    };

    return (
        <div className="cd_usuario-container">
            
            <h2 className="cd_usuario-title">Cadastro de Usuário</h2>
            <form className="cd_usuario-form" onSubmit={handleCadastro}>
                <div className="cd_usuario-input-group">
                    <label className="cd_usuario-label" htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="cd_usuario-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_usuario-input-group">
                    <label className="cd_usuario-label" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="cd_usuario-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_usuario-input-group">
                    <label className="cd_usuario-label" htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        className="cd_usuario-input"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <Link to="/ListaUsuarios" className="cd_usuario-button-voltar">
                    Voltar
                </Link>
                <button type="submit" className="cd_usuario-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
