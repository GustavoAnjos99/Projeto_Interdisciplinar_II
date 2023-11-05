import React, { useState } from "react";
import "./styles.css";
import Ketlyn from "./assets/Perfil.png";
import Navbar from "../Components/Navbar/navbar";

export default function Chats() {
  const [conteudoPedido, setConteudoPedido] = useState([]);
  const [mostrarProximasOpcoes, setMostrarProximasOpcoes] = useState(false);
  const [opcoesDesejadas, setOpcoesDesejadas] = useState([]);
  const [ultimaOpcaoDesejada, setUltimaOpcaoDesejada] = useState("");

  function handleOpcao(opcaoDesejada) {
    setUltimaOpcaoDesejada(opcaoDesejada);
    setOpcoesDesejadas([...opcoesDesejadas, opcaoDesejada]);
    setConteudoPedido([...conteudoPedido, opcaoDesejada]);
    setMostrarProximasOpcoes(true);
  }

  function handleOpcoes(event) {
    event.preventDefault();
    const opcoesSelecionadas = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    setOpcoesDesejadas([...opcoesDesejadas, ...opcoesSelecionadas]);
    setConteudoPedido([...conteudoPedido, ...opcoesSelecionadas]);
    setMostrarProximasOpcoes(true);
  }

  function handleVoltar() {
    setOpcoesDesejadas([]);
    setUltimaOpcaoDesejada("");
    setMostrarProximasOpcoes(false);
  }

  function handleMostrarOpcoes() {
    return opcoesDesejadas.map((opcao) => (
      <div key={opcao} className="opcao">
        {opcao}
      </div>
    ));
  }

  return (
    <>
      <Navbar />
      <h1 style={{ fontSize: "26px" }}>Novo pedido</h1>
      <div className="container">
        {mostrarProximasOpcoes ? (
          <div className="menu_opcoes">
            <div className="intro">
              <img src={Ketlyn} alt="Ketlyn" className="img__perfil" />
              <p className="text">
                {ultimaOpcaoDesejada === "Bolos"
                  ? "Você escolheu Bolos. Confeitamos bolos personalizados com personagens ou flores com papelaria de luxo. Confira as opções abaixo!"
                  : "Selecione os itens desejados."}
              </p>
            </div>
            {ultimaOpcaoDesejada === "Bolos" ? (
              <form>
                <div className="btn__opcoes">
                  <input
                    type="checkbox"
                    name="Bolos Personalizados"
                    id="Bolos Personalizados"
                    className="checkbox"
                  />
                  <label className="opcao" htmlFor="Bolos Personalizados">
                    Bolos Personalizados
                  </label>
                  <input
                    type="checkbox"
                    name="Bolos Comuns"
                    id="Bolos Comuns"
                    className="checkbox"
                  />
                  <label className="opcao" htmlFor="Bolos Comuns">
                    Bolos Comuns
                  </label>
                </div>
                <div className="send">
                  {mostrarProximasOpcoes && (
                    <button className="voltar" onClick={handleVoltar}>
                      <i
                        className="icone fa-solid fa-rotate-left fa-2xl"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </button>
                  )}
                  <button
                    type="submit"
                    className="opcao"
                    onClick={handleOpcoes}
                  >
                    Próximo
                  </button>
                </div>
              </form>
            ) : (
              handleMostrarOpcoes()
            )}
          </div>
        ) : (
          <div className="menu_opcoes">
            <div className="intro">
              <img src={Ketlyn} alt="Ketlyn" className="img__perfil" />
              <p className="text">
                Olá, seja bem-vindo(a)! Selecione o que deseja adicionar ao seu
                pedido!
              </p>
            </div>
            <div className="btn__opcoes">
              <button className="opcao" onClick={() => handleOpcao("Bolos")}>
                Bolos
              </button>
              <button className="opcao" onClick={() => handleOpcao("Doces")}>
                Doces
              </button>
              <button className="opcao" onClick={() => handleOpcao("Salgados")}>
                Salgados
              </button>
              <button
                className="opcao"
                onClick={() => handleOpcao("Mini Lanches")}
              >
                Mini Lanches
              </button>
              <button
                className="opcao"
                onClick={() => handleOpcao("Serviços de Buffet")}
              >
                Serviços de Buffet
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
