import React from "react";
import { usePedidoContext } from "../Context/ChatContext";
import Ketlyn from "../assets/Perfil.png";
export default function Quantidades() {
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
    voltar,
    setVoltar,
    handleContinuarSubopcoes,
    handleContinuarQuantidades,
    renderSubopcoes,
  } = usePedidoContext();

  return (
    <>
      {opcoesDesejadas !== "" && renderSubopcoes && (
        <div className="menu_opcoes">
          <div className="intro">
            <img src={Ketlyn} alt="Ketlyn" className="img__perfil" />
            <p className="text">
              Você escolheu {renderSubopcoes}, agora, determine a quantidade
              desejada para cada item desejado!
            </p>
          </div>
          <div className="quantidades">
            <button onClick={() => {}}>
              <i class="fa-solid fa-plus" style={{ color: "#FFFFFF" }}></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
