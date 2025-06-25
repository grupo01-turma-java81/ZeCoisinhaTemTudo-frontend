import React, {
  useState,
  useEffect,
  useContext,
  type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import type Cliente from "../../../models/Cliente";
import { buscar, cadastrar, atualizar } from "../../../services/Service";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import { Oval } from "react-loader-spinner";

interface FormClientesProps {
  id?: number;
  onClienteCadastrado?: (cliente: Cliente) => void;
}

function FormClientes({ id, onClienteCadastrado }: FormClientesProps) {
  const [cliente, setCliente] = useState<Cliente>({} as Cliente);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id) {
      buscarClientePorId(id);
    } else {
      setCliente({} as Cliente);
    }
  }, [id]);

  async function buscarClientePorId(id: number) {
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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const clienteParaEnviar: any = {
      id: cliente.id,
      cpf: cliente.cpf,
      nome: cliente.nome,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
    };

    if (id && cliente.dataCadastro) {
      clienteParaEnviar.dataCadastro = cliente.dataCadastro;
    }

    if (id) {
      try {
        await atualizar(`/clientes`, clienteParaEnviar, setCliente, {
          headers: { Authorization: token },
        });
        toast.success("Cliente atualizado com sucesso!");
        if (onClienteCadastrado) onClienteCadastrado(clienteParaEnviar);
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          toast.error("Erro ao atualizar cliente.");
        }
      }
    } else {
      try {
        await cadastrar(
          "/clientes",
          clienteParaEnviar,
          (novoCliente: Cliente) => {
            if (onClienteCadastrado) onClienteCadastrado(novoCliente);
          },
          { headers: { Authorization: token } }
        );
        setCliente({} as Cliente);
        toast.success("Cliente cadastrado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          toast.error("Erro ao cadastrar cliente.");
        }
      }
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto font-sans">
      <h2 className="text-4xl text-center my-8">
        {id ? "Editar Cliente" : "Cadastrar Cliente"}
      </h2>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 font-sans">CPF</label>
        <input
          type="text"
          name="cpf"
          value={cliente.cpf || ""}
          onChange={atualizarEstado}
          className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
          required
          minLength={10}
          maxLength={11}
          placeholder="Insira apenas números"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 font-sans">Nome</label>
        <input
          type="text"
          name="nome"
          value={cliente.nome || ""}
          onChange={atualizarEstado}
          className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
          required
          placeholder="Nome do cliente"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 font-sans">
          Telefone
        </label>
        <input
          type="text"
          name="telefone"
          value={cliente.telefone || ""}
          onChange={atualizarEstado}
          className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
          required
          minLength={11}
          maxLength={14}
          placeholder="Insira o DDD"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 font-sans">
          Endereço
        </label>
        <input
          type="text"
          name="endereco"
          value={cliente.endereco || ""}
          onChange={atualizarEstado}
          className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
          required
          placeholder="Logradouro e número"
        />
      </div>
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
    </form>
  );
}

export default FormClientes;
