import { Menu } from "../../../site/Components/menu";
import { Pedido } from "../Pedido/Pedido";

function MeuPerfil() {
  return (
    <>
      <Menu/>
    <main>
      <div className="container">
        <div className="row">
          <div className="col">
            <Pedido
              id={1}
              titulo="Pedido 509829"
              itens={["100 unidades de Beijinho", "100 unidades de Brigadeiro"]}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Pedido
              id={2}
              titulo="Pedido 509830"
              itens={["100 unidades de Beijinho", "100 unidades de Brigadeiro", "Buffet Completo"]}
            />
          </div>
        </div>

        <Pedido
          id={3}
          titulo="Pedido 509831"
          itens={["100 unidades de Beijinho", "100 unidades de Brigadeiro", "150 mini hotdogs"]}
        />

        <Pedido
          id={4}
          titulo="Pedido 509832"
          itens={["100 unidades de Beijinho", "100 unidade de Bicho de pé", "Cascata de Chocolate", "100 unidades de Brigadeiro"]}
        />

        <Pedido
          id={5}
          titulo="Pedido 509833"
          itens={["100 unidades de Beijinho", "100 unidades de Brigadeiro", "Carrinho de Crepe Suiço", "250 mini Pizzas"]}
        />
      </div>
      </main>
      </>
  );
}

export default MeuPerfil;
