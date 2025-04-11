import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../cadastro_ofertas/cd_oferta.css";

export default function CadastroOferta() {
    const [nome, setNome] = useState('');
    const [oferta, setCategoriaOferta] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/ofertas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, oferta }),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar.');
            }

            const data = await response.json();
            console.log('Dados da oferta cadastrada:', data);
            alert('Cadastro realizado com sucesso!');

            // Limpar os campos
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
                <Link to="/ListaOfertas" className="cd_oferta-button-voltar">
                    Voltar
                </Link>
                <button type="submit" className="cd_oferta-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
