import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/navbar";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthContext } from "../../Auth/Context/auth";
import "./styles.css";

function MeuPerfil() {
  const [userName, setUserName] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const { userID, logado, userType } = useContext(AuthContext);

  useEffect(() => {
    async function LoadUserName() {
      try {
        if (logado && userType === "cliente") {
          const db = firebase.firestore();
          const UsuarioRef = db.collection("usuarios").doc(userID);
          const Usuario = await UsuarioRef.get();
          const username = Usuario.data().nomecompleto;

          setUserName(username);
        } else {
          console.log("Algo deu errado.");
        }
      } catch (error) {
        console.error("Erro ao carregar o nome do usuário:", error);
      }
    }

    async function LoadPedidos() {
      try {
        if (logado && userType === "cliente" && userID) {
          const db = firebase.firestore();
          const usuariosRef = db.collection("usuarios");
          const userRef = usuariosRef.doc(userID);
          const pedidosRef = userRef.collection("pedidos");

          const querySnapshot = await pedidosRef
            .orderBy("dataPedido", "desc")
            .limit(1)
            .get();
          const pedidosData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            let status;
            if (data) {
              status = getPedidoStatus(data);
            } else {
              console.log("data é undefined");
            }
            return {
              id: doc.id,
              ...data,
              status,
              dataPedido:
                data && data.dataPedido && data.dataPedido.toDate
                  ? data.dataPedido.toDate().toLocaleString()
                  : null,
            };
          });

          setPedidos(pedidosData);
        } else {
          console.log("Algo deu errado.");
        }
      } catch (error) {
        console.error("Erro ao carregar os pedidos:", error);
      }
    }

    const getPedidoStatus = (data) => {
      if (
        data.emAberto === true &&
        data.emAndamento === false &&
        data.concluido === false &&
        data.cancelado === false
      ) {
        return "Em Aberto";
      } else if (
        data.emAndamento === true &&
        data.emAberto === false &&
        data.concluido === false &&
        data.cancelado === false
      ) {
        return "Em Andamento";
      } else if (
        data.concluido === true &&
        data.emAberto === false &&
        data.emAndamento === false &&
        data.cancelado === false
      ) {
        return "Concluído";
      } else if (
        data.cancelado === true &&
        data.emAberto === false &&
        data.emAndamento === false &&
        data.concluido === false
      ) {
        return "Cancelado";
      } else {
        return "Erro";
      }
    };
    LoadUserName();
    LoadPedidos();
    getPedidoStatus();
  }, [userID, logado, userType]);

  return (
    <>
      <Navbar />
      <h1 className="welcome-heading">Bem-vindo(a), {userName}!</h1>
      <p className="welcome-message">Confira os seus pedidos já realizados!</p>
      <div className="dashboard">
        <section id="pedidos" className="ultimosPedidos">
          <br />
          <h2 className="ultimosPedidos__header">Últimos Pedidos</h2>
          <table className="table ultimosPedidos__body">
            <thead>
              <tr>
                <th>Número do Pedido</th>
                <th>Data do Pedido</th>
                <th>Status do Pedido</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.numero}</td>
                  <td>{pedido.dataPedido}</td>
                  <td>{pedido.getPedidoStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default MeuPerfil;
