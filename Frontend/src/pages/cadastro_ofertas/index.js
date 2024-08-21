import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc } from '../../firebaseConfig'; // Certifique-se de que o caminho está correto
import "../cadastro_ofertas/cd_oferta.css";

export default function CadastroOferta() {
    const [nome, setNome] = useState('');
    const [oferta, setCategoriaOferta] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            // Adiciona os dados da oferta ao Firestore
            await addDoc(collection(db, 'ofertas'), {
                nome,
                oferta
            });

            console.log('Dados da oferta:', { nome, oferta });
            alert('Cadastro realizado com sucesso!');
            
            // Limpar campos após o cadastro
            setNome('');
            setCategoriaOferta('');
        } catch (error) {
            console.error('Erro ao cadastrar oferta:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        }
    };

    return (
        <div className="cd_oferta-container">
            <h2 className="cd_oferta-title">Cadastro de Oferta</h2>
            <form className="cd_oferta-form" onSubmit={handleCadastro}>
                <div className="cd_oferta-input-group">
                    <label className="cd_oferta-label" htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="cd_oferta-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="cd_oferta-input-group">
                    <label className="cd_oferta-label" htmlFor="oferta">Oferta:</label>
                    <input
                        type="text"  
                        id="oferta"
                        className="cd_oferta-input"
                        value={oferta}
                        onChange={(e) => setCategoriaOferta(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cd_oferta-button">
                    Cadastrar
                </button>
                <Link to="/" className="cd_oferta-button-voltar">
                    Voltar
                </Link>
                <Link to="/" className="cd_oferta-button-alterar">
                    Alterar
                </Link>
                <Link to="/" className="cd_oferta-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
