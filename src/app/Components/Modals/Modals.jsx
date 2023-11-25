// Modals.jsx
import React from "react";
import Modal from "react-bootstrap/Modal";

const Modals = ({ pedidoDetails, onHide }) => {
  return (
    <Modal size="lg" centered show={pedidoDetails !== null} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Dados do Pedido
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pedidoDetails && (
          <>
            <p>Número do Pedido: {pedidoDetails.numero}</p>
            <p>Data do Pedido: {pedidoDetails.dataPedido}</p>
            <p>Resumo do Pedido: </p>
            {pedidoDetails}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide}>Fechar</button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
