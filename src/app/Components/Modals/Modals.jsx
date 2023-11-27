import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import firebase from "firebase";
import { AuthContext } from "../../Auth/Context/auth";

const Modals = ({ pedidoDetails, onHide, ...props }) => {
  const { userID } = useContext(AuthContext);
  const [pedidoData, setPedidoData] = useState(null);

  const formatarData = (dataPedido) => {
    const data = dataPedido?.toDate();
    return data?.toLocaleString();
  };

  useEffect(() => {
    const fetchPedidoData = async () => {
      try {
        if (pedidoDetails && pedidoDetails.id) {
          const db = firebase.firestore();
          const pedidoRef = db
            .collection("usuarios")
            .doc(userID)
            .collection("pedidos")
            .doc(pedidoDetails.id);

          const pedidoSnapshot = await pedidoRef.get();

          if (pedidoSnapshot.exists) {
            setPedidoData(pedidoSnapshot.data());
          } else {
            console.error("Pedido not found");
          }
        }
      } catch (error) {
        console.error("Error fetching pedido data:", error);
      }
    };

    fetchPedidoData();
  }, [userID, pedidoDetails]);

  return (
    <Modal size="lg" centered show={pedidoDetails !== null} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Dados do Pedido</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pedidoData && (
          <>
            <p>Número do Pedido: {pedidoData.numero}</p>
            <p>
              Data do Pedido:{" "}
              {pedidoData && formatarData(pedidoData.dataPedido)}
            </p>
            <p>Cliente: {pedidoData.cliente}</p>
            <h3>Itens do pedido:</h3>
            <p>
              {pedidoData.itens &&
                Array.isArray(pedidoData.itens) &&
                pedidoData.itens.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="submit" onClick={onHide}>
          Fechar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
