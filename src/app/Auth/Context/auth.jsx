import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app'; // Importe o Firebase
import 'firebase/auth';

const AuthContext = React.createContext({});

function AuthProvider(props) {
  const storedLogado = localStorage.getItem("logado");

  const adminUserID = 'xlSBLZr64BODo1EkiD78aZQvQL72';

  const [logado, setLogado] = useState(storedLogado === "S" ? true : false);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        setUserID(userId);
        setLogado(true);
        localStorage.setItem("logado", "S");
        localStorage.setItem("userID", userId);
      } else {
        setUserID(null);
        setLogado(false);
        localStorage.setItem("logado", "N");
        localStorage.removeItem("userID");
      }
    });

    return () => unsubscribe(); 
  }, []);

  const userType = userID === adminUserID ? 'admin' : 'cliente';

  return (
    <AuthContext.Provider value={{ logado, setLogado, userType, userID }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
