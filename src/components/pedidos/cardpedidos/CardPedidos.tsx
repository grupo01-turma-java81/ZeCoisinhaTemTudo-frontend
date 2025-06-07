import { Link } from "react-router-dom";
import type Pedido from "../../../models/Pedido";
import { FaBox, FaMoneyBillWave } from "react-icons/fa";

interface CardPedidosProps {
  pedido: Pedido;
  onEditar: (id: string) => void;
}

function CardPedido({ pedido, onEditar }: CardPedidosProps) {
  const statusMap: { [key: string]: string } = {
    Concluído: "bg-green-500 text-white",
    "Em Andamento": "bg-yellow-400 text-white",
    Cancelado: "bg-red-500 text-white",
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 mb-4">
      <div className="flex items-center gap-3">
        <FaBox className="text-2xl text-gray-700" />
        <span className="font-bold text-lg">Pedido</span>
        <span className="text-green-600 font-bold">
          #{String(pedido.id).padStart(2, "0")}
        </span>
        <span
          className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
            statusMap[pedido.statusEntrega] || "bg-gray-300"
          }`}
        >
          {pedido.statusEntrega?.toLowerCase()}
        </span>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => onEditar(pedido.id?.toString() || "")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Editar
          </button>
          <button className="text-blue-600 hover:underline cursor-pointer">
            <Link to={`/deletarpedido/${pedido.id}`}>Deletar</Link>
          </button>
        </div>
      </div>
      <div className="ml-8">
        <div className="font-semibold">
          Cliente: <span className="font-normal">{pedido.cliente?.nome}</span>
        </div>
        <div className="font-semibold">
          Data: <span className="font-normal">{pedido.dataPedido}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <FaMoneyBillWave className="text-green-600 text-xl" />
          <span className="font-bold text-lg">
            R${" "}
            {Number(pedido.valorTotal).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardPedido;
