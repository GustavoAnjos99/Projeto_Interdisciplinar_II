class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    // Verifica se a mensagem do usuário contém alguma opção conhecida
    const knownOptions = [
      { keyword: "bolos", id: 1 },
      { keyword: "doces", id: 2 },
      { keyword: "salgados", id: 3 },
      { keyword: "mini lanches", id: 4 },
      { keyword: "buffet", id: 5 },
    ];

    const selectedOption = knownOptions.find((option) =>
      lowercase.includes(option.keyword)
    );

    if (selectedOption) {
      // Se uma opção conhecida foi identificada, chama a função correspondente
      this.handleOption(selectedOption.id);
    } else {
      // Caso contrário, assume que o usuário está tentando digitar uma mensagem
      this.actionProvider.handleUserMessage(message);
    }
  }

  handleOption(id) {
    switch (id) {
      case 1:
        this.actionProvider.handleBolos();
        break;
      case 2:
        this.actionProvider.handleDoces();
        break;
      case 3:
        this.actionProvider.handleSalgados();
        break;
      case 4:
        this.actionProvider.handleMiniLanches();
        break;
      case 5:
        this.actionProvider.handleBuffet();
        break;
        default:
            this.actionProvider.handleUnknownOption(id);
        break;
    }
  }
}

export { MessageParser };
