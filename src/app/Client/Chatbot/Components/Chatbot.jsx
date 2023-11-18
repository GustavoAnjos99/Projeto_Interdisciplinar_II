import React, { useState } from "react";
import { usePedidoContext } from "../Context/ChatContext";
import Navbar from "../../../Components/Navbar/navbar";
import BoasVindas from "./BoasVindas";
import "../styles.css";
import Itens from "./Itens";
export default function Chatbot() {
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
    pedidoVazio,
  } = usePedidoContext();

  const [continuarPedido, setContinuarPedido] = useState(false);
  return (
    <>
      <Navbar />
      <h1 className="title">Novo Pedido</h1>
      <div className="container">
        {opcoesDesejadas.length === 0 && <BoasVindas />}
        {opcoesDesejadas.length - 1 !== "" && <Itens />}
      </div>
    </>
  );
}
