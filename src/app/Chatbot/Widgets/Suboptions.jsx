// SubOptionsWidget.js
import React from "react";

const SubOptionsWidget = ({ options, handleSubOption }) => {
  return (
    <div>
      <p>Escolha os itens desejados:</p>
      <ul className="options-container">
        {options.map((option) => (
          <li key={option}>
            <input
              type="checkbox"
              id={option}
              onChange={() => handleSubOption(option)}
            />
            <label htmlFor={option}>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubOptionsWidget;
