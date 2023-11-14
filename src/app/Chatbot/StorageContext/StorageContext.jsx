import React, { createContext, useContext, useState } from "react";

const EscolhaContext = createContext();

export const EscolhaProvider = ({ children }) => {
  const [escolha, setEscolha] = useState({
    opcao: null,
    subOpcoes: [],
    quantidades: [],
  });

  const [messages, setMessages] = useState([]);

  const setOpcao = (opcao) => {
    setEscolha((prevEscolha) => ({ ...prevEscolha, opcao }));
  };

  const setSubOpcoes = (subOpcoes) => {
    setEscolha((prevEscolha) => ({ ...prevEscolha, subOpcoes }));
  };

  const setQuantidades = (quantidades) => {
    setEscolha((prevEscolha) => ({ ...prevEscolha, quantidades }));
  };

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <EscolhaContext.Provider
      value={{
        escolha,
        setOpcao,
        setSubOpcoes,
        setQuantidades,
        messages,
        sendMessage,
      }}
    >
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
