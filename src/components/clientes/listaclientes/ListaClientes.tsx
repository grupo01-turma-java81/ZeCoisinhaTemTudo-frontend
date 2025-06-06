import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscar, deletar } from "../../../services/Service";
import { toast } from "react-toastify";

const ListaClientes = () => {
  const navigate = useNavigate();

  // Exemplo de CPF, troque pelo CPF real do cliente ao integrar com backend
  const cpfCliente = 12345678900;

  // Estado para controlar modal de deletar
  const [abrirDeletar, setAbrirDeletar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cliente, setCliente] = useState<{ nome?: string }>({});

  // Buscar cliente ao abrir modal de deletar
  React.useEffect(() => {
    if (abrirDeletar) {
      buscar(`/clientes/${cpfCliente}`, setCliente, {});
    }
  }, [abrirDeletar, cpfCliente]);

  async function deletarCliente() {
    setIsLoading(true);
    try {
      await deletar(`/clientes/${cpfCliente}`, {});
      toast.success("Cliente apagado com sucesso!");
      setAbrirDeletar(false);
      // Aqui você pode atualizar a lista de clientes se necessário
    } catch {
      toast.error("Erro ao deletar o cliente.");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] flex flex-col items-center pt-8">
      {/* Botão para cadastrar novo cliente */}
      <div className="w-full max-w-3xl flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          onClick={() => navigate("/cadastrarcliente")}
        >
          Novo Cliente
        </button>
      </div>
      {/* Card */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex flex-col relative">
        <div className="flex items-center justify-between">
          {/* Perfil */}
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Nome da empresa</h2>
              <div className="text-sm text-gray-700">SP - Pinheiros</div>
              <div className="text-sm text-gray-700">
                Produtos <span className="font-bold ml-1">36</span>
              </div>
            </div>
          </div>
          {/* Nota */}
          <div className="flex flex-col items-end">
            <span className="text-4xl font-bold text-gray-800">5,0</span>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        {/* Divider */}
        <hr className="my-4" />
        {/* Editar perfil */}
        <div className="flex justify-between items-center">
          <button
            className="text-blue-600 hover:underline text-sm font-medium cursor-pointer"
            onClick={() => navigate(`/editarcliente/${cpfCliente}`)}
          >
            Editar perfil
          </button>
          <button
            className="text-red-600 hover:underline text-sm font-medium cursor-pointer"
            onClick={() => setAbrirDeletar(true)}
          >
            Deletar
          </button>
        </div>
        {/* Modal de deletar */}
        {abrirDeletar && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-4">Deletar cliente</h2>
              <p className="mb-6">
                Você tem certeza de que deseja apagar o cliente <b>{cliente.nome}</b>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setAbrirDeletar(false)}
                  disabled={isLoading}
                >
                  Não
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                  onClick={deletarCliente}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Deletando...
                    </span>
                  ) : (
                    <span>Sim</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaClientes;