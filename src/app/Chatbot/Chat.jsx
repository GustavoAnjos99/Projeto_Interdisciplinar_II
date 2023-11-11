import React from "react";
import { config } from "./Settings/config";
import { MessageParser } from "./Settings/MessageParser";
import { ActionProvider } from "./Settings/ActionProvider";
import Navbar from "../Components/Navbar/navbar";
import { Chatbot } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./styles.css";

export default function Chat() {
  const handleSubOption = (subOptions) => {
    console.log("Suboptions selected:", subOptions);
    // Aqui você pode realizar qualquer lógica adicional com as subopções selecionadas
    // Por exemplo, você pode querer passar isso para o ActionProvider
  };
  return (
    <>
      <Navbar />
      <div>
        <Chatbot
          headerText="Chatbot - Ateliê do Chocolate"
          placeholderText="Escreva sua mensagem aqui..."
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </>
  );
}
