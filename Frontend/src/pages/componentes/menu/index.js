  import { useEffect, useState, useRef } from 'react';
  import { Link } from 'react-router-dom';
  import logo from '../../../assets/img/LOGO2.png';
  import { FaFacebookSquare, FaInstagram, FaWhatsapp, FaRegUser } from 'react-icons/fa';
  import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
  import { IoMenu, IoHome } from "react-icons/io5";
  import { FaBoxArchive } from "react-icons/fa6";
  import { MdSell } from "react-icons/md";
  import { motion, AnimatePresence } from 'framer-motion';

  export default function Menu() {
    const [searchTerm, setSearchTerm] = useState('');
    const [scrolling, setScrolling] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      console.log('Search term:', searchTerm);
    };

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuVisible(false);
        }
      };

      const handleScrollCloseMenu = () => {
        setMenuVisible(false);
      };

      if (menuVisible) {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScrollCloseMenu);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScrollCloseMenu);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScrollCloseMenu);
      };
    }, [menuVisible]);

    return (
      <div className={`container fixed-header ${scrolling ? 'hidden-header' : ''}`}>
        <div className="row">
          <div className="col">
            <div className="menu-adm" ref={menuRef}>
              <IoMenu size={30} onClick={toggleMenu} />
              <h6 onClick={toggleMenu}>ADMIN</h6>
              <AnimatePresence>
                {menuVisible && (
                  <motion.div
                    className="menu-adm-items"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Link to="/ListaUsuarios">
                      <h4><FaRegUser />Usuarios</h4>
                    </Link>
                    <Link to="/ListaProdutos">
                      <h4><MdSell />Produtos</h4>
                    </Link>
                    <Link to="/ListaEntradas">
                      <h4><AiOutlineArrowUp />Entrada</h4>
                    </Link>
                    <Link to="/Estoque">
                      <h4><FaBoxArchive />Estoque</h4>
                    </Link>
                    <Link to="/ListaSaidas">
                      <h4><AiOutlineArrowDown />Saida</h4>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="col">
              <div className="logo-container">
                <img className="logo" src={logo} alt="Academia" />
                <h7 className="escrita_logo">GYM SYSTEM</h7>
              </div>
            </div>

          </div>
          <div className="col center">
            <Link to="/" className="link-academia">
              <h1>Nome Academia</h1>
              <IoHome size={25} className="icon-home" />
            </Link>
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
            <h3>
              <Link to="/Produtos">Produtos</Link>
            </h3>
          </div>
          <div className='col_menu'>
            <h3>
              <Link to="/Ofertas">Ofertas</Link>
              </h3>
          </div>
          <div className='col_menu'>
            <h3>
              <Link to="/Localizacao">Localização</Link>
              </h3>
          </div>
          <div className='col_menu'>
            <h3><Link to="/Matricula">Matricule-se</Link></h3>
          </div>
          <div className='col_menu'>
            <h3>
              <Link to="/Treinos">Treinos</Link>
              </h3>
          </div>
          <div className='col_menu'>
            <h3>
              <Link to="/Login">Entrar <FaRegUser /></Link>
              </h3>
          </div>
        </div>
      </div>
    );
  }