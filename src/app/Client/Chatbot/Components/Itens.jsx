import React from "react";
import { usePedidoContext } from "../Context/ChatContext";
import Ketlyn from "../assets/Perfil.png";
import UseCustomHistory from "../Hooks/UseCustomHistory";
import { useState } from "react";
import Quantidades from "./Quantidades";

export default function Itens() {
  const {
    opcoesDesejadas,
    subopcoesDesejadas,
    setSubopcoesDesejadas,
    pedidoVazio,
    handleVoltar,
    handleContinuarSubopcoes,
  } = usePedidoContext();

  const { voltar } = UseCustomHistory();
  const [itensEscolhidos, setItensEscolhidos] = useState([]);

  const handleCheckboxChange = (item) => {
    setItensEscolhidos((prevItens) => [...prevItens, item]);
  };

  const handleContinuar = () => {
    setSubopcoesDesejadas([...subopcoesDesejadas, ...itensEscolhidos]);
    handleContinuarSubopcoes();
  };

  const handleProx = () => {
    <Quantidades />;
  };

  return (
    <>
      {!pedidoVazio && opcoesDesejadas[opcoesDesejadas.length - 1] === "Bolos" && (
        <div className="menu_opcoes">
          <div className="intro">
            <img src={Ketlyn} alt="Ketlyn" className="img__perfil" />
            <p className="text">
              Você escolheu Bolos. Confeitamos bolos personalizados com
              personagens ou flores com papelaria de luxo. Confira as opções
              abaixo!
            </p>
          </div>
          <form className="btn__opcoes">
            <input
              type="checkbox"
              name="Bolos Personalizados"
              id="Bolos Personalizados"
              className="checkbox"
              onChange={() => handleCheckboxChange("Bolos Personalizados")}
            />
            <label className="opcao" htmlFor="Bolos Personalizados">
              Bolos Personalizados
            </label>
            <input
              type="checkbox"
              name="Bolos Comuns"
              id="Bolos Comuns"
              className="checkbox"
              onChange={() => handleCheckboxChange("Bolos Comuns")}
            />
            <label className="opcao" htmlFor="Bolos Comuns">
              Bolos Comuns
            </label>

            <div className="send">
              <button
                className="voltar"
                onClick={() => {
                  handleVoltar();
                  voltar();
                }}
              >
                <i
                  className="icone fa-solid fa-rotate-left fa-2xl"
                  style={{ color: "#ffffff" }}
                ></i>
              </button>
              <button
                type="button"
                className="opcao"
                onClick={() => {
                  handleContinuar();
                  handleProx();
                }}
              >
                Próximo
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
