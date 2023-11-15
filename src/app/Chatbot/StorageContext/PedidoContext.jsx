import React, { useState, createContext, useContext } from "react";

const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState({});
  const [opcoes, setOpcoes] = useState({});
  const [subopcoes, setSubopcoes] = useState({});

  const addOpcoes = (opcao) => {
    setPedido((prevPedido) => ({
      ...prevPedido,
      opcoes: [...prevPedido.opcoes, opcao],
    }));
  };

  const addSubopcoes = (subopcao, quantidade) => {
    setPedido((prevPedido) => ({
      ...prevPedido,
      subopcoes: [...prevPedido.subopcoes, subopcao],
      quantidades: [...prevPedido.quantidades, quantidade],
    }));
  };

  const values = {
    pedido,
    setPedido,
    opcoes,
    setOpcoes,
    subopcoes,
    setSubopcoes,
    addOpcoes,
    addSubopcoes,
  };

  return (
    <PedidoContext.Provider value={values}>{children}</PedidoContext.Provider>
  );
};

export const usePedidoContext = () => {
  const context = React.useContext(PedidoContext);
  if (!context) {
    throw new Error(
      "usePedidoContext deve ser usado dentro de um PedidoProvider"
    );
  }
  return context;
};
