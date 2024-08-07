import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import '../../global.css'; 
import '../../pages/matricula/matricula.css'
import Menu from '../componentes/menu'; // Certifique-se de que o caminho para o Menu está correto

export default function Matricula() {
  const navigate = useNavigate();

  const handleEnrollment = () => {
    // Lógica de matrícula ou redirecionamento
    navigate('/confirmation'); // Substitua '/confirmation' pelo caminho desejado após a matrícula
  };

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="matricula-content">
       
        <h2>Escolha o Plano Ideal para Você! </h2>
        <div className="matricula-plans">
          <div className="matricula-plan">
            <h3>Plano Básico</h3>
            <p>Benefícios: Acesso a todas as máquinas, 1 aula gratuita por mês.</p>
            <p>Preço: R$99,00</p>
            <Link to="/CadastroMatricula"><button className="matricula-button" onClick={handleEnrollment}>Matricule-se</button></Link>
          </div>
          <div className="matricula-plan">
            <h3>Plano Intermediário</h3>
            <p>Benefícios: Acesso completo, 3 aulas gratuitas por mês, acesso a piscinas.</p>
            <p>Preço: R$199,00</p>
            <Link to="/CadastroMatricula"><button className="matricula-button" onClick={handleEnrollment}>Matricule-se</button></Link>
          </div>
          <div className="matricula-plan">
            <h3>Plano Premium</h3>
            <p>Benefícios: Acesso total, aulas ilimitadas, acesso a spa e massagens.</p>
            <p>Preço: R$299,00</p>
            <Link to="/CadastroMatricula"><button className="matricula-button" onClick={handleEnrollment}>Matricule-se</button></Link>
          </div>
        </div>
        <div className="matricula-description">
          <h2>Sobre Nossa Academia</h2>
          <p className='matricula-description p'>Nosso espaço é dedicado ao seu bem-estar e saúde. Com equipamentos modernos, instrutores qualificados e uma variedade de aulas e serviços, garantimos que você tenha a melhor experiência de treino possível. Venha fazer parte da nossa comunidade!</p>
        </div>
      </div>
    </div>
  );
}
