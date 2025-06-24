import { useState, useContext, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { Oval } from "react-loader-spinner";
import type Cliente from "../../../models/Cliente";
import type Pedido from "../../../models/Pedido";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPedido({
  id,
  onAtualizar,
  onClose,
}: {
  id?: string;
  onAtualizar: (pedido: Pedido) => void;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente>({} as Cliente);
  const [pedido, setPedido] = useState<Pedido>({} as Pedido);
  const [etapa, setEtapa] = useState<1 | 2>(1);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPedidoPorId(id: string) {
    try {
      await buscar(`/pedidos/${id}`, setPedido, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarClientePorId(id: string) {
    try {
      await buscar(`/clientes/${id}`, setCliente, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarClientes() {
    try {
      await buscar("/clientes", setClientes, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarClientes();

    if (id !== undefined) {
      buscarPedidoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPedido({
      ...pedido,
      cliente: cliente,
    });
  }, [cliente]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setPedido({
      ...pedido,
      [e.target.name]: e.target.value,
      cliente: cliente,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/pedidos");
  }

  async function gerarNovoPedido(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/pedidos`, pedido, setPedido, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Pedido atualizado com sucesso", "sucesso");
        onAtualizar(pedido);
        onClose();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Pedido", "erro");
        }
      }
    } else {
      try {
        const novoPedido = await cadastrar(`/pedidos`, pedido, setPedido, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Pedido cadastrado com sucesso", "sucesso");
        onAtualizar(novoPedido);
        onClose();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Pedido", "erro");
        }
      }
    }

    retornar();
  }

  const carregandoCliente = cliente.nome === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Pedido" : "Cadastrar Pedido"}
      </h1>

      <form
        className="flex flex-col w-3/4 max-w-2xl gap-6"
        onSubmit={gerarNovoPedido}
      >
        {etapa == 1 && (
          <>
            <div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label
                  htmlFor="dataPedido"
                  className="block text-sm font-medium mb-2"
                >
                  Data do Pedido
                </label>
              </div>
              <input
                type="text"
                id="dataPedido"
                name="dataPedido"
                required
                placeholder="dd/mm/yyyy"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                value={pedido.dataPedido}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>

            <div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label
                  htmlFor="statusEntrega"
                  className="block text-sm font-medium mb-2"
                >
                  Status da Entrega
                </label>
              </div>
              <select
                id="statusEntrega"
                name="statusEntrega"
                required
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 cursor-pointer"
                value={pedido.statusEntrega || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  atualizarEstado(e as any)
                }
              >
                <option value="" disabled>
                  Selecione o status
                </option>
                <option value="Concluído">Concluído</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label
                  htmlFor="valorTotal"
                  className="block text-sm font-medium mb-2"
                >
                  Preço do pedido
                </label>
                <span className="block mb-2 text-sm text-gray-500">
                  O sistema automaticamente formata em R$.
                </span>
              </div>
              <input
                type="text"
                id="valorTotal"
                name="valorTotal"
                required
                placeholder="Ex: 200 (Insira apenas números)"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                value={pedido.valorTotal}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>

            <div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label
                  htmlFor="Cliente"
                  className="block text-sm font-medium mb-2"
                >
                  Cliente que solicitou o pedido
                </label>
              </div>
              <select
                id="Cliente"
                name="Cliente"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 cursor-pointer"
                value={cliente.id || ""}
                onChange={(e) => buscarClientePorId(e.currentTarget.value)}
                required
              >
                <option value="" disabled>
                  Selecione o Cliente
                </option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="rounded bg-blue-600 hover:bg-blue-700 text-white font-bold w-full py-2 flex justify-center mt-3 cursor-pointer"
              onClick={() => setEtapa(2)}
              disabled={carregandoCliente}
            >
              Próximo
            </button>
          </>
        )}
        {etapa == 2 && (
          <>
            <div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label
                  htmlFor="Positivo"
                  className="block text-sm font-medium mb-2"
                >
                  Cliente satisfeito?
                </label>
              </div>
              <select
                name="Positivo"
                id="Positivo"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 cursor-pointer"
                value={
                  pedido.positivo === true
                    ? "true"
                    : pedido.positivo === false
                    ? "false"
                    : ""
                }
                onChange={(e) =>
                  setPedido({
                    ...pedido,
                    positivo: e.target.value === "true",
                  })
                }
                required
              >
                <option value="" disabled>
                  Selecione a opção:
                </option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>

            <div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label
                  htmlFor="nota"
                  className="block text-sm font-medium mb-2"
                >
                  Nota
                </label>
                <span className="block mb-2 text-sm text-gray-500">
                  (1 - 5)
                </span>
              </div>
              <select
                name="nota"
                id="nota"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 cursor-pointer"
                value={pedido.nota || ""}
                onChange={atualizarEstado}
                required
              >
                <option value="" disabled>
                  Selecione a nota
                </option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label
                  htmlFor="comentario"
                  className="block text-sm font-medium mb-2"
                >
                  Comentário do Cliente
                </label>
              </div>
              <textarea
                name="comentario"
                id="comentario"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                value={pedido.comentario || ""}
                onChange={atualizarEstado}
                rows={3}
                placeholder="Deixe um comentário sobre o pedido"
                required
              />
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="py-2 px-6 gap-x-2 text-sm font-medium rounded border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 cursor-pointer"
                onClick={() => setEtapa(1)}
              >
                Voltar
              </button>
              <button
                type="submit"
                className="rounded bg-blue-600 hover:bg-blue-700 text-white font-bold w-full py-2 flex justify-center cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Oval
                    visible={true}
                    width="24"
                    height="24"
                    strokeWidth="5"
                    color="#1B2F4F"
                    secondaryColor="#AFC3E3"
                    ariaLabel="oval-loading"
                  />
                ) : (
                  <span>Finalizar</span>
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
export default FormPedido;
