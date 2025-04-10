import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../pages/alterar_matricula/alterar_matricula.css';
import { Link } from 'react-router-dom';
import Menu from "../componentes/menu";

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
                const response = await fetch("http://localhost:3001/matricula", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...formData,
                        plano: selectedPlan.nome,
                        valorPlano: selectedPlan.valor,
                        descricaoPlano: selectedPlan.descricao,
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Matrícula cadastrada com sucesso!");
                    navigate("/"); // ou "/success" se você tiver essa rota
                } else {
                    alert("Erro ao cadastrar: " + result.erro);
                }
            } catch (e) {
                console.error("Erro ao enviar:", e);
                alert("Erro ao enviar dados.");
            }
        }
    };

    return (
        <div className="Matri_cad-dashboard-container">
            <div className="Matri_cad-content">
                <div className="Matri_cad-form-container">
                    <h1 className="Matri_cad-h1">Alteração de Matrícula</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Campos do formulário (mesmos do seu original) */}
                        {/* ... */}
                        <button type="submit" className="alt-matricula-button-salvar">
                            Salvar
                        </button>
                        <Link to="/" className="alt-matricula-button-voltar">
                            Voltar
                        </Link>
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
