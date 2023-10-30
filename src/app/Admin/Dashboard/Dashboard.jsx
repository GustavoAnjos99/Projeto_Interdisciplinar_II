import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/navbar';
import GraficoPedidos from '../../Components/Dashboard/Chart/GraficoPedidos';
import Tabela from '../../Components/Dashboard/Tabela/tabela';
import { CustomIframe } from '../../Components/Iframes/Iframes';
import './styles.css'

export const Dashboard = () => {

  return (
    <div>
      <Navbar />
      <h1 className="title">Ateliê do Chocolate - Página Inicial</h1>
      <div className="container">
        <div style={{ marginTop: '5%'}}>
  <div className="row text-center container">
    <div className="col-12 mb-5" style={{ display: 'inherit', width: '80%', height: '100%', marginLeft: '20%' }}>
      <div className="col-2 mb-2" style={{ marginRight: '2%' }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">20</h5>
            <p className="card-text">Pedidos em aberto</p>
          </div>
        </div>
      </div>

      <div className="col-sm-2 mb-2" style={{ marginRight: '2%' }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">27</h5>
            <p className="card-text">Pedidos Finalizados</p>
          </div>
        </div>
      </div>

      <div className="col-sm-2 mb-2" style={{ marginRight: '2%' }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">2</h5>
            <p className="card-text">Pedidos em Andamento</p>
          </div>
        </div>
      </div>

      <div className="col-sm-2 mb-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">0</h5>
            <p className="card-text">Pedidos Cancelados</p>
          </div>
        </div>
      </div>
    </div>

    <div className="row row-cols-1 row-cols-md-2 g-2">
      <div className="col">
        <div className="card h-100">
         <CustomIframe title="Gráfico de Pedidos" className="iframe">
            <GraficoPedidos/>
          </CustomIframe>
          <div className="card-body">
            <h5 className="card-title">Últimos negócios feitos</h5>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100">
            <div>
                <CustomIframe>
                    <Tabela/>              
                </CustomIframe>                
            </div>
          <div className="card-body">
            <h5 className="card-title">Tabela de vendas</h5>
          </div>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card text-center" style={{ marginTop: '5%' }}>
        <div className="card-header">
          Chats
        </div>
        <div className="card-body">
          <h5 className="card-title">Últimos pedidos</h5>

        </div>
      </div>
    </div>
  </div>
</div>
      </div>
          

    </div>
  )
}
