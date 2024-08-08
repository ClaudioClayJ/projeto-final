import React from "react";
import "../../pages/produtos/produto.css";
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
                            {/* Botão da seta esquerda */}
                            <button className="carousel-arrow left">{'<'}</button>

                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="card-produto">
                                    <h3>Produto {index * 5 + i + 1}</h3>
                                    <p>Descrição do produto {index * 5 + i + 1}</p>
                                </div>
                            ))}

                            {/* Botão da seta direita */}
                            <button className="carousel-arrow right">{'>'}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
