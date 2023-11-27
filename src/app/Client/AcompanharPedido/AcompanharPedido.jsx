import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../Components/Navbar/navbar";
import { Card } from "react-bootstrap";
import firebase from "../../Config/firebase";
import Modals from "../../Components/Modals/Modals";
import "./styles.css";
import { AuthContext } from "../../Auth/Context/auth";

export default function AcompanharPedido() {
  const [pedidosEmAberto, setPedidosEmAberto] = useState([]);
  const [pedidosEmAndamento, setPedidosEmAndamento] = useState([]);
  const [pedidosConcluidos, setPedidosConcluidos] = useState([]);
  const [lastPedidoNumber, setLastPedidoNumber] = useState(0);
  const { userID } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  const handleShowModal = (pedido) => {
    setPedidoSelecionado(pedido);
  };

  const handleHideModal = () => {
    setPedidoSelecionado(null);
  };

  const getPedidoStatus = (status) => {
    if (status.emAberto) {
      return "Em aberto";
    } else if (status.emAndamento) {
      return "Em andamento";
    } else if (status.concluido) {
      return "Concluído";
    } else {
      return null;
    }
  };

  useEffect(() => {
    async function getPedidos() {
      try {
        const db = firebase.firestore();
        const pedidosEmAbertoData = [];
        const pedidosEmAndamentoData = [];
        const pedidosConcluidosData = [];

        const usuarioRef = db.collection("usuarios").doc(userID);
        const pedidosRef = usuarioRef.collection("pedidos");

        const pedidosSnapshot = await pedidosRef.get();

        pedidosSnapshot.forEach((doc) => {
          const dadosPedido = doc.data();
          const status = getPedidoStatus(dadosPedido);

          if (status === "Em aberto") {
            pedidosEmAbertoData.push(dadosPedido);
          } else if (status === "Em andamento") {
            pedidosEmAndamentoData.push(dadosPedido);
          } else if (status === "Concluído") {
            pedidosConcluidosData.push(dadosPedido);
          }
        });

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
  }, [userID]);

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", margin: "20px" }}>
        Acompanhamento de Pedidos
      </h1>
      <div className="card__container">
        <Card className="column">
          <Card.Header className="text heading">Pedidos em Aberto</Card.Header>
          <Card.Body>
            {pedidosEmAberto.map((pedido, index) => (
              <Card className="column__item" key={index}>
                <Card.Header>
                  <button
                    type="button"
                    className="text column__item__text"
                    onClick={() => handleShowModal(pedido)}
                  >
                    Pedido {pedido.numero}
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
                  <button
                    type="button"
                    className="text column__item__text"
                    onClick={() => handleShowModal(pedido)}
                  >
                    Pedido {pedido.numero}
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
                  <button
                    type="button"
                    className="text column__item__text"
                    onClick={() => handleShowModal(pedido)}
                  >
                    Pedido {pedido.numero}
                  </button>
                </Card.Header>
              </Card>
            ))}
          </Card.Body>
        </Card>
      </div>
      <Modals pedidoDetails={pedidoSelecionado} onHide={handleHideModal} />
    </>
  );
}
