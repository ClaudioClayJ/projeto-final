import React from "react";
import '../../global.css'; 
import Menu from "../componentes/menu";

export default function Produtos() {
    return (
        <div className="dashboard-container">
            <div className="menu">
                <Menu />
            </div>
            <div className="content">
                <div className="menu-produtos">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="carousel-produto">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="card-produto">
                                    <h3>Produto {index * 5 + i + 1}</h3>
                                    <p>Descrição do produto {index * 5 + i + 1}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
