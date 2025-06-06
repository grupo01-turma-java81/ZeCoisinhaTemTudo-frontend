import { useState, useContext, useEffect, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import type Cliente from "../../../models/Cliente";
import type Pedido from "../../../models/Pedido";

function FormPedido() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [cliente, setCliente] = useState<Cliente>({} as Cliente);
  const [pedido, setPedido] = useState<Pedido>({} as Pedido);

  const { id } = useParams<{ id: string }>();
  const { cpf } = useParams<{ cpf: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPedidoPorId(cpf: string) {
    try {
      await buscar(`/pedidos/${cpf}`, setPedido, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarClientePorCpf(cpf: string) {
    try {
      await buscar(`/clientes/${cpf}`, setCliente, {
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
  }, [token]);

  useEffect(() => {
    buscarClientes();

    if (cpf !== undefined) {
      buscarPedidoPorId(cpf);
    }
  }, [cpf]);

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

        alert("Pedido atualizada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar o Pedido");
        }
      }
    } else {
      try {
        await cadastrar(`/pedidos`, pedido, setPedido, {
          headers: {
            Authorization: token,
          },
        });

        alert("Pedido cadastrado com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar o Pedido");
        }
      }
    }

    setIsLoading(false);
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
          <input
            type="text"
            placeholder="Ex: Em andamento"
            name="statusEntrega"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={pedido.statusEntrega}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="valorTotal">Preço do pedido</label>
          <input
            type="text"
            placeholder="Ex: 200"
            name="valorTotal"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={pedido.valorTotal}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Cliente satisfeito?</p>
          <select
            name="Positivo"
            id="Positivo"
            className="border p-2 border-slate-800 rounded"
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
            onChange={(e) => buscarClientePorCpf(e.currentTarget.value)}
          >
            <option value="" selected disabled>
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
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoCliente}
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPedido;
