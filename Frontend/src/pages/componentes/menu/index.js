import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import { FaFacebookSquare, FaInstagram, FaWhatsapp, FaRegUser } from 'react-icons/fa';

export default function Menu() {
  // Estado para armazenar o termo da pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para controlar a visibilidade da barra de navegação ao rolar a página
  const [scrolling, setScrolling] = useState(false);

  // Função para atualizar o estado com o valor do input de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Função para lidar com a submissão do formulário de pesquisa
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };

  useEffect(() => {
    // Função para verificar a rolagem da página e atualizar o estado 'scrolling'
    const handleScroll = () => {
      if (window.scrollY > 50) { // Ajuste o valor conforme necessário
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Adiciona o listener de rolagem ao componente
    window.addEventListener('scroll', handleScroll);
    
    // Remove o listener de rolagem quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Dependência vazia, executa apenas na montagem e desmontagem

  return (
    <div className={`container fixed-header ${scrolling ? 'hidden-header' : ''}`}>
      <div className="row">
        <div className="col">
          <img src={logo} alt="Academia" />
        </div>

        <div className="col center">
          <h1>Nome Academia</h1>
        </div>

        <div className='col'>
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

        <div className="col icons">
          <FaFacebookSquare size={30} color="white" />
          <FaInstagram size={30} color="white" />
          <FaWhatsapp size={30} color="white" />
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