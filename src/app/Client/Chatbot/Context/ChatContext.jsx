import React, { useState, useEffect, createContext, useContext } from "react";
import UseCustomHistory from "../Hooks/UseCustomHistory";

const PedidoContext = createContext({});

export const ChatContext = ({ children }) => {
  const [conteudoPedido, setConteudoPedido] = useState({
    itens: [
      {
        item: "",
        subopcoes: {
          opcaoRelacionada: "",
          item: "",
          quantidade: "",
        },
      },
    ],
  });
  const [opcoesDesejadas, setOpcoesDesejadas] = useState([]);
  const [subopcoesDesejadas, setSubopcoesDesejadas] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [observacoes, setObservacoes] = useState({});
  const [pedidoVazio, setPedidoVazio] = useState(true);
  const [voltar, setVoltar] = useState(true);

  const optionChoice = (option) => {
    switch (option) {
      case "Bolos":
        setOpcoesDesejadas([...opcoesDesejadas, "Bolos"]);
        setConteudoPedido((prevConteudoPedido) => ({
          ...prevConteudoPedido,
          itens: {
            ...prevConteudoPedido.itens,
            item: "Bolos",
          },
        }));
        setPedidoVazio(false);
        break;
      case "Doces":
        setOpcoesDesejadas([...opcoesDesejadas, "Doces"]);
        setConteudoPedido((prevConteudoPedido) => ({
          ...prevConteudoPedido,
          itens: {
            ...prevConteudoPedido.itens,
            item: "Doces",
          },
        }));
        setPedidoVazio(false);
        break;
      case "Salgados":
        setOpcoesDesejadas([...opcoesDesejadas, "Salgados"]);
        setConteudoPedido((prevConteudoPedido) => ({
          ...prevConteudoPedido,
          itens: {
            ...prevConteudoPedido.itens,
            item: "Salgados",
          },
        }));
        setPedidoVazio(false);
        break;
      case "Mini Lanches":
        setOpcoesDesejadas([...opcoesDesejadas, "Mini Lanches"]);
        setConteudoPedido((prevConteudoPedido) => ({
          ...prevConteudoPedido,
          itens: {
            ...prevConteudoPedido.itens,
            item: "Mini Lanches",
          },
        }));
        setPedidoVazio(false);
        break;
      case "Serviços de Buffet":
        setOpcoesDesejadas([...opcoesDesejadas, "Serviços de Buffet"]);
        setConteudoPedido((prevConteudoPedido) => ({
          ...prevConteudoPedido,
          itens: {
            ...prevConteudoPedido.itens,
            item: "Serviços de Buffet",
          },
        }));
        setPedidoVazio(false);
        break;
      default:
        break;
    }
  };
  const handleVoltar = () => {
    setOpcoesDesejadas((prevOpcoes) => prevOpcoes.slice(0, -1));
    setConteudoPedido((prevConteudoPedido) => {
      const itensArray = Array.isArray(prevConteudoPedido.itens)
        ? prevConteudoPedido.itens.slice(0, -1)
        : [];
      return { ...prevConteudoPedido, itens: itensArray };
    });
  };

  const handleContinuarSubopcoes = (subopcao) => {
    setSubopcoesDesejadas((prevSubopcoes) => [...prevSubopcoes, subopcao]);

    setConteudoPedido((prevConteudoPedido) => {
      const novosItens = prevConteudoPedido.itens.map((item) => {
        if (item.subopcoes) {
          return {
            ...item,
            subopcoes: {
              ...item.subopcoes,
              item: subopcao,
            },
          };
        }
        return item;
      });

      return { ...prevConteudoPedido, itens: novosItens };
    });
  };

  const handleContinuarQuantidades = (quantidade) => {
    setQuantidades([...quantidades, quantidade]);
    setConteudoPedido((prevConteudoPedido) => {
      const novosItens = [
        ...prevConteudoPedido.itens.subopcoes.quantidade,
        quantidade,
      ];
    });
  };

  const renderSubopcoes = () => {
    const subopcoes = {};
    for (let n = 0; n < conteudoPedido.itens.length() - 1; n++) {
      const opcao = conteudoPedido.itens[n];
      const subopcoes = opcao.subopcoes.item;
    }
    return subopcoes;
  };
  const values = {
    conteudoPedido,
    setConteudoPedido,
    opcoesDesejadas,
    setOpcoesDesejadas,
    subopcoesDesejadas,
    setSubopcoesDesejadas,
    quantidades,
    setQuantidades,
    observacoes,
    setObservacoes,
    optionChoice,
    handleVoltar,
    voltar,
    setVoltar,
    handleContinuarSubopcoes,
    handleContinuarQuantidades,
    renderSubopcoes,
  };

  return (
    <PedidoContext.Provider value={values}>{children}</PedidoContext.Provider>
  );
};

export const usePedidoContext = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error(
      "usePedidoContext deve ser usado dentro de um PedidoProvider"
    );
  }
  return context;
};
