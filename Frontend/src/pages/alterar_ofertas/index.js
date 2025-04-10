import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../alterar_ofertas/alterar_oferta.css";

export default function AlterarOferta() {
    const [nome, setNome] = useState('');
    const [oferta, setOferta] = useState('');
    const { id } = useParams(); // Pega o ID da URL
    const navigate = useNavigate();

    // Buscar a oferta via API
    useEffect(() => {
        const fetchOferta = async () => {
            try {
                const response = await fetch(`http://localhost:5000/oferta/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar a oferta');
                }

                const data = await response.json();
                setNome(data.nome);
                setOferta(data.oferta);
            } catch (error) {
                console.error('Erro ao buscar a oferta:', error);
                alert('Erro ao buscar a oferta. Verifique se o ID está correto.');
            }
        };

        fetchOferta();
    }, [id]);

    // Atualizar a oferta
    const handleAlterar = async (e) => {
        e.preventDefault();

        if (!nome.trim() || !oferta.trim()) {
            alert('Preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/ofertas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, oferta })
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar a oferta');
            }

            alert('Oferta alterada com sucesso!');
            navigate('/ListaOfertas');
        } catch (error) {
            console.error('Erro ao alterar a oferta:', error);
            alert('Erro ao alterar. Tente novamente.');
        }
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
                    <label className="alt_oferta-label" htmlFor="oferta">Oferta:</label>
                    <input
                        type="text"
                        id="oferta"
                        className="alt_oferta-input"
                        value={oferta}
                        onChange={(e) => setOferta(e.target.value)}
                        required
                    />
                </div>
                <Link to="/ListaOfertas" className="alt_oferta-button-voltar">
                    Voltar
                </Link>
                <button type="submit" className="alt_oferta-button-alterar">
                    Alterar
                </button>
            </form>
        </div>
    );
}
