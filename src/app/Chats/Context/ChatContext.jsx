import React, { createContext, useContext, useState } from "react";

const PedidoContext = createContext();

export function usePedidoContext() {
  return useContext(PedidoContext);
}

export function PedidoProvider({ children }) {
  const [itensPedido, setItensPedido] = useState([]);

  const adicionarItemAoPedido = (item) => {
    setItensPedido([...itensPedido, item]);
  };

  const removerItemDoPedido = (index) => {
    const novoPedido = [...itensPedido];
    novoPedido.splice(index, 1);
    setItensPedido(novoPedido);
  };

  return (
    <PedidoContext.Provider
      value={{
        itensPedido,
        adicionarItemAoPedido,
        removerItemDoPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
