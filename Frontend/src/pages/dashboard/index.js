import React from "react";
import '../../global.css';
import "../dashboard/dashboard.css";
import Menu from "../componentes/menu";
import banner from "../../assets/img/banner2.jpg";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Menu />
                <img src={banner} alt="Descrição do Banner" />
            <div className="content">
                <h2>O que é Lorem Ipsum?</h2>
                <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos...</p>
                
                <h2>Porque nós o usamos?</h2>
                <p>É um fato conhecido de todos que um leitor se distrairá com o conteúdo de texto legível...</p>
                
                <h2>De onde ele vem?</h2>
                <p>Ao contrário do que se acredita, Lorem Ipsum não é simplesmente um texto randômico...</p>
                
                <h2>Onde posso conseguí-lo?</h2>
                <p>Existem muitas variações disponíveis de passagens de Lorem Ipsum, mas a maioria sofreu algum tipo de alteração...</p>
                
                <h2>Doações:</h2>
                <p>Se você usa este site regularmente e gostaria de ajudar a mantê-lo ativo na internet...</p>
                
                <h2>Traduções:</h2>
                <p>Você pode ajudar a traduzir este site para um idioma estrangeiro? Por favor nos envie um e-mail...</p>
            </div>
        </div>
        
    );
}
