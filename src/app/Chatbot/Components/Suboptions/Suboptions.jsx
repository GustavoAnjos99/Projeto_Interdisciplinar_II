import React, { useState } from "react";
import "./styles.css";

export const SubOptions = (props) => {
  const { selectedOption, handleSubOption } = props;
  const [selectedSubOptions, setSelectedSubOptions] = useState([]);

  const subOptions = {
    Bolos: ["Bolo Personalizado", "Bolo Comum"],
    Doces: [
      "Brigadeiro",
      "Beijinho",
      "Cajuzinho",
      "Brigadeiro de Nutella",
      "Brigadeiro de Paçoca",
      "Bicho de Pé",
      "Cascata de Chocolate",
    ],
    Salgados: [
      "Coxinha",
      "Bolinho de Queijo",
      "Bolinho de Carne",
      "Esfiha de Carne",
      "Esfiha de Calabresa",
      "Esfiha de Frango",
      "Risole",
      "Quibe",
      "Crepe Suíço",
    ],
    MiniLanches: ["Mini HotDog", "Mini Hamburguer"],
    Buffet: ["Buffet Completo"],
  };

  const handleCheckboxChange = (value) => {
    const updatedSubOptions = selectedSubOptions.includes(value)
      ? selectedSubOptions.filter((option) => option !== value)
      : [...selectedSubOptions, value];

    setSelectedSubOptions(updatedSubOptions);
  };

  const handleContinue = () => {
    handleSubOption(selectedSubOptions);
  };

  const checkboxesMarkup =
    subOptions[selectedOption]?.map((option) => (
      <div key={option} className="checkbox-container">
        <input
          type="checkbox"
          id={option}
          value={option}
          checked={selectedSubOptions.includes(option)}
          onChange={() => handleCheckboxChange(option)}
        />
        <label htmlFor={option}>{option}</label>
      </div>
    )) || null;

  return (
    <div className="sub-options-container">
      {checkboxesMarkup}
      <button onClick={handleContinue}>Continuar</button>
    </div>
  );
};
