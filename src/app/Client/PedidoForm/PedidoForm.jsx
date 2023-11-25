//Components
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
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
import { useState, useEffect } from "react";
//Styles
import "./PedidoForm.css";

//Firebase Config
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const db = firebase.firestore();

const formTemplate = {
  nome: "",
  email: "",
  opcoes: [],
};

export default function PedidoForm() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const [data, setData] = useState({
    ...formTemplate,
    itens: [],
    quantidades: [],
    avaliacao: "",
    concluido: false,
    emAberto: true,
    emAndamento: false,
    dataPedido: new Date().toDateString(),
    numero: 1,
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
          setData(...data, data.quantidades);
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

  const sendDataToFirebase = async (data) => {
    try {
      await db
        .collection("usuarios")
        .doc(currentUser.uid)
        .collection("pedidos")
        .add(data);
      console.log("Pedido enviado com sucesso!");
    } catch (e) {
      console.error("Erro ao enviar dados para o Firestore: ", e);
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
          <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
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
    </>
  );
}
