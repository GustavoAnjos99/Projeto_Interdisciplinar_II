import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import firebase from "firebase";
import { AuthContext } from "../../Auth/Context/auth";
const ModalsAdmin = ({
  pedidoDetails,
  onHide,
  numero,
  dataPedido,
  cliente,
  avaliacao,
  itens,
  status,
  changeStatus,
  ...props
}) => {
  const { userID } = useContext(AuthContext);
  const changePedidoStatus = () => {
    let newStatus;
    if (status === "Em aberto") {
      newStatus = "Em andamento";
    } else if (status === "Em andamento") {
      newStatus = "Concluído";
    } else {
      newStatus = null;
    }

    changeStatus(newStatus);

    if (newStatus) {
      updatePedidoStatusInFirebase(pedidoDetails.id, newStatus);
    }
  };

  const formatarData = (dataPedido) => {
    const data = dataPedido?.toDate();
    return data?.toLocaleString();
  };

  const updatePedidoStatusInFirebase = async (
    pedidoId,
    idCliente,
    newStatus
  ) => {
    const db = firebase.firestore();
    const pedidoRef = db
      .collection("usuarios")
      .doc(idCliente)
      .collection("pedidos")
      .doc(pedidoId);

    try {
      // Get the document snapshot to check if the document exists
      const docSnapshot = await pedidoRef.get();

      if (docSnapshot.exists) {
        // Document exists, proceed with the update
        await pedidoRef.update({ status: newStatus });
        console.log("Document updated successfully!");
      } else {
        console.error(
          "Document does not exist at the specified path:",
          pedidoRef.path
        );
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <Modal size="lg" centered show={pedidoDetails !== null} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Dados do Pedido</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pedidoDetails && (
          <>
            <p>Número do Pedido: {numero}</p>
            <p>
              Data do Pedido:{" "}
              {pedidoDetails && formatarData(pedidoDetails.dataPedido)}
            </p>
            <p>Cliente: {cliente}</p>
            <p>Avaliação: {avaliacao}</p>
            <p>Status: {status}</p>
            <h3>Itens do pedido:</h3>
            <p>
              {itens &&
                Array.isArray(itens) &&
                itens.map((item, index) => <p key={index}>{item}</p>)}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="submit" onClick={onHide}>
          Fechar
        </button>
        <button className="submit" onClick={changePedidoStatus}>
          Mudar Status
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalsAdmin;
