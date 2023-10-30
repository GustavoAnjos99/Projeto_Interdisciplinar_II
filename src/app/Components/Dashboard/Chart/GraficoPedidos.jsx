import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';
import firebase from '../../../Config/firebase';

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
          'Em andamento': (Math.random() * 20 + 20).toFixed(2),
          Concluídos: (Math.random() * 10 + 10).toFixed(2),
          Cancelados: (Math.random() * 5).toFixed(2),
        });
      }
      setData(newData);
    };

    fetchData();
  }, []); // Certifique-se de passar um array vazio como segundo argumento

  const TooltipContent = (props) => {
    if (!props.active || !props.payload) {
      return null; // Evite renderizar se não houver dados
    }
    const data = props.payload[0].payload;
    return (
      <div>
        <div>Resumo de Pedidos do Mês: {data.Pedido}</div>
        <div>Em andamento: {data['Em andamento']}</div>
        <div>Concluídos: {data.Concluídos}</div>
        <div>Cancelados: {data.Cancelados}</div>
      </div>
    );
  };

  return (
    <>
      <LineChart data={data} width={500} height={125}>
        <XAxis dataKey="Pedido" />
        <YAxis domain={[0, 50]} type="number" />
        <CartesianGrid stroke="grey" strokeDasharray="5 5" />
        <Line dataKey="Em andamento" stroke="blue" strokeWidth={3} />
        <Line dataKey="Concluídos" stroke="green" strokeWidth={3} />
        <Line dataKey="Cancelados" stroke="red" strokeWidth={3} />
        <Legend />
        <Tooltip content={<TooltipContent />} />
      </LineChart>
    </>
  );
}
