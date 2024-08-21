import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc } from '../../firebaseConfig';
import "../alterar_ofertas/alterar_oferta.css"
export default function AlterarOferta() {
    const [nome, setNome] = useState('');
    const [oferta, setCategoriaOferta] = useState('');

    const handleAlterar = (e) => {
        e.preventDefault();
        console.log('Dados do Oferta:', { nome, oferta });
    };

    return (
        <div className="alt_oferta-container">
            <h2 className="alt_oferta-title">Alterar Oferta</h2>
            <form className="alt_oferta-form" onSubmit={handleAlterar}>
                <div className="alt_oferta-input-group">
                    <label className="alt_oferta-label" htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="alt_oferta-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="alt_oferta-input-group">
                    <label className="alt_oferta-label" htmlFor="oferta">oferta:</label>
                    <input
                        type="oferta"
                        id="oferta"
                        className="alt_oferta-input"
                        value={oferta}
                        onChange={(e) => setCategoriaOferta(e.target.value)}
                        required
                    />
                </div>
                <Link to="/" className="alt_oferta-button-alterar">
                    Alterar
                </Link>
                <Link to="/" className="alt_oferta-button-voltar">
                    Voltar
                </Link>
                <Link to="/" className="alt_oferta-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
