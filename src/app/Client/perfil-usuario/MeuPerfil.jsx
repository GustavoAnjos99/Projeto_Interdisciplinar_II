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
        if (logado && userType === "cliente") {
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
            return {
              id: doc.id,
              ...data,
              dataPedido:
                data.dataPedido && data.dataPedido.toDate
                  ? data.dataPedido.toDate()
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

    LoadUserName();
    LoadPedidos();
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
                <th>ID do Pedido</th>
                <th>Itens do Pedido</th>
                <th>Data do Pedido</th>
                <th>Status do Pedido</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>
                    {Array.isArray(pedido.itens)
                      ? pedido.itens.join(", ")
                      : "Nenhum item"}
                  </td>

                  <td>{pedido.dataPedido}</td>
                  <td>{pedido.status}</td>
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
