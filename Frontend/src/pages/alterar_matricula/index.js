import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../pages/alterar_matricula/alterar_matricula.css';
import Menu from '../componentes/menu/index'

const planos = [
    { nome: "Plano Básico", valor: "R$50", descricao: "Plano básico com acesso limitado a recursos." },
    { nome: "Plano Intermediário", valor: "R$100", descricao: "Plano intermediário com acesso a mais recursos." },
    { nome: "Plano Premium", valor: "R$150", descricao: "Plano premium com acesso completo a todos os recursos." },
];

function getRandomPlan() {
    return planos[Math.floor(Math.random() * planos.length)];
}

export default function Alterar_matricula() {
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
                const response = await fetch('http://localhost:3000/api/matriculas/alterar', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        plano: selectedPlan.nome,
                        valorPlano: selectedPlan.valor,
                        descricaoPlano: selectedPlan.descricao,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Erro ao alterar a matrícula");
                }

                navigate('/success');
            } catch (error) {
                console.error("Erro na alteração da matrícula:", error);
            }
        }
    };

    return (
        <div className="Matri_cad-dashboard-container">
            <Menu />
            <div className="Matri_cad-content">
                <div className="Matri_cad-form-container">
                    <h1 className="Matri_cad-h1">Alteração de Matrícula</h1>
                    <form onSubmit={handleSubmit}>
                        {[
                            { label: "Nome Completo", name: "nome", type: "text" },
                            { label: "CPF", name: "cpf", type: "text" },
                            { label: "RG", name: "rg", type: "text" },
                            { label: "Data de Nascimento", name: "dataNascimento", type: "date" },
                            { label: "E-mail", name: "email", type: "email" },
                            { label: "Telefone", name: "telefone", type: "text" },
                            { label: "CEP", name: "cep", type: "text" },
                            { label: "Endereço", name: "endereco", type: "text" },
                            { label: "Bairro", name: "bairro", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div className="Matri_cad-form-group" key={name}>
                                <label className="Matri_cad-label">{label}:</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={label}
                                    className="Matri_cad-input"
                                />
                                {errors[name] && <p className="Matri_cad-error">{errors[name]}</p>}
                            </div>
                        ))}

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

                        <button type="submit" className="alt-matricula-button-salvar">
                            Salvar
                        </button>
                        <button type="button" onClick={() => navigate('/')} className="alt-matricula-button-voltar">
                            Voltar
                        </button>
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
