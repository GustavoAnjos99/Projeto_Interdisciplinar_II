import React from "react";
import { config } from "./Settings/config";
import { MessageParser } from "./Settings/MessageParser";
import { ActionProvider, customWidgets } from "./Settings/ActionProvider";
import Navbar from "../Components/Navbar/navbar";
import { Chatbot } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./styles.css";
import { EscolhaProvider } from "./StorageContext/StorageContext";

export default function Chat() {
  return (
    <>
      <Navbar />
      <EscolhaProvider>
        <Chatbot
          headerText="Chatbot - Ateliê do Chocolate"
          placeholderText="Escreva sua mensagem aqui..."
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </EscolhaProvider>
    </>
  );
}
