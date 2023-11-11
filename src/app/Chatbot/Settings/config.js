import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import { Options } from "../Components/Options/Options.jsx";
import {SubOptions} from "../Components/Suboptions/Suboptions.jsx"

const config = {
  botName: "Ateliê do Chocolate",
  initialMessages: [
    createChatBotMessage(`Olá! Seja bem-vindo(a). Para fazer um novo pedido, selecione ou digite a opção desejada!`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "opcaoBolos",
      widgetFunc: (props) => <SubOptions {...props} />,
      props: {
        questions: [
          {
            question: "What is closure?",
            answer:
              "Closure is a way for a function to retain access to it's enclosing function scope after the execution of that function is finished.",
            id: 1,
          },
          {
            question: "Explain prototypal inheritance",
            answer:
              "Prototypal inheritance is a link between an object and an object store that holds shared properties. If a property is not found on the host object, javascript will check the prototype object.",
            id: 2,
          },
        ],
      },
    },
  ],
};

export { config };