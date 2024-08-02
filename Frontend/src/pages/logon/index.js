import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../global.css'; // Importe o CSS correspondente

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); // Redirecionar para a página do dashboard
  };

  const handleRegister = () => {
    navigate('/register'); // Redirecionar para a página de cadastro
  };

  const handleExit = () => {
    navigate('/'); // Redirecionar para a página inicial ou outra página
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
            />
          </div>
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