import React from "react";
import Modal from "react-bootstrap/Modal";
import firebase from "firebase";

const ModalsAdmin = ({
  pedidoDetails,
  onHide,
  numero,
  dataPedido,
  cliente,
  avaliacao,
  itens,
  emAberto,
  emAndamento,
  concluido,
  changeStatus,
  ...props
}) => {
  const changePedidoStatus = () => {
    let newStatus;

    if (emAberto) {
      newStatus = { emAndamento: true, emAberto: false, concluido: false };
    } else if (emAndamento) {
      newStatus = { emAndamento: false, emAberto: false, concluido: true };
    } else {
      newStatus = { emAndamento: false, emAberto: false, concluido: false };
    }

    changeStatus({ status: newStatus }); // Modificado para passar um objeto com a propriedade 'status'
  };

  const formatStatus = (status) => {
    if (status.emAberto) {
      return "Em Aberto";
    } else if (status.emAndamento) {
      return "Em Andamento";
    } else if (status.concluido) {
      return "Concluído";
    } else {
      return "Status Desconhecido";
    }
  };

  const formatarData = (dataPedido) => {
    const data = dataPedido?.toDate();
    return data?.toLocaleString();
  };

  const updatePedidoStatusInFirebase = async (pedidoId, newStatus) => {
    const db = firebase.firestore();

    // Add a conditional check for pedidoDetails
    if (pedidoDetails && pedidoDetails.idCliente != null) {
      const pedidoRef = db
        .collection("usuarios")
        .doc(String(pedidoDetails.idCliente))
        .collection("pedidos")
        .doc(pedidoId);

      try {
        const docSnapshot = await pedidoRef.get();

        if (docSnapshot.exists) {
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
    } else {
      console.error(
        "pedidoDetails or pedidoDetails.idCliente is null or undefined"
      );
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
            <p>Status: {formatStatus({ emAberto, emAndamento, concluido })}</p>
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
        <button className="submit" onClick={updatePedidoStatusInFirebase}>
          Mudar Status
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalsAdmin;
