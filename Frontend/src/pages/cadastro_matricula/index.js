import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../pages/cadastro_matricula/cadastro_matricula.css'
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (formData.nome.length < 5) newErrors.nome = "O nome deve ter pelo menos 5 letras.";
        if (formData.telefone.length < 9) newErrors.telefone = "O telefone deve ter pelo menos 9 caracteres.";
        if (formData.cpf.length !== 11) newErrors.cpf = "O CPF deve ter 11 caracteres.";
        if (formData.rg.length < 7) newErrors.rg = "O RG deve ter pelo menos 7 caracteres.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Simulate submission
            console.log("Form submitted:", formData);
            navigate('/success'); // Replace with the actual success route
        }
    };

    return (
        <div className="dashboard-container">
            {/* <div className="menu">
                <Menu />
            </div> */}
            <div className="content">
                <div className="form-container">
                    <h1>Cadastro de Matrícula</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nome Completo:</label>
                            <input 
                                type="text" 
                                name="nome" 
                                value={formData.nome} 
                                onChange={handleChange} 
                                placeholder="Nome Completo" 
                            />
                            {errors.nome && <p className="error">{errors.nome}</p>}
                        </div>
                        <div className="form-group">
                            <label>CPF:</label>
                            <input 
                                type="text" 
                                name="cpf" 
                                value={formData.cpf} 
                                onChange={handleChange} 
                                placeholder="CPF" 
                            />
                            {errors.cpf && <p className="error">{errors.cpf}</p>}
                        </div>
                        <div className="form-group">
                            <label>RG:</label>
                            <input 
                                type="text" 
                                name="rg" 
                                value={formData.rg} 
                                onChange={handleChange} 
                                placeholder="RG" 
                            />
                            {errors.rg && <p className="error">{errors.rg}</p>}
                        </div>
                        <div className="form-group">
                            <label>Data de Nascimento:</label>
                            <input 
                                type="date" 
                                name="dataNascimento" 
                                value={formData.dataNascimento} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>E-mail:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="E-mail" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefone:</label>
                            <input 
                                type="text" 
                                name="telefone" 
                                value={formData.telefone} 
                                onChange={handleChange} 
                                placeholder="Telefone" 
                            />
                            {errors.telefone && <p className="error">{errors.telefone}</p>}
                        </div>
                        <div className="form-group">
                            <label>CEP:</label>
                            <input 
                                type="text" 
                                name="cep" 
                                value={formData.endereco} 
                                onChange={handleChange} 
                                placeholder="CEP" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Endereço:</label>
                            <input 
                                type="text" 
                                name="endereco" 
                                value={formData.endereco} 
                                onChange={handleChange} 
                                placeholder="Endereço" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Bairro:</label>
                            <input 
                                type="text" 
                                name="bairro" 
                                value={formData.bairro} 
                                onChange={handleChange} 
                                placeholder="Bairro" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Gênero:</label>
                            <select 
                                name="genero" 
                                value={formData.genero} 
                                onChange={handleChange} 
                            >
                                <option value="">Selecione</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
                <div className="plan-container">
                    <h2>Plano Selecionado</h2>
                    <div className="plan-info">
                        <p><strong>Nome:</strong> {selectedPlan.nome}</p>
                        <p><strong>Valor:</strong> {selectedPlan.valor}</p>
                        <p><strong>Descrição:</strong> {selectedPlan.descricao}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
