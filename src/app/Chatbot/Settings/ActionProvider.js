class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.subOptionSelected = null;
  }

  greet = () => {
    const message = this.createChatBotMessage("Seja bem-vindo(a) ao chatbot Ateliê do Chocolate!");
    this.addMessageToState(message);
  };

  handleBolos = () => {
    const message = this.createChatBotMessage(
      "Você escolheu Bolos. Você escolheu Bolos. Confeitamos bolos personalizados com personagens ou flores com papelaria de luxo. Confira as opções abaixo!",
      {
        widget: "Bolos",
      }
    );

    this.addMessageToState(message);
  };
    
  handleDoces = () => {
    const message = this.createChatBotMessage(
      "Você escolheu Doces. São doces de 10g que compõem de forma deliciosa a hora do Parabéns!!! Temos as opções abaixo, clique e escolha:",
      {
        widget: "Doces",
      }
    );
    this.addMessageToState(message);
  };
    
  handleSalgados = () => {
    const message = this.createChatBotMessage(
      "Feitos com os melhores ingredientes, nossos salgados são a escolha ideal para uma explosão de sabores na sua festa. Clique agora e mergulhe nessa deliciosa seleção!",
      {
        widget: "Salgados",
      }
    );
    this.addMessageToState(message);
  }

  handleMiniLanches = () => {
    const message = this.createChatBotMessage(
      " Feitos com os melhores ingredientes, nossos mini lanches darão uma turbinada na sua festa. Clique e escolha a melhor opção para sua comemoração.",
      {
        widget: "MiniLanches",
      }
    );
    this.addMessageToState(message);
  }

  handleBuffet = () => {
    const message = this.createChatBotMessage(
      "Nosso Buffet completo oferece doces, salgados, bolo, mini Lanches e muito mais! Para adquirir esse pacote de serviços entre em contato!",
      {
        widget: "Buffet",
      }
    );
    this.addMessageToState(message);
  }

   handleSubOptions = (subOptions) => {
    console.log("Suboptions selected:", subOptions);
    // Faça o que for necessário com as subopções aqui
    // Por exemplo, você pode querer enviar as subopções para o servidor
  };


  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleSubOption = (subOptions) => {
    this.subOptionSelected = subOptions;
    const message = this.createChatBotMessage(`Você escolheu: ${subOptions.join(", ")}. Digite a quantidade desejada para cada item escolhido!`);
    this.addMessageToState(message);
  }
}

export { ActionProvider };