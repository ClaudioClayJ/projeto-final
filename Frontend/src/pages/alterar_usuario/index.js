import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, doc, getDoc, updateDoc } from '../../firebaseConfig';
import "../alterar_usuario/alterar_usuario.css";

export default function AlterarUsuario() {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'usuarios', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setNome(data.nome);
                    setEmail(data.email);
                    setSenha(data.senha);
                } else {
                    console.log('Documento não encontrado!');
                }
            } catch (error) {
                console.error('Erro ao buscar o documento:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleAlterar = async (e) => {
        e.preventDefault();

        try {
            const docRef = doc(db, 'usuarios', id);
            await updateDoc(docRef, { nome, email, senha });
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
                <button type="submit" className="alt_usuario-button-alterar">
                    Alterar
                </button>
                <Link to="/ListaUsuarios" className="alt_usuario-button-voltar">
                    Voltar
                </Link>
                <Link to={`/ExcluirUsuario/${id}`} className="alt_usuario-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
