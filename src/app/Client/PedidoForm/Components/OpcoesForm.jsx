import React from "react";

const OpcoesForm = ({ data, updateFieldHandler }) => {
  return (
    <>
      <h2>Catálogo de Opções</h2>
      <p>Agora, escolha as opções desejadas para sua festa!</p>
      <div className="btn__opcoes">
        <div className="label-selected">
          <label htmlFor="bolos" className="opcao">
            Bolos
          </label>
          <input
            type="checkbox"
            className="checkbox"
            name="bolos"
            id="bolos"
            checked={data.opcoes.includes("Bolos")}
            onChange={() => updateFieldHandler("opcoes", "Bolos")}
          />
        </div>
        <div>
          <label htmlFor="doces" className="opcao">
            Doces
          </label>
          <input
            type="checkbox"
            className="checkbox"
            name="doces"
            id="doces"
            checked={data.opcoes.includes("Doces")}
            onChange={() => updateFieldHandler("opcoes", "Doces")}
          />
        </div>
        <div>
          <label htmlFor="salgados" className="opcao">
            Salgados
          </label>
          <input
            type="checkbox"
            className="checkbox"
            name="salgados"
            id="salgados"
            checked={data.opcoes.includes("Salgados")}
            onChange={() => updateFieldHandler("opcoes", "Salgados")}
          />
        </div>
        <div>
          <label htmlFor="MiniLanches" className="opcao">
            Mini Lanches
          </label>
          <input
            type="checkbox"
            className="checkbox"
            name="MiniLanches"
            id="MiniLanches"
            checked={data.opcoes.includes("Mini Lanches")}
            onChange={() => updateFieldHandler("opcoes", "Mini Lanches")}
          />
        </div>
        <div>
          <label htmlFor="buffet" className="opcao">
            Serviços de Buffet
          </label>
          <input
            type="checkbox"
            className="checkbox"
            name="buffet"
            id="buffet"
            checked={data.opcoes.includes("Serviços de Buffet")}
            onChange={() => updateFieldHandler("opcoes", "Serviços de Buffet")}
          />
        </div>
      </div>
    </>
  );
};

export default OpcoesForm;
