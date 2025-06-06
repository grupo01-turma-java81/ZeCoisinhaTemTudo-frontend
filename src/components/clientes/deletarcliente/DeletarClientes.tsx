import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Cliente from "../../../models/Cliente";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

function DeletarClientes() {
  const navigate = useNavigate();
  const { cpf } = useParams<{ cpf: string }>();

  const [cliente, setCliente] = useState<Cliente>({} as Cliente);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarPorCpf(cpf: string) {
    try {
      await buscar(`/clientes/${cpf}`, setCliente, {});
    } catch {
      toast.error("Erro ao buscar cliente.");
    }
  }

  useEffect(() => {
    if (cpf !== undefined) {
      buscarPorCpf(cpf);
    }
  }, [cpf]);

  async function deletarCliente() {
    setIsLoading(true);

    try {
      await deletar(`/clientes/${cpf}`, {});
      toast.success("Cliente apagado com sucesso!");
    } catch {
      toast.error("Erro ao deletar o cliente.");
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/clientes");
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar cliente</h1>
      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar o cliente a seguir?
      </p>
      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
          Cliente
        </header>
        <p className='p-8 text-3xl bg-slate-200 h-full'>{cliente.nome}</p>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 cursor-pointer"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center cursor-pointer"
            onClick={deletarCliente}
            disabled={isLoading}
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
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarClientes;