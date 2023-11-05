import React, { useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import firebase from "../../../Config/firebase";

export default function GraficoPedidos() {
  const db = firebase.firestore();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Sua lógica para buscar dados do Firebase aqui

    const fetchData = () => {
      const newData = [];
      for (let i = 0; i < 20; i++) {
        newData.push({
          Pedido: i + 1,
          "Em andamento": (Math.random() * 20 + 20).toFixed(2),
          Concluídos: (Math.random() * 10 + 10).toFixed(2),
          Cancelados: (Math.random() * 5).toFixed(2),
        });
      }
      setData(newData);
    };

    fetchData();
  }, []);

  const TooltipContent = (props) => {
    if (!props.active || !props.payload) {
      return null;
    }
    const data = props.payload[0].payload;
    return (
      <div>
        <div>Resumo de Pedidos do Mês: {data.Pedido}</div>
        <div>Em andamento: {data["Em andamento"]}</div>
        <div>Concluídos: {data.Concluídos}</div>
        <div>Cancelados: {data.Cancelados}</div>
      </div>
    );
  };

  return (
    <>
      <LineChart data={data} width={550} height={120}>
        <XAxis dataKey="Pedido" />
        <YAxis domain={[0, 50]} type="number" />
        <CartesianGrid stroke="grey" strokeDasharray="5 5" />
        <Line dataKey="Em andamento" stroke="blue" strokeWidth={1} />
        <Line dataKey="Concluídos" stroke="green" strokeWidth={1} />
        <Line dataKey="Cancelados" stroke="red" strokeWidth={1} />
        <Legend />
        <Tooltip content={<TooltipContent />} />
      </LineChart>
    </>
  );
}
