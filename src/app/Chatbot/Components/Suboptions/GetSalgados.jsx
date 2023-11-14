import React from "react";
import "./styles.css";

const GetSalgados = (props) => {
  const suboptions = [
    {
      texts: [
        "Coxinha",
        "Bolinha de Queijo",
        "Bolinha de Carne",
        "Esfiha de Carne",
        "Esfiha de Frango",
        "Esfiha de Calabresa",
        "Quibe",
        "Crepe Suíço",
      ],
      handler: props.actionProvider.handleTiposSalgados,
      id: 1,
    },
  ];

  const buttonsMarkup = suboptions.map((suboption) => (
    <div key={suboption.id}>
      {suboption.texts &&
        suboption.texts.map((text, index) => (
          <button key={index} className="option-button" disabled>
            {text}
          </button>
        ))}
    </div>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export { GetSalgados };
