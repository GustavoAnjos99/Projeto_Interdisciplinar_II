import React, { useState } from 'react';
import { Menu } from '../../site/Components/menu';
import './styles.css';
import Ketlyn from './assets/Perfil.png';

export default function Chats() {
  const [conteudoPedido, setConteudoPedido] = useState([]);
  const [voltarOpcao, setVoltarOpcao] = useState(false);
  const [mostrarProximasOpcoes, setMostrarProximasOpcoes] = useState(false);
  const [opcoesDesejadas, setOpcoesDesejadas] = useState([]);
  const [ultimaOpcaoDesejada, setUltimaOpcaoDesejada] = useState('');

  function handleOpcao(opcaoDesejada) {
  setUltimaOpcaoDesejada(opcaoDesejada);
  setOpcoesDesejadas([...opcoesDesejadas, opcaoDesejada]);
  setMostrarProximasOpcoes(true);
}

  return (
    <>
      <Menu />
      <h1 className="title">Novo pedido</h1>
      <div className="container">
        <div className="menu_opcoes">
          <div className="intro">
            <img src={Ketlyn} alt="Ketlyn" className="img__perfil" />
            <p className="text">
              Olá, seja bem-vindo(a)! selecione o que deseja adicionar ao seu pedido!
            </p>
          </div>

          <div className="btn__opcoes">
            <button className="opcao" onClick={()=> handleOpcao('Bolos')}>
              Bolos
            </button>
            <button className="opcao" onClick={()=> handleOpcao('Doces')}>
              Doces
            </button>
            <button className="opcao" onClick={()=> handleOpcao('Salgados')}>
              Salgados
            </button>
            <button className="opcao" onClick={()=> handleOpcao('Mini Lanches')}>
              Mini Lanches
            </button>
            <button className="opcao" onClick={()=> handleOpcao('Serviços de Buffet')}>
              Serviços de Buffet
            </button>
          </div>
          <button className="voltar">
            <i className="icone fa-solid fa-rotate-left fa-2xl" style={{ color: '#ffffff' }}></i>
          </button>
        </div>
      </div>
      <div className="container">
        {ultimaOpcaoDesejada === 'Bolos' && mostrarProximasOpcoes === true && (
          <div className="menu_opcoes">
            <div className="intro">
              <img src={Ketlyn} alt="Ketlyn" className="img__perfil" />
              <p className="text">
                Você escolheu Doces. São doces de 10g que compõem de forma deliciosa o bolo! Temos as opções abaixo, clique e escolha:
              </p>
            </div>

            <div name="opcoes" className="btn__opcoes">
              <div className="btn__opcao">
                <input className="checkbox" type="checkbox" id="bolos" />
                <label className="opcao labels" for="bolos">
                  Bolos
                </label>
              </div>
            </div>
            <button className="voltar">
              <i className="icone fa-solid fa-rotate-left fa-2xl" style={{ color: '#ffffff' }}></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
