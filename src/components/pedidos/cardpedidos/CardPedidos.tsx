import { motion } from "framer-motion";
import type Pedido from "../../../models/Pedido";
import { FaBox, FaChevronDown, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { useState } from "react";
import ModalDeletarPedido from "../modaldeletarpedido/ModalDeletarPedido";

interface CardPedidosProps {
  pedido: Pedido;
  onEditar: (id: string) => void;
  onAtualizar?: (pedidoAtualizado: Pedido) => void;
}

function CardPedido({ pedido, onEditar, onAtualizar }: CardPedidosProps) {
  const statusMap: { [key: string]: string } = {
    Concluído: "bg-green-500 text-white",
    "Em Andamento": "bg-yellow-400 text-white",
    Cancelado: "bg-red-500 text-white",
  };

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [avaliacaoAberta, setAvaliacaoAberta] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.008, boxShadow: "0 8px 32px #6c7a9355" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-white rounded-xl shadow p-6 pl-1 flex flex-col gap-2 mb-4"
    >
      <div className="flex items-center gap-3 ml-7">
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
            className="text-blue-600 hover:underline cursor-pointer mr-2.5"
          >
            Editar
          </button>
          <button
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setModalDeleteOpen(true)}
          >
            Deletar
          </button>
          <ModalDeletarPedido
            id={pedido.id?.toString() || ""}
            open={modalDeleteOpen}
            onClose={() => setModalDeleteOpen(false)}
            onAtualizar={() => onAtualizar(pedido)}
          />
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
        <div className="mt-6 border-t border-gray-200 pt-4">
          <button
            className="flex items-center gap-2 text-[#223047] font-semibold focus:outline-none cursor-pointer"
            onClick={() => setAvaliacaoAberta((prev) => !prev)}
          >
            <span>Avaliação do Cliente</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${
                avaliacaoAberta ? "rotate-180" : ""
              }`}
            />
          </button>
          {avaliacaoAberta && (
            <div className="mt-3 bg-[#f7f7fa] rounded-lg px-4 py-3">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(pedido.nota || 0)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
                {[...Array(5 - (pedido.nota || 0))].map((_, i) => (
                  <FaStar key={i} className="text-gray-300 text-xl" />
                ))}
                {pedido.nota && (
                  <span className="ml-2 text-gray-600 font-mono">
                    ({pedido.nota})
                  </span>
                )}
              </div>
              <div className="italic text-gray-700 text-base">
                “{pedido.comentario || "Sem comentário"}”
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CardPedido;
