import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/navbar";
import { Card } from "react-bootstrap";
import firebase from "../../Config/firebase";
import "./styles.css";

export default function GerenciarPedidos() {
  const [pedidosEmAberto, setPedidosEmAberto] = useState([]);
  const [pedidosEmAndamento, setPedidosEmAndamento] = useState([]);
  const [pedidosConcluidos, setPedidosConcluidos] = useState([]);
  const [lastPedidoNumber, setLastPedidoNumber] = useState(0);

  useEffect(() => {
    async function getPedidos() {
      try {
        const db = firebase.firestore();
        const pedidosEmAbertoData = [];
        const pedidosEmAndamentoData = [];
        const pedidosConcluidosData = [];

        const usuariosRef = db.collection("usuarios");
        const usuariosSnapshot = await usuariosRef.get();

        for (const usuarioDoc of usuariosSnapshot.docs) {
          const pedidosRef = usuarioDoc.ref.collection("pedidos");
          const pedidosSnapshot = await pedidosRef.get();

          pedidosSnapshot.forEach((doc) => {
            const dadosPedido = doc.data();

            if (dadosPedido.emAberto) {
              pedidosEmAbertoData.push(dadosPedido);
            } else if (dadosPedido.emAndamento) {
              pedidosEmAndamentoData.push(dadosPedido);
            } else if (dadosPedido.concluido) {
              pedidosConcluidosData.push(dadosPedido);
            }
          });
        }

        setPedidosEmAberto(pedidosEmAbertoData);
        setPedidosEmAndamento(pedidosEmAndamentoData);
        setPedidosConcluidos(pedidosConcluidosData);
      } catch (error) {
        console.error("Erro ao obter pedidos:", error);
      }
    }

    async function fetchLastPedidoNumber() {
      try {
        const db = firebase.firestore();
        const lastNumberRef = db.collection("metadata").doc("numeroDePedidos");
        const doc = await lastNumberRef.get();
        if (doc.exists) {
          setLastPedidoNumber(doc.data().numero);
        }
      } catch (error) {
        console.error("Erro ao obter o último número de pedido:", error);
      }
    }

    fetchLastPedidoNumber();
    getPedidos();
  }, []);

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", margin: "20px" }}>
        Gerenciamento de Pedidos
      </h1>
      <div className="card__container">
        <Card className="column">
          <Card.Header className="text heading">Pedidos em Aberto</Card.Header>
          <Card.Body>
            {pedidosEmAberto.map((pedido, index) => (
              <Card className="column__item" key={index}>
                <Card.Header>
                  <button type="button" className="text column__item__text">
                    Pedido {pedido.numero} - {pedido.cliente}
                  </button>
                </Card.Header>
              </Card>
            ))}
          </Card.Body>
        </Card>
        <Card className="column">
          <Card.Header className="text heading">
            Pedidos em Andamento
          </Card.Header>
          <Card.Body>
            {pedidosEmAndamento.map((pedido, index) => (
              <Card className="column__item" key={index}>
                <Card.Header>
                  <button type="button" className="text column__item__text">
                    Pedido {pedido.numero} - {pedido.cliente}
                  </button>
                </Card.Header>
              </Card>
            ))}
          </Card.Body>
        </Card>
        <Card className="column">
          <Card.Header className="text heading ">
            Pedidos Concluídos
          </Card.Header>
          <Card.Body>
            {pedidosConcluidos.map((pedido, index) => (
              <Card className="column__item" key={index}>
                <Card.Header>
                  <button type="button" className="text column__item__text">
                    Pedido {pedido.numero} - {pedido.cliente}
                  </button>
                </Card.Header>
              </Card>
            ))}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
