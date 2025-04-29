import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './alterar_usuario.css';

export default function AlterarUsuario() {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/usuario/${id}`);
                const usuario = response.data.usuario;

                setNome(usuario.nome);
                setEmail(usuario.email);
                setSenha(usuario.senha);
            } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
                alert('Erro ao carregar os dados do usuário.');
            }
        };

        fetchUsuario();
    }, [id]);

    const handleAlterar = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/usuario/${id}`, {
                nome,
                email,
                senha
            });
            alert('Usuário alterado com sucesso!');
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
                <Link to="/ListaUsuarios" className="alt_usuario-button-voltar">
                    Voltar
                </Link>
                <button type="submit" className="alt_usuario-button-alterar">
                    Alterar
                </button>
            </form>
        </div>
    );
}
