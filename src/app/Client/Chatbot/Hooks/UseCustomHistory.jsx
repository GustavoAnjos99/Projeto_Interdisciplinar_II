import { usePedidoContext } from "../Context/ChatContext";

const UseCustomHistory = () => {
  const {
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
    setVoltar,
  } = usePedidoContext();

  const voltar = () => {};

  return { voltar };
};

export default UseCustomHistory;
