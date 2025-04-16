import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Menu from "../componentes/menu";  
import { Link } from 'react-router-dom'; // Importa Link para navegação
import axios from 'axios'; // Importando axios para requisições HTTP
import "../lista_ofertas/lista_oferta.css"

export default function ListaOferta() {
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para buscar ofertas do backend (SQLite)
        const fetchOfertas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ofertas'); // Requisição ao backend
                setOfertas(response.data);
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
                await axios.delete(`http://localhost:5000/ofertas/${id}`); // Requisição para excluir oferta
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
