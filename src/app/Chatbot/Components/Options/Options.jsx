import React, { useState } from "react";
import "./styles.css";

export const Options = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (id) => {
    setSelectedOption(id);
    switch (id) {
      case 1:
        props.actionProvider.handleBolos();
        break;
      case 2:
        props.actionProvider.handleDoces();
        break;
      case 3:
        props.actionProvider.handleSalgados();
        break;
      case 4:
        props.actionProvider.handleMiniLanches();
        break;
      case 5:
        props.actionProvider.handleBuffet();
        break;
      default:
        break;
    }
  };

  const options = [
    {
      text: "Bolos",
      handler: props.actionProvider.handleBolos,
      id: 1,
    },
    {
      text: "Doces",
      handler: props.actionProvider.handleDoces,
      id: 2,
    },
    {
      text: "Salgados",
      handler: props.actionProvider.handleSalgados,
      id: 3,
    },
    {
      text: "Mini Lanches",
      handler: props.actionProvider.handleMiniLanches,
      id: 4,
    },
    {
      text: "Serviços de Buffet",
      handler: props.actionProvider.handleBuffet,
      id: 5,
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={() => handleOptionClick(option.id)}
      className="option-button"
      disabled
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};
