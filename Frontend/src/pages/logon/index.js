import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../global.css';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          senha: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuário logado com sucesso:", data.usuario);
        navigate('/'); // ou outra página principal
      } else {
        setError(data.error || "E-mail ou senha incorretos.");
      }

    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao conectar com o servidor.");
    }
  };

  const handleRegister = () => {
    navigate('/CadastroUsuario');
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="logon">
      <h1 className="logon-title">Academia</h1>
      <section className="logon-form">
        <form onSubmit={handleLogin}>
          <div className="logon-input-group">
            <label htmlFor="email" className="logon-label">E-mail</label>
            <input 
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="logon-input"
              required
            />
          </div>
          <div className="logon-input-group">
            <label htmlFor="password" className="logon-label">Senha</label>
            <input 
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="logon-input"
              required
            />
          </div>
          {error && <p className="logon-error">{error}</p>}
          <div className="logon-button-group">
            <button type="submit" className="logon-button logon-button-submit">Entrar</button> 
            <button type="button" onClick={handleRegister} className="logon-button logon-button-register">Cadastrar</button>
            <button type="button" onClick={handleExit} className="logon-button logon-button-exit">Sair</button>
          </div>
        </form>
      </section>
    </div>
  );
}
