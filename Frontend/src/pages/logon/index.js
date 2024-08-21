import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../../global.css'; // Importe o CSS correspondente

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Adicione um estado para erros
  const navigate = useNavigate();
  const auth = getAuth(); // Inicialize o Auth

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Limpar erros antes de tentar autenticar

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirecionar para a página inicial após login bem-sucedido
    } catch (error) {
      setError("E-mail ou senha incorretos."); // Mostrar mensagem de erro
    }
  };

  const handleRegister = () => {
    navigate('/CadastroUsuario'); // Redirecionar para a página de cadastro
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
          {error && <p className="logon-error">{error}</p>} {/* Exibir mensagens de erro */}
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
