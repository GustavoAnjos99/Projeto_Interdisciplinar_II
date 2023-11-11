import React from "react";

const MostrarPedido = ({ steps, values }) => {
  const mostrarPedido = () => {
    // Lógica para mostrar o pedido
    const pedidos = values.reduce((acc, item) => {
      const quantidade = steps[item.step].value;
      return acc + `${quantidade}x ${item.content}, `;
    }, "");

    return <p>Seu pedido: {pedidos}</p>;
  };

  return <div>{mostrarPedido()}</div>;
};

export default MostrarPedido;
