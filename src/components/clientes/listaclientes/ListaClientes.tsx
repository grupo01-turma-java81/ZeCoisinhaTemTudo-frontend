import React, { useState, useEffect, useContext } from "react";
import { buscar, deletar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type Cliente from "../../../models/Cliente";

const ListaClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [abrirDeletar, setAbrirDeletar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

  const { usuario } = useContext(AuthContext);
  const token = usuario?.token || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.info("Você precisa estar logado!");
      navigate("/login");
      return;
    }
    buscar("/clientes", setClientes, {
      headers: { Authorization: token }
    });
  }, [token, navigate]);

  // Função para abrir o modal de deletar e setar o cliente selecionado
  function abrirModalDeletar(cliente: Cliente) {
    setClienteSelecionado(cliente);
    setAbrirDeletar(true);
  }

  // Função para deletar o cliente selecionado
  async function deletarCliente() {
    if (!clienteSelecionado) return;
    setIsLoading(true);
    try {
      await deletar(`/clientes/${clienteSelecionado.cpf}`, {
        headers: { Authorization: token }
      });
      toast.success("Cliente apagado com sucesso!");
      setClientes(clientes.filter(c => c.cpf !== clienteSelecionado.cpf));
      setAbrirDeletar(false);
      setClienteSelecionado(null);
    } catch {
      toast.error("Erro ao deletar o cliente.");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] flex flex-col items-center pt-8">
      <div className="w-full max-w-3xl flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          onClick={() => navigate("/cadastrarcliente")}
        >
          Novo Cliente
        </button>
      </div>
      <div className="w-full max-w-3xl">
        {clientes.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum cliente cadastrado.</p>
        ) : (
          clientes.map(cliente => (
            <div key={cliente.cpf} className="bg-white rounded-lg shadow p-6 flex flex-col relative mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{cliente.nome}</h2>
                  <div className="text-sm text-gray-700">CPF: {cliente.cpf}</div>
                  <div className="text-sm text-gray-700">Telefone: {cliente.telefone}</div>
                  <div className="text-sm text-gray-700">Endereço: {cliente.endereco}</div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center">
                <button
                  className="text-blue-600 hover:underline text-sm font-medium cursor-pointer"
                  onClick={() => navigate(`/editarcliente/${cliente.cpf}`)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline text-sm font-medium cursor-pointer"
                  onClick={() => abrirModalDeletar(cliente)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal de deletar */}
      {abrirDeletar && clienteSelecionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Deletar cliente</h2>
            <p className="mb-6">
              Você tem certeza de que deseja apagar o cliente <b>{clienteSelecionado.nome}</b>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                onClick={() => setAbrirDeletar(false)}
                disabled={isLoading}
              >
                Não
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 flex items-center justify-center cursor-pointer"
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
  );
};

export default ListaClientes;