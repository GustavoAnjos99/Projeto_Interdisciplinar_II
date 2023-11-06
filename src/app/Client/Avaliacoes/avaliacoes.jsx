import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Navbar from "../../Components/Navbar/navbar";
import SweetAlert from "react-bootstrap-sweetalert";
import { useParams } from "react-router-dom";

function Avaliacoes() {
  const { id } = useParams();
  // const [userId, setUserId] = useState(userIdProp);
  const [pedidos, setPedidos] = useState([]);
  const [avaliacao, setAvaliacao] = useState("");
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState("");
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      const db = firebase.firestore();

      db.collection("Pedidos")
        .where("userid", "==", id)
        .get()
        .then((querySnapshot) => {
          const pedidosData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPedidos(pedidosData);
        })
        .catch((error) => {
          console.error("Erro ao recuperar pedidos: ", error);
        });
    };

    fetchPedidos();
  }, [id]);

  const handleAvaliacaoChange = (event) => {
    const pedidoId = event.target.value;
    setAvaliacaoSelecionada(pedidoId);

    const pedido = pedidos.find((pedido) => pedido.id === pedidoId);
    setPedidoSelecionado(pedido);
  };
  const atualizarPedido = async () => {
    if (pedidoSelecionado) {
      const db = firebase.firestore();
      const { id, avaliacao } = pedidoSelecionado;

      // Atualiza o pedido com as informações alteradas no Firebase
      db.collection("Pedidos")
        .doc()
        .update({ avaliacao })
        .then(() => {
          console.log("Pedido atualizado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar pedido: ", error);
        });
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="Row">
        <h1 className="text-center">Avalie Seus Pedidos</h1>
      </div>
      <div className="Row">
        <div className="col-sm-3 m mx-auto p-2">
          <select
            className="form-select"
            aria-label="Default select example"
            value={avaliacaoSelecionada}
            onChange={handleAvaliacaoChange}
          >
            <option value="">Escolha um pedido</option>
            {pedidos.map((pedido) => (
              <option key={pedido.id} value={pedido.id}>
                {pedido.id}
              </option>
            ))}
          </select>
        </div>
      </div>
      {pedidoSelecionado && (
        <div className="row">
          <div className="col-sm-6 m mx-auto p-2">
            <div class="mb-3">
              <h2>Detalhes do Pedido</h2>
              <label for="exampleFormControlInput1" className="form-label">
                Descrição:{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder={pedidoSelecionado.Descricao}
                disabled
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Avaliação:
              </label>
              <input
                onChange={(e) => setAvaliacao(e.target.value)}
                value={avaliacao}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
              />
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              >
                {pedidoSelecionado.avaliacao}
              </textarea>
            </div>
            <button onClick={atualizarPedido} className="btn btn-Primary">
              Enviar Avaliação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avaliacoes;
