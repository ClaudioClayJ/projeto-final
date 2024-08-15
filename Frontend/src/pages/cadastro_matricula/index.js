import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db, collection, addDoc } from '../../firebaseConfig';


import '../../pages/cadastro_matricula/cadastro_matricula.css';
import Menu from "../componentes/menu";

const planos = [
    { nome: "Plano Básico", valor: "R$50", descricao: "Plano básico com acesso limitado a recursos." },
    { nome: "Plano Intermediário", valor: "R$100", descricao: "Plano intermediário com acesso a mais recursos." },
    { nome: "Plano Premium", valor: "R$150", descricao: "Plano premium com acesso completo a todos os recursos." },
];

function getRandomPlan() {
    return planos[Math.floor(Math.random() * planos.length)];
}

export default function Cadastro_matricula() {
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
        email: "",
        telefone: "",
        cep: "",
        endereco: "",
        bairro: "",
        genero: "",
    });

    const [errors, setErrors] = useState({});
    const [selectedPlan, setSelectedPlan] = useState(getRandomPlan());
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (formData.nome.length < 5) newErrors.nome = "O nome deve ter pelo menos 5 letras.";
        if (formData.telefone.length < 9) newErrors.telefone = "O telefone deve ter pelo menos 9 caracteres.";
        if (formData.cpf.length !== 11) newErrors.cpf = "O CPF deve ter 11 caracteres.";
        if (formData.rg.length < 7) newErrors.rg = "O RG deve ter pelo menos 7 caracteres.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                // Reference to the Firestore collection
                const docRef = collection(db, "matriculas");

                // Add form data to Firestore
                await addDoc(docRef, { 
                    ...formData,
                    plano: selectedPlan.nome,
                    valorPlano: selectedPlan.valor,
                    descricaoPlano: selectedPlan.descricao,
                });

                // Navigate to the success page
                navigate('/success'); // Replace with the actual success route
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    return (
        <div className="Matri_cad-dashboard-container">
            {/* <div className="Matri_cad-menu">
                <Menu />
            </div> */}
            <div className="Matri_cad-content">
                <div className="Matri_cad-form-container">
                    <h1 className="Matri_cad-h1">Cadastro de Matrícula</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">Nome Completo:</label>
                            <input 
                                type="text" 
                                name="nome" 
                                value={formData.nome} 
                                onChange={handleChange} 
                                placeholder="Nome Completo" 
                                className="Matri_cad-input"
                            />
                            {errors.nome && <p className="Matri_cad-error">{errors.nome}</p>}
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">CPF:</label>
                            <input 
                                type="text" 
                                name="cpf" 
                                value={formData.cpf} 
                                onChange={handleChange} 
                                placeholder="CPF" 
                                className="Matri_cad-input"
                            />
                            {errors.cpf && <p className="Matri_cad-error">{errors.cpf}</p>}
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">RG:</label>
                            <input 
                                type="text" 
                                name="rg" 
                                value={formData.rg} 
                                onChange={handleChange} 
                                placeholder="RG" 
                                className="Matri_cad-input"
                            />
                            {errors.rg && <p className="Matri_cad-error">{errors.rg}</p>}
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">Data de Nascimento:</label>
                            <input 
                                type="date" 
                                name="dataNascimento" 
                                value={formData.dataNascimento} 
                                onChange={handleChange} 
                                className="Matri_cad-input"
                            />
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">E-mail:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="E-mail" 
                                className="Matri_cad-input"
                            />
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">Telefone:</label>
                            <input 
                                type="text" 
                                name="telefone" 
                                value={formData.telefone} 
                                onChange={handleChange} 
                                placeholder="Telefone" 
                                className="Matri_cad-input"
                            />
                            {errors.telefone && <p className="Matri_cad-error">{errors.telefone}</p>}
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">CEP:</label>
                            <input 
                                type="text" 
                                name="cep" 
                                value={formData.cep} 
                                onChange={handleChange} 
                                placeholder="CEP" 
                                className="Matri_cad-input"
                            />
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">Endereço:</label>
                            <input 
                                type="text" 
                                name="endereco" 
                                value={formData.endereco} 
                                onChange={handleChange} 
                                placeholder="Endereço" 
                                className="Matri_cad-input"
                            />
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">Bairro:</label>
                            <input 
                                type="text" 
                                name="bairro" 
                                value={formData.bairro} 
                                onChange={handleChange} 
                                placeholder="Bairro" 
                                className="Matri_cad-input"
                            />
                        </div>
                        <div className="Matri_cad-form-group">
                            <label className="Matri_cad-label">Gênero:</label>
                            <select 
                                name="genero" 
                                value={formData.genero} 
                                onChange={handleChange} 
                                className="Matri_cad-select"
                            >
                                <option value="">Selecione</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        <button type="submit" className="Matri_cad-button">Cadastrar</button>
                    </form>
                </div>
                <div className="Matri_cad-plan-container">
                    <h2 className="Matri_cad-h2">Plano Selecionado</h2>
                    <div className="Matri_cad-plan-info">
                        <p><strong>Nome:</strong> {selectedPlan.nome}</p>
                        <p><strong>Valor:</strong> {selectedPlan.valor}</p>
                        <p><strong>Descrição:</strong> {selectedPlan.descricao}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
