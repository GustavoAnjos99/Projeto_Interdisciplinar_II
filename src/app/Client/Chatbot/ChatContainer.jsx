import React from "react";
import { ChatContext } from "./Context/ChatContext";
import Chatbot from "./Components/Chatbot";

export default function ChatContainer() {
  return (
    <ChatContext>
      <Chatbot />
    </ChatContext>
  );
}
