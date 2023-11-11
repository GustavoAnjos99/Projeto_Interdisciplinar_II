import React from "react";
import { Chatbot, ChatStateProvider } from "react-chatbot-kit";
import MostrarPedido from "./MostrarPedido";
import config from "../../Chatbot/Components/";

const PedidoPage = () => {
  return (
    <ChatStateProvider>
      <div>
        <h1>Novo Pedido</h1>
        <div className="chatbot-container">
          <Chatbot
            className="menu_opcoes"
            config={config}
            customComponents={{ MostrarPedido }}
          />
        </div>
      </div>
    </ChatStateProvider>
  );
};

export default PedidoPage;
