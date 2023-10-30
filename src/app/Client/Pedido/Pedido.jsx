import firebase from "../../Config/firebase";
import React from "react";

export const Pedido = (props) => {
    
  return (
    <div className="pedido">
      <h2>{props.titulo}</h2>
      <div className="conteudo-pedido" id={`conteudo-pedido-${props.id}`}>
        {props.itens.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <button className="ver-mais" onClick={(mostrarConteudo) => mostrarConteudo(props.id)}>
        Ver Mais
      </button>
    </div>
  );
}
