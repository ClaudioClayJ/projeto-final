// src/components/Listaofertas/index.js
import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Menu from "../componentes/menu";  
import { db, collection, getDocs, deleteDoc, doc } from '../../firebaseConfig'; // Ajuste o caminho conforme necessário
import { Link } from 'react-router-dom'; // Importa Link para navegação
import "../lista_ofertas/lista_oferta.css"

export default function ListaOferta() {
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para buscar ofertas do Firestore
        const fetchOfertas = async () => {
            try {
                // Referência para a coleção 'ofertas'
                const ofertasCollection = collection(db, 'ofertas');
                // Obtém os documentos da coleção
                const ofertasSnapshot = await getDocs(ofertasCollection);
                // Extrai os dados dos documentos e configura o estado
                const ofertasList = ofertasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOfertas(ofertasList);
            } catch (error) {
                console.error('Erro ao buscar ofertas:', error);
                setError('Erro ao buscar ofertas. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchOfertas();
    }, []);

    // Função para deletar uma oferta
    const handleDelete = async (id) => {
        if (window.confirm('Você realmente deseja excluir esta oferta?')) {
            try {
                // Referência para o documento da oferta a ser excluída
                const ofertaDoc = doc(db, 'ofertas', id);
                // Remove o documento
                await deleteDoc(ofertaDoc);
                // Atualiza a lista de ofertas após a exclusão
                setOfertas(ofertas.filter(oferta => oferta.id !== id));
                alert('Oferta excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir oferta:', error);
                alert('Erro ao excluir oferta. Tente novamente.');
            }
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="lista_oferta-container">
            <div className="menu">
                <Menu/>
            </div>
            <h2 className="lista_oferta-title">Lista de Ofertas</h2>
            
            {/* Botão de Cadastro */}
            <div className="lista_oferta-add-button">
                <Link to="/CadastroOfertas">
                    <button className="cadastro-button">Cadastrar Nova Oferta</button>
                </Link>
            </div>
            
            <ul className="lista_oferta-list">
                {ofertas.length > 0 ? (
                    ofertas.map(oferta => (
                        <li key={oferta.id} className="lista_oferta-item">
                            <strong>Oferta:</strong> {oferta.nome} <br />
                            <strong>Desconto:</strong> {oferta.oferta} <br />
                            <div className="lista_oferta-actions">
                                <Link to={`/AlterarOferta/${oferta.id}`}>
                                    <MdModeEditOutline size={30} color='#1601F0' />
                                </Link>
                                <FaTrash 
                                    size={25} 
                                    color='#F01A00' 
                                    onClick={() => handleDelete(oferta.id)} 
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Nenhuma oferta encontrada.</p>
                )}
            </ul>
        </div>
    );
}
