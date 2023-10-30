import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { SecureRoute } from './app/Components/SecureRoute/SecureRoute.jsx';

/* Paginas */
import Site from './site/site.jsx';
import Login from './app/Auth/Login/login';
import NovaConta from './app/Auth/NovaConta/novaconta.jsx';
import ResetSenha from './app/Auth/ResetSenha/resetsenha';
import Home from './app/Admin/CRUD/Home/home.jsx';
import NovoCliente from './app/Admin/CRUD/NovoCliente/novocliente.jsx';
import EditarCliente from './app/Admin/CRUD/EditarCliente/editarcliente.jsx';
import MeuPerfil from './app/Client/perfil-usuario/MeuPerfil.jsx';
import { Dashboard } from './app/Admin/Dashboard/Dashboard.jsx';


function App(){
  
    return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Site} />    
      <Route exact path='/app/login' component={Login} />    
      <Route exact path='/app/novaconta' component={NovaConta} />    
      <Route exact path='/app/resetsenha' component={ResetSenha} />    
      
      <SecureRoute exact path='/app/admin/home' component={Dashboard} allowedUserType="admin"/>    
      <SecureRoute exact path='/app/admin/novocliente' component={NovoCliente}  allowedUserType="admin"/>
      <SecureRoute exact path='/app/admin/editarcliente/:id' component={EditarCliente} allowedUserType="admin"/>
      <SecureRoute exact path='/app/admin/gerenciamento-clientes' component={Home} allowedUserType="admin"/>
        
      <SecureRoute exact path='/app/meu-perfil' component={MeuPerfil} allowedUserType="cliente"/>
      </Switch>
    </BrowserRouter>;
  }
 
export default App;