import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";
import type Cliente from "../../../models/Cliente";
import { useState } from "react";

interface CardClientesProps {
  cliente: Cliente;
  onEditar: () => void;
  onDeletar: () => void;
}

function CardClientes({ cliente, onEditar, onDeletar }: CardClientesProps) {
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 8px 32px #6c7a9355" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl grid grid-cols-2 md:grid-cols-6 items-center px-6 py-4 min-h-[56px] gap-y-2"
    >
      <span className="text-base font-normal flex items-center gap-1 break-all">
        {cliente.cpf}
        <button
          title="Copiar CPF"
          className="text-gray-500 hover:text-blue-600 transition"
          onClick={() => handleCopy(cliente.cpf, "cpf")}
        >
          <FiCopy />
        </button>
        {copied === "cpf" && (
          <span className="text-xs text-green-600 ml-1">Copiado!</span>
        )}
      </span>
      <span className="text-base font-normal break-all">{cliente.nome}</span>
      <span className="text-base font-normal flex items-center gap-1 break-all">
        {cliente.telefone}
        <button
          title="Copiar Telefone"
          className="text-gray-500 hover:text-blue-600 transition"
          onClick={() => handleCopy(cliente.telefone, "telefone")}
        >
          <FiCopy />
        </button>
        {copied === "telefone" && (
          <span className="text-xs text-green-600 ml-1">Copiado!</span>
        )}
      </span>
      <span className="text-base font-normal break-all">{cliente.endereco}</span>
      <span className="text-base font-normal break-all">{cliente.dataCadastro}</span>
      <div className="flex gap-2 justify-center">
        <button
          title="Editar"
          className="text-blue-600 hover:text-blue-900 transition cursor-pointer"
          onClick={onEditar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2h5a2 2 0 012 2v5a2 2 0 01-2 2z"
            />
          </svg>
        </button>
        <button
          title="Deletar"
          className="text-red-600 hover:text-red-900 transition cursor-pointer"
          onClick={onDeletar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default CardClientes;