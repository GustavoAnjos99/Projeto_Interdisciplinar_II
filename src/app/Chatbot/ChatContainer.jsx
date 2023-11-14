import React, { useState } from "react";
import { ActionProvider } from "./Settings/ActionProvider";
import Chat from "./Chat";
import { createChatBotMessage } from "react-chatbot-kit";

const ChatContainer = () => {
  const config = {
    customActionProvider: new ActionProvider(createChatBotMessage),
  };
  const [chatbotState, setChatbotState] = useState({
    messages: [],
  });

  // Função para adicionar mensagens ao estado do chatbot
  const addMessageToState = (message) => {
    setChatbotState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  // Criação da instância do ActionProvider
  const actionProvider = new ActionProvider(
    createChatBotMessage,
    setChatbotState
  );

  return (
    <div>
      <Chat actionProvider={actionProvider} />
    </div>
  );
};

export default ChatContainer;
