import React, { useState } from 'react';
import "../cadastro_ofertas/cd_oferta.css"
export default function CadastroOferta() {
    const [nome, setNome] = useState('');
    const [oferta, setCategoriaOferta] = useState('');

    const handleCadastro = (e) => {
        e.preventDefault();
        console.log('Dados do Oferta:', { nome, oferta });
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
                    <label className="cd_oferta-label" htmlFor="oferta">oferta:</label>
                    <input
                        type="oferta"
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
            </form>
        </div>
    );
}
