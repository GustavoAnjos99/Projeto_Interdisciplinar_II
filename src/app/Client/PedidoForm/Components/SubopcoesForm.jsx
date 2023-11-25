import React from "react";

const SubopcoesForm = ({ data, updateFieldHandler }) => {
  return (
    <>
      <h2>Escolha seus itens!</h2>
      {data.opcoes !== "" && (
        <p>
          Você escolheu{" "}
          {data.opcoes.length === 1
            ? data.opcoes[0]
            : data.opcoes.slice(0, -1).join(", ") +
              " e " +
              data.opcoes[data.opcoes.length - 1]}
          . Agora, escolha os itens desejados para a festa!
        </p>
      )}
      <div className="btn__itens">
        {data.opcoes.map((opcao, index) => (
          <div className="itens" key={index}>
            <button className="botao" disabled>
              {opcao}
            </button>
            {opcao === "Bolos" && (
              <div>
                <div>
                  <label htmlFor="bolopersonalizado" className="opcao">
                    Bolo Personalizado
                  </label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="bolopersonalizado"
                    id="bolopersonalizado"
                    checked={data.itens.includes("Bolo Personalizado")}
                    onChange={() =>
                      updateFieldHandler("itens", "Bolo Personalizado")
                    }
                  />
                </div>
                <div>
                  <label htmlFor="bolocomum" className="opcao">
                    Bolo Comum
                  </label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="bolocomum"
                    id="bolocomum"
                    checked={data.itens.includes("Bolo Comum")}
                    onChange={() => updateFieldHandler("itens", "Bolo Comum")}
                  />
                </div>
              </div>
            )}
            {opcao === "Doces" && (
              <div>
                <div>
                  <label htmlFor="brigadeiro" className="opcao">
                    Brigadeiro
                  </label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="brigadeiro"
                    id="brigadeiro"
                    checked={data.itens.includes("Brigadeiro")}
                    onChange={() => updateFieldHandler("itens", "Brigadeiro")}
                  />
                </div>
                <div>
                  <label htmlFor="beijinho" className="opcao">
                    Beijinho
                  </label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="beijinho"
                    id="beijinho"
                    checked={data.itens.includes("Beijinho")}
                    onChange={() => updateFieldHandler("itens", "Beijinho")}
                  />
                </div>
                <div>
                  <label htmlFor="bichope" className="opcao">
                    Bicho de Pé
                  </label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="bichope"
                    id="bichope"
                    checked={data.itens.includes("Bicho de Pé")}
                    onChange={() => updateFieldHandler("itens", "Bicho de Pé")}
                  />
                </div>
                <div>
                  <label htmlFor="brigadeironinho" className="opcao">
                    Brigadeiro de Leite Ninho
                  </label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="brigadeironinho"
                    id="brigadeironinho"
                    checked={data.itens.includes("Brigadeiro de Leite Ninho")}
                    onChange={() =>
                      updateFieldHandler("itens", "Brigadeiro de Leite Ninho")
                    }
                  />
                </div>
                <div>
                  <label htmlFor="cajuzinho" className="opcao">
                    Cajuzinho
                  </label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="cajuzinho"
                    id="cajuzinho"
                    checked={data.itens.includes("Cajuzinho")}
                    onChange={() => updateFieldHandler("itens", "Cajuzinho")}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SubopcoesForm;
