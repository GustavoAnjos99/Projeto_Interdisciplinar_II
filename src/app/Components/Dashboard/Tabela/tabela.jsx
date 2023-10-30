import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["ID do Pedido", "Subtotal", "Concluído?"],
  ["509829", 250.00, "Sim"],
  ["509830", -150.00, "Não"],
  ["509831", 300.00, "Sim"],
  ["509832", 500.00, "Sim"],
  ["509833", -400.00, "Não"],
  ["509834", 1100.00, "Sim"],
];

const options = {
  allowHtml: true,
  showRowNumber: true,
};

const formatters = [
  {
    type: "NumberFormat",
    column: 1,
    options: {
      prefix: "$",
      negativeColor: "red",
      negativeParens: true,
    },
  },
];

function Tabela() {
  return (
    <Chart
      chartType="Table"
      min-width="100%"
      height="400px"
      data={data}
      options={options}
      formatters={formatters}
    />
  );
}

export default Tabela;