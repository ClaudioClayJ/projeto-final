import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";


export default function Menu() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <img src={logo} alt="Academia" />
        </div>

        <div className="col center">
          <h1>Nome Academia </h1>
        </div>
        <div className="col">
          <FaFacebookSquare size={30} color="white" />
          <FaInstagram size={30} color="white" />
          <FaSquareWhatsapp size={30} color="white" />
        </div>
      </div>
      <div className="row">
        <div className='col_menu'>
            <h3>
              Produtos
            </h3>
        </div>
        <div className='col_menu'>
            <h3>
              Ofertas
            </h3>
        </div>
        <div className='col_menu'>
            <h3>
              Localização
            </h3>
        </div>
        <div className='col_menu'>
            <h3>
              Matricule-se
            </h3>
        </div>
        <div className='col_menu'>
            <h3>
              Treinos
            </h3>
        </div>
        <div className='col_menu'>
            <h3>
             Entrar <FaRegUser/>
            </h3>
        </div>
      </div>
    </div>
  );
}
