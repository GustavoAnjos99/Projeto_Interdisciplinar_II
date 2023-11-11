import React from "react";
import { Chatbot } from "react-chatbot-kit";
import { MostrarPedido } from "../Chatbot/Components/MostrarPedido";

export default function Chat() {
  return (
    <Chatbot
      steps={[
        {
          id: "1",
          message:
            "Olá, seja bem-vindo(a)! Escolha o tipo de produto que deseja:",
          trigger: "tipoProduto",
        },
        {
          id: "tipoProduto",
          options: [
            { value: "bolos", label: "Bolos", trigger: "opcoesBolos" },
            { value: "doces", label: "Doces", trigger: "opcoesDoces" },
            { value: "salgados", label: "Salgados", trigger: "opcoesSalgados" },
            {
              value: "miniLanches",
              label: "Mini Lanches",
              trigger: "opcoesMiniLanches",
            },
            {
              value: "buffet",
              label: "Serviços de Buffet",
              trigger: "opcoesBuffet",
            },
          ],
        },
        {
          id: "opcoesBolos",
          message: "Ótima escolha! Escolha o tipo de bolo:",
          // Opções para bolos (por exemplo, bolo personalizado, bolo comum)
          trigger: "quantidade",
        },
        {
          id: "opcoesDoces",
          message: "Delicioso! Escolha os tipos de doces:",
          // Opções para doces
          trigger: "quantidade",
        },
        {
          id: "opcoesSalgados",
          message: "Excelente escolha! Escolha os tipos de salgados:",
          // Opções para salgados
          trigger: "quantidade",
        },
        {
          id: "opcoesMiniLanches",
          message: "Incrível! Escolha os tipos de mini lanches:",
          // Opções para mini lanches
          trigger: "quantidade",
        },
        {
          id: "opcoesBuffet",
          message: "Perfeito! Escolha o pacote de serviços de buffet:",
          // Opções para serviços de buffet
          trigger: "quantidade",
        },
        {
          id: "quantidade",
          message: "Quantos deseja?",
          // Pergunta pela quantidade
          trigger: "adicionarAoPedido",
        },
        {
          id: "adicionarAoPedido",
          options: [
            { value: "sim", label: "Sim", trigger: "1" }, // Voltar para o início
            { value: "nao", label: "Não", trigger: "mostrarPedido" }, // Mostrar o pedido e finalizar
          ],
        },
        {
          id: "mostrarPedido",
          component: <MostrarPedido />, // Componente para mostrar a lista de pedidos
          end: true,
        },
      ]}
    />
  );
}
