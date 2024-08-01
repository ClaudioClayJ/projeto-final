import React from "react";
import { Link } from "react-router-dom";
import '../../global.css'
import Head from "../componentes/head";
import Menu from "../componentes/menu";


export default function Dashboard(){
    return(
        <div className="dashboard-container">
            <div className="menu">
                    <Menu/>
            </div>
        </div>
    )
}
