import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import { FaFacebookSquare, FaInstagram, FaWhatsapp, FaRegUser } from 'react-icons/fa';
import { useState } from 'react'; // Importa useState para gerenciar o estado do input

export default function Menu() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo da pesquisa

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Atualiza o estado com o valor do input
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    console.log('Search term:', searchTerm); // Aqui você pode adicionar a lógica de pesquisa
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <img src={logo} alt="Academia" />
        </div>

        <div className="col center">
          <h1>Nome Academia</h1>
        </div>

        <div className="col icons">
          <FaFacebookSquare size={30} color="white" />
          <FaInstagram size={30} color="white" />
          <FaWhatsapp size={30} color="white" />
        </div>
      </div>

<div className='row'>
  {/* Barra de busca posicionada logo abaixo dos ícones */}
  <div className="row search-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            placeholder="Buscar..." 
            className="search-input"
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>
      </div>
</div>

      <div className="row menu-items">
        <div className='col_menu'>
            <h3>Produtos</h3>
        </div>
        <div className='col_menu'>
            <h3>Ofertas</h3>
        </div>
        <div className='col_menu'>
            <h3>Localização</h3>
        </div>
        <div className='col_menu'>
            <h3>Matricule-se</h3>
        </div>
        <div className='col_menu'>
            <h3>Treinos</h3>
        </div>
        <div className='col_menu'>
            <h3>Entrar <FaRegUser /></h3>
        </div>
      </div>
    </div>
  );
}
