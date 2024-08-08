import React from "react";
import '../../pages/localizacao/localizacão.css';
import Menu from "../componentes/menu";

export default function Produtos() {
  return (
    <div className="dashboard-container">
      <div className="menu">
        <Menu />
      </div>
      <div className="content">
        <div className="map-section">
          <h2 className="map-title">Localização</h2>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4707.308360595435!2d-48.2088325502684!3d-7.199849358334367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92d90dc97ea0d2fd%3A0xc05c5fa8f780aa9!2sGemeos%20Academia!5e0!3m2!1spt-BR!2sbr!4v1723117537859!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="450" 
            className="map-iframe" 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className="info-section">
          <h2 className="info-title">Endereço</h2>
          <p className="info-detail"><strong>Nome da Academia:</strong> Gemeos Academia</p>
          <p className="info-detail"><strong>Endereço:</strong> Rua Exemplo, 123 - Bairro, Cidade - Estado</p>
          <p className="info-detail"><strong>CEP:</strong> 12345-678</p>
        </div>
      </div>
    </div>
  );
}
