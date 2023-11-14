import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import { Options } from "../Components/Options/Options.jsx";
import { SubOptions } from "../Components/Suboptions/Suboptions.jsx";
import { GetBolos } from "../Components/Suboptions/GetBolos.jsx";
import { GetDoces } from "../Components/Suboptions/GetDoces.jsx";
import { GetSalgados } from "../Components/Suboptions/GetSalgados.jsx";
import { GetMiniLanches } from "../Components/Suboptions/GetMiniLanches.jsx";

const config = {
  botName: "Ateliê do Chocolate",
  initialMessages: [
    createChatBotMessage(`Olá! Seja bem-vindo(a). Para fazer um novo pedido, digite a opção desejada!`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "suboptionsBolos",
      widgetFunc: (props) => <GetBolos {...props} />,
    },
    {
      widgetName: "suboptionsDoces",
      widgetFunc: (props) => <GetDoces {...props}/>
    },
    {
      widgetName: "suboptionsSalgados",
      widgetFunc: (props) => <GetSalgados {...props}/>
    },
    {
      widgetName: "suboptionsMiniLanches",
      widgetFunc: (props) => <GetMiniLanches {...props}/>
    }
  ],

};

export { config };