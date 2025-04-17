import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../../pages/alterar_matricula/alterar_matricula.css';
import { Link } from 'react-router-dom';
import Menu from "../componentes/menu";

export default function CadastroMatricula() {
  const location = useLocation();
  const { plano, valor, descricao } = location.state || {}; // Recebe os dados do estado passado
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.nome.length < 5) newErrors.nome = "O nome deve ter pelo menos 5 letras.";
    const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    if (!telefoneRegex.test(formData.telefone)) {
      newErrors.telefone = "Telefone inválido. Ex: (11) 91234-5678 ou 11912345678";
    }

    if (formData.cpf.length !== 11) newErrors.cpf = "O CPF deve ter 11 caracteres.";
    if (formData.rg.length < 7) newErrors.rg = "O RG deve ter pelo menos 7 caracteres.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/matricula", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            plano,
            valorPlano: valor,
            descricaoPlano: descricao,
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
          <h1 className="Matri_cad-h1">Cadastro de Matrícula</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleChange}
            />
            {errors.nome && <p className="error">{errors.nome}</p>}

            <input
              type="text"
              name="cpf"
              placeholder="CPF (somente números)"
              value={formData.cpf}
              onChange={handleChange}
            />
            {errors.cpf && <p className="error">{errors.cpf}</p>}

            <input
              type="text"
              name="rg"
              placeholder="RG"
              value={formData.rg}
              onChange={handleChange}
            />
            {errors.rg && <p className="error">{errors.rg}</p>}

            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="telefone"
              placeholder="Telefone (com DDD)"
              value={formData.telefone}
              onChange={handleChange}
            />
            {errors.telefone && <p className="error">{errors.telefone}</p>}

            <input
              type="text"
              name="cep"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleChange}
            />

            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={formData.endereco}
              onChange={handleChange}
            />

            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={handleChange}
            />

            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            >
              <option value="">Selecione o gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>

            <button type="submit" className="Matri_cad-button">
              Salvar
            </button>
            <Link to="/" className="Matri_cad-button">
              Voltar
            </Link>
          </form>
        </div>
        <div className="Matri_cad-plan-container">
          <h2 className="Matri_cad-h2">Plano Selecionado</h2>
          <div className="Matri_cad-plan-info">
            <p><strong>Nome:</strong> {plano}</p>
            <p><strong>Valor:</strong> R${valor}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
