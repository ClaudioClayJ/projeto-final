import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../global.css'; 
import Menu from "../componentes/menu";


export default function Produtos() {
return(
    <div className="dashboard-container">
        <div className="menu">
                <Menu/>
        </div>
        <div className="content">
            <h2>Localizacao</h2>
           </div>
        </div>
        
)
}
