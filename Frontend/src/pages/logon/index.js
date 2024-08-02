import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import '../../global.css'; // Verifique se o caminho está correto
import '../logon/style.css'
export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação, se necessário
    navigate('/dashboard'); // Redirecionar para a página do dashboard
  };

  const handleRegister = () => {
    navigate('/logon'); // Redirecionar para a página de cadastro
  };

  const handleExit = () => {
    navigate('/'); // Redirecionar para a página inicial ou outra página
  };

  return (
    <div className="login-container">
      <h1>Academia</h1>
      <section className="form">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input 
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input 
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit">Entrar</button>
            <button type="button" onClick={handleExit}>Sair</button>
            <button type="button" onClick={handleRegister}>Cadastrar</button>
          </div>
        </form>
      </section>
    </div>
  );
}
