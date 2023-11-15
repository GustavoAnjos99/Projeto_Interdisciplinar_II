import React from "react";
import { config } from "./Settings/config";
import { MessageParser } from "./Settings/MessageParser";
import { ActionProvider } from "./Settings/ActionProvider";
import Navbar from "../Components/Navbar/navbar";
import { Chatbot } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./styles.css";
import { PedidoProvider } from "./StorageContext/PedidoContext";

export default function Chat() {
  return (
    <PedidoProvider>
      <Navbar />
      <Chatbot
        headerText="Chatbot - Ateliê do Chocolate"
        placeholderText="Escreva sua mensagem aqui..."
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </PedidoProvider>
  );
}
