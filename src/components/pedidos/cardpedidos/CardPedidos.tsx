import { Link } from "react-router-dom";
import type Pedido from "../../../models/Pedido";

interface CardPedidosProps {
  pedido: Pedido;
}

function CardPedido({ pedido }: CardPedidosProps) {
  return (
    <div
      className="border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between"
    >
      <div>
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
          <img
            src={pedido.usuario?.foto}
            className="h-12 rounded-full"
            alt={pedido.usuario?.nome}
          />
          <h3 className="text-lg font-bold text-center uppercase">
            {pedido.usuario?.nome}
          </h3>
        </div>
        <div className="p-4 ">
          <h4 className="text-lg font-semibold uppercase">{pedido.id}</h4>
          <p>{pedido.statusEntrega}</p>
          <p>Tema: {pedido.cliente?.nome}</p>
          <p>
            Data:{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(pedido.dataPedido))}
          </p>
        </div>
      </div>
      <div className="flex">
        <Link
          to={`/editarpedido/${pedido.id}`}
          className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
    flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarpedido/${pedido.id}`}
          className="text-white bg-red-400 
	hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPedido;
