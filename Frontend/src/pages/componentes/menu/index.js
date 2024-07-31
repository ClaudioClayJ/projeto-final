import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import { FaFacebookSquare } from 'react-icons/fa';

export default function Menu() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <img src={logo} alt="Logo" />
        </div>
        <div className="col">
          Nome Academia
        </div>
        <div className="col">
          <FaFacebookSquare size={30} color="#4267B2" />
        </div>
      </div>
      <div className="row">
        sdsdsd
      </div>
    </div>
  );
}
