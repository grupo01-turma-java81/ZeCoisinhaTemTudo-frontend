import type Cliente from "../../../models/Cliente";

interface CardClientesProps {
  cliente: Cliente;
  onEditar: () => void;
  onDeletar: () => void;
}

function CardClientes({ cliente, onEditar, onDeletar }: CardClientesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm flex items-center px-6 py-4 min-h-[56px] mb-3">
      <span className="text-base font-normal mr-6">{cliente.cpf}</span>
      <span className="text-base font-normal">{cliente.nome}</span>
      <div className="ml-auto flex gap-2">
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
    </div>
  );
}

export default CardClientes;
