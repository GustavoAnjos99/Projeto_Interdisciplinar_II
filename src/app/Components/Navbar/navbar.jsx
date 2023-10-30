import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';
import {AuthContext} from '../../Auth/Context/auth';
import logo from "./atelieIMG.png";
function Navbar(){

    const {setLogado} = useContext(AuthContext);

    function Logout(){
      setLogado(false);
      localStorage.removeItem("logado");
    }

  return (
   <header className="menu">
      <nav className="navbar navbar-expand-xl rosa">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logotipo" className="logotipo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/app/admin/home" className="nav-link">Página Inicial</Link>
              </li>
              <li className="nav-item">
                <Link to="/app/admin/gerenciamento-clientes" className="nav-link">Gerenciamento de Clientes</Link>
              </li>
              <li className="nav-item">
                <Link to="/app/admin/gerenciamento-pedidos" className="nav-link">Pedidos</Link>
              </li>
              <li className="nav-item">
                <Link to="/app/login" onClick={Logout} className="nav-link">Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="rosa-escuro"></div>
    </header>
  );
  }

export default Navbar;