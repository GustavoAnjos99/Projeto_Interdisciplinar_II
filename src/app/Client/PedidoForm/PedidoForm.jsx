//Components
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import SweetAlert from "react-bootstrap-sweetalert";
import Navbar from "../../Components/Navbar/navbar";
import UserForm from "./Components/UserForm";
import OpcoesForm from "./Components/OpcoesForm";
import SubopcoesForm from "./Components/SubopcoesForm";
import QuantidadesForm from "./Components/QuantidadesForm";
import Confirmacao from "./Components/Confirmacao";
import Agradecimento from "./Components/Agradecimento";
import Steps from "./Components/Steps";
//Hooks
import { useForm } from "./Hooks/UseForm";
import { useState, useEffect, useContext } from "react";
//Styles
import "./PedidoForm.css";
//Others
import { useHistory } from "react-router-dom";

//Firebase Config
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { AuthContext } from "../../Auth/Context/auth";

const db = firebase.firestore();
const formTemplate = {
  nome: "",
  email: "",
  opcoes: [],
};

export default function PedidoForm() {
  const { userID } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const history = useHistory();

  const showSuccessAlert = showConfirmationPopup;

  const hideSuccessAlert = () => {
    setShowConfirmationPopup(false);
    history.push("/app/meu-perfil");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numeroPedido = await setNumeroPedido();
        setData((prevData) => ({
          ...prevData,
          numero: numeroPedido,
        }));
      } catch (error) {
        console.error("Erro ao obter o número do pedido:", error);
      }
    };

    fetchData();

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []); // Certifique-se de passar um array de dependências vazio para garantir que o useEffect seja executado apenas uma vez

  const [data, setData] = useState({
    ...formTemplate,
    idCliente: userID,
    itens: [],
    quantidades: [],
    avaliacao: "",
    concluido: false,
    emAberto: true,
    emAndamento: false,
    dataPedido: new Date().toDateString(),
  });

  const [opcaoSelecionada, setOpcaoSelecionada] = useState(false);

  function handleQuantidade(index, newValue, key) {
    setData((prev) => {
      const newQuantidades = [...prev[key]];
      newQuantidades[index] = newValue;

      return {
        ...prev,
        [key]: newQuantidades,
      };
    });
  }

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      const updatedValue = Array.isArray(prev[key])
        ? prev[key].includes(value)
          ? prev[key].filter((item) => item !== value)
          : [...prev[key], value]
        : value;

      const hasSelection =
        (Array.isArray(updatedValue) && updatedValue.length > 0) ||
        (typeof updatedValue === "string" && updatedValue.trim() !== "");

      setOpcaoSelecionada(hasSelection);
      return { ...prev, [key]: updatedValue };
    });
    console.log(data);
  };

  const handleAvancar = (step) => {
    switch (step) {
      case 1:
        if (!data.nome || !data.email) {
          throw new Error("Por favor, preencha todos os campos obrigatórios.");
        } else {
          changeStep(step + 1);
        }
        break;
      case 2:
        if (data.opcoes.length === 0) {
          throw new Error("Por favor, escolha ao menos uma opção do catálogo!");
        } else {
          changeStep(step + 1);
        }
        break;
      case 3:
        if (data.itens.length === 0) {
          throw new Error("Por favor, escolha ao menos um item do catálogo!");
        } else {
          changeStep(step + 1);
        }
        break;
      case 4:
        const quantidadesPreenchidas = data.quantidades.every(
          (quantidade) => quantidade !== ""
        );
        if (!quantidadesPreenchidas) {
          throw new Error(
            "Por favor, preencha todas as quantidades para os itens selecionados!"
          );
        } else {
          setData({ ...data, quantidades: data.quantidades });
          changeStep(step + 1);
        }
        break;
      case 5:
        changeStep(step + 1);
        break;
      default:
        break;
    }
  };

  const formComponents = [
    <UserForm
      data={data}
      updateFieldHandler={updateFieldHandler}
      handleAvancar={handleAvancar}
    />,
    <OpcoesForm
      data={data}
      updateFieldHandler={updateFieldHandler}
      handleAvancar={handleAvancar}
    />,
    <SubopcoesForm
      data={data}
      updateFieldHandler={updateFieldHandler}
      handleAvancar={handleAvancar}
    />,
    <QuantidadesForm
      data={data}
      updateFieldHandler={updateFieldHandler}
      handleQuantidade={handleQuantidade}
      handleAvancar={handleAvancar}
    />,
    <Confirmacao data={data} updateFieldHandler={updateFieldHandler} />,
    <Agradecimento data={data} />,
  ];

  const {
    currentStep,
    currentComponent,
    changeStep,
    isFirstStep,
    isLastStep,
  } = useForm(formComponents);

  const formattedData = (data) => {
    const itensQuantidades = data.itens.map((item, id) => {
      const quantidade = data.quantidades[id];
      return `${item}: ${quantidade}`;
    });

    const formattedDate = new Date(data.dataPedido);

    return {
      cliente: data.nome,
      idCliente: data.idCliente,
      email: data.email,
      opcoes: data.opcoes,
      itensQuantidades,
      avaliacao: data.avaliacao,
      concluido: data.concluido,
      emAberto: data.emAberto,
      emAndamento: data.emAndamento,
      dataPedido: formattedDate,
      numero: data.numero,
    };
  };

  const sendDataToFirebase = async (data) => {
    try {
      const formatted = formattedData(data);
      await db
        .collection("usuarios")
        .doc(currentUser.uid)
        .collection("pedidos")
        .add(formatted);
      console.log("Pedido enviado com sucesso!");
    } catch (e) {
      console.error("Erro ao enviar dados para o Firestore: ", e);
    }
  };

  const setNumeroPedido = async () => {
    const ultimoPedidoNumberRef = await db
      .collection("usuarios")
      .doc(userID)
      .collection("pedidos");
    try {
      let ultimoPedidoSnapshot = await ultimoPedidoNumberRef
        .orderBy("numero", "desc")
        .limit(1)
        .get();

      if (!ultimoPedidoSnapshot.empty) {
        let ultimoPedidoData = ultimoPedidoSnapshot.docs[0].data();
        let ultimoPedidoNumber = ultimoPedidoData.numero;

        return ultimoPedidoNumber + 1;
      } else {
        return 1;
      }
    } catch (e) {
      console.error("Ocorreu um erro, tente novamente mais tarde!");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-formulario">
        <div className="header">
          <h1 className="heading">Faça seu pedido</h1>
          <p style={{ textAlign: "center" }}>
            Experimente já o nosso catálogo! Utilize o formulário abaixo para
            criar um novo pedido!
          </p>
        </div>
        <div className="form-containers">
          <Steps currentStep={currentStep} />
          <form
            className="formularios"
            onSubmit={(e) => changeStep(currentStep + 1, e)}
          >
            <div className="inputs-container">{currentComponent}</div>
            <div className="actions">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={() => changeStep(currentStep - 1)}
                >
                  <GrFormPrevious />
                  <span>Voltar</span>
                </button>
              )}
              {!isLastStep ? (
                <button
                  type="submit"
                  disabled={!opcaoSelecionada}
                  onClick={() => handleAvancar()}
                >
                  <span>Avançar</span>
                  <GrFormNext />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={() => {
                    sendDataToFirebase(data);
                    setShowConfirmationPopup(true);
                  }}
                >
                  <span>Enviar</span>
                  <FiSend />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {showConfirmationPopup && (
        <SweetAlert
          success
          title="Pedido Enviado!"
          onConfirm={hideSuccessAlert}
        >
          Pedido enviado com sucesso. Agradecemos pela preferência!
        </SweetAlert>
      )}
    </>
  );
}
