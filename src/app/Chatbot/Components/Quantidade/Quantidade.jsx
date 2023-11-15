import React, { useState } from "react";
import { ActionProvider } from "../../Settings/ActionProvider";
import "./styles.css";

export const Quantidade = (props) => {
  const { setQuantidade } = new ActionProvider();
  const [quantidades, setQuantidades] = useState({});

  const handleQuantidadeChange = (itemId, event) => {
    const newQuantidades = {
      ...quantidades,
      [itemId]: Number(event.target.value),
    };
    setQuantidades(newQuantidades);
  };

  const handleAdicionarQuantidade = () => {
    setQuantidade(quantidades, props.categoria);
  };

  return (
    <div className="options-container">
      {props.suboptions.map((subItem) => (
        <button key={subItem.id} disabled>
          {subItem.text}
        </button>
      ))}
    </div>
  );
};
