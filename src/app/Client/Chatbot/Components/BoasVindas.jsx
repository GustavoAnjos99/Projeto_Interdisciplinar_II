import React from "react";
import Ketlyn from "../assets/Perfil.png";
import { usePedidoContext } from "../Context/ChatContext";

export default function BoasVindas() {
  const { optionChoice } = usePedidoContext();
  return (
    <>
      <div className="menu_opcoes">
        <div className="intro">
          <img src={Ketlyn} alt="Ketlyn" className="img__perfil" />
          <p className="text">
            Olá, seja bem-vindo(a)! Selecione o que deseja adicionar ao seu
            pedido!
          </p>
        </div>
        <div className="btn__opcoes">
          <button
            className="botao"
            onClick={() => {
              optionChoice("Bolos");
            }}
          >
            Bolos
          </button>
          <button
            className="botao"
            onClick={() => {
              optionChoice("Doces");
            }}
          >
            Doces
          </button>
          <button
            className="botao"
            onClick={() => {
              optionChoice("Salgados");
            }}
          >
            Salgados
          </button>
          <button
            className="botao"
            onClick={() => {
              optionChoice("Mini Lanches");
            }}
          >
            Mini Lanches
          </button>
          <button
            className="botao"
            onClick={() => {
              optionChoice("Serviços de Buffet");
            }}
          >
            Serviços de Buffet
          </button>
        </div>
      </div>
    </>
  );
}
