import React, { createContext, useContext, useState } from "react";

const EscolhaContext = createContext();

export const EscolhaProvider = ({ children }) => {
  const [escolha, setEscolha] = useState({
    opcao: null,
    subOpcoes: [],
  });

  const setOpcao = (opcao) => {
    setEscolha((prevEscolha) => ({ ...prevEscolha, opcao }));
  };

  const setSubOpcoes = (subOpcoes) => {
    setEscolha((prevEscolha) => ({ ...prevEscolha, subOpcoes }));
  };

  return (
    <EscolhaContext.Provider value={{ escolha, setOpcao, setSubOpcoes }}>
      {children}
    </EscolhaContext.Provider>
  );
};

export const useEscolha = () => {
  const context = useContext(EscolhaContext);
  if (!context) {
    throw new Error("useEscolha deve ser usado dentro de um EscolhaProvider");
  }
  return context;
};
