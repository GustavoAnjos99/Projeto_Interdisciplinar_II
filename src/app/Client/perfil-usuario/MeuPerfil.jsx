import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/navbar";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthContext } from "../../Auth/Context/auth"; // Importe o contexto AuthContext aqui

function MeuPerfil() {
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário
  const { userID, logado, userType } = useContext(AuthContext); // Use o useContext com o contexto AuthContext

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

    LoadUserName();
  }, [userID, logado, userType]); // Certifique-se de incluir userID, logado e userType como dependências

  return (
    <>
      <Navbar />
      <h1
        style={{ fontSize: "36px", textAlign: "center", marginTop: 20 + "px" }}
      >
        Bem vindo(a), {userName}!
      </h1>
    </>
  );
}

export default MeuPerfil;
