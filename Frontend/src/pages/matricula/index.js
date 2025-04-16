import React from 'react';
import { Link } from 'react-router-dom'; // Importa o Link para navegação
import '../../pages/matricula/matricula.css'
import Menu from '../componentes/menu';

export default function Matricula() {
  // Você pode simplificar a navegação com o 'Link' diretamente
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
            <Link to="/CadastroMatricula" state={{ plano: "Plano Básico", valor: 99, descricao: "Acesso a todas as máquinas, 1 aula gratuita por mês." }}>
              <button className="matricula-button">Matricule-se</button>
            </Link>
          </div>

          <div className="matricula-plan">
            <h3>Plano Intermediário</h3>
            <p>Benefícios: Acesso completo, 3 aulas gratuitas por mês, acesso a piscinas.</p>
            <p>Preço: R$199,00</p>
            <Link to="/CadastroMatricula" state={{ plano: "Plano Intermediário", valor: 199, descricao: "Acesso completo, 3 aulas gratuitas por mês, acesso a piscinas." }}>
              <button className="matricula-button">Matricule-se</button>
            </Link>
          </div>

          <div className="matricula-plan">
            <h3>Plano Premium</h3>
            <p>Benefícios: Acesso total, aulas ilimitadas, acesso a spa e massagens.</p>
            <p>Preço: R$299,00</p>
            <Link to="/CadastroMatricula" state={{ plano: "Plano Premium", valor: 299, descricao: "Acesso total, aulas ilimitadas, acesso a spa e massagens." }}>
              <button className="matricula-button">Matricule-se</button>
            </Link>
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
