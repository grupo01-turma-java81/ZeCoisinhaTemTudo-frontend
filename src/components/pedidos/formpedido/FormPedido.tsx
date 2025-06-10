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
  onAtualizar: () => void;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [cliente, setCliente] = useState<Cliente>({} as Cliente);
  const [pedido, setPedido] = useState<Pedido>({} as Pedido);

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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
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
        onAtualizar();
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
        await cadastrar(`/pedidos`, pedido, setPedido, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Pedido cadastrado com sucesso", "sucesso");
        onAtualizar();
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

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoPedido}>
        <div className="flex flex-col gap-2">
          <label htmlFor="dataPedido">Data do Pedido</label>
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            name="dataPedido"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={pedido.dataPedido}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="statusEntrega">Status da Entrega</label>
          <select
            name="statusEntrega"
            id="statusEntrega"
            required
            className="border-2 border-slate-700 rounded p-2"
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
        <div className="flex flex-col gap-2">
  <label htmlFor="valorTotal">Preço do pedido </label>
  <input
    type="text"
    placeholder="Ex: 200 (Insira apenas números) "
    name="valorTotal"
    required
    className="border-2 border-slate-700 rounded p-2"
    value={pedido.valorTotal}
    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
  />
  <span className="text-sm text-slate-500">O sistema automaticamente formata em R$. </span>
</div>
        <div className="flex flex-col gap-2">
          <p>Cliente satisfeito?</p>
          <select
            name="Positivo"
            id="Positivo"
            className="border p-2 border-slate-800 rounded"
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
        <div className="flex flex-col gap-2">
          <p>Cliente que solicitou o pedido</p>
          <select
            name="Cliente"
            id="Cliente"
            className="border p-2 border-slate-800 rounded"
            value={cliente.cpf || ""}
            onChange={(e) => buscarClientePorId(e.currentTarget.value)}
            required
          >
            <option value="" disabled>
              Selecione o Cliente
            </option>

            {clientes.map((cliente) => (
              <>
                <option value={cliente.cpf}>{cliente.nome}</option>
              </>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-[#1a3052] hover:bg-[#232e3f]
                               text-white font-bold w-full py-2 flex justify-center mt-3 cursor-pointer"
          disabled={carregandoCliente}
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
            <span>PRONTO!</span>
          )}
        </button>
      </form>
    </div>
  );
}
export default FormPedido;
