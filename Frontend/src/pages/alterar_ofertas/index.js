import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db, doc, getDoc, updateDoc } from '../../firebaseConfig';
import "../alterar_ofertas/alterar_oferta.css";

export default function AlterarOferta() {
    const [nome, setNome] = useState('');
    const [oferta, setCategoriaOferta] = useState('');
    const { id } = useParams(); // Obtém o ID da oferta da URL

    // Função para buscar a oferta pelo ID
    useEffect(() => {
        const fetchOferta = async () => {
            if (id) {
                try {
                    const ofertaDoc = doc(db, 'ofertas', id);
                    const ofertaSnapshot = await getDoc(ofertaDoc);

                    if (ofertaSnapshot.exists()) {
                        const ofertaData = ofertaSnapshot.data();
                        setNome(ofertaData.nome);
                        setCategoriaOferta(ofertaData.oferta);
                    } else {
                        console.error('Oferta não encontrada!');
                    }
                } catch (error) {
                    console.error('Erro ao buscar a oferta:', error);
                }
            }
        };

        fetchOferta();
    }, [id]); // Recarrega quando o ID da oferta muda

    const handleAlterar = async (e) => {
        e.preventDefault();

        if (!id) {
            alert('Oferta não encontrada!');
            return;
        }

        try {
            // Atualiza a oferta no Firestore
            const ofertaDoc = doc(db, 'ofertas', id);
            await updateDoc(ofertaDoc, {
                nome,
                oferta
            });

            console.log('Dados da oferta:', { nome, oferta });
            alert('Oferta alterada com sucesso!');
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
                        onChange={(e) => setCategoriaOferta(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="alt_oferta-button-alterar">
                    Alterar
                </button>
                <Link to="/ListaOfertas" className="alt_oferta-button-voltar">
                    Voltar
                </Link>
                <Link to={`/ExcluirOferta/${id}`} className="alt_oferta-button-excluir">
                    Excluir
                </Link>
            </form>
        </div>
    );
}
