import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { deletar, buscar } from "../../../services/Service";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Cliente from "../../../models/Cliente";

interface DeletarClientesProps {
  open: boolean;
  cpf: string;
  onClose: () => void;
  onAtualizar: () => void;
}

function DeletarClientes({ open, cpf, onClose, onAtualizar }: DeletarClientesProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cliente, setCliente] = useState<Cliente>({} as Cliente);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorCpf(cpf: string) {
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

  useEffect(() => {
    if (open && cpf) {
      buscarPorCpf(cpf);
    }
    // eslint-disable-next-line
  }, [open, cpf]);

  async function deletarCliente() {
    setIsLoading(true);

    try {
      await deletar(`/clientes/${cpf}`, {
        headers: { Authorization: token },
      });

      ToastAlerta("Cliente apagado com sucesso", "info");
      onAtualizar();
      onClose();
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar o cliente.", "erro");
      }
    }

    setIsLoading(false);
  }

  return (
    <Popup open={open} modal onClose={onClose}>
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">
          Deseja realmente deletar este cliente?
        </h2>
        <div className="mb-4 text-center">
          <div className="font-semibold">{cliente.nome}</div>
          <div className="text-gray-500">{cliente.cpf}</div>
        </div>
        <div className="flex gap-4 mt-3">
          <button
            className="px-4 py-2 rounded bg-red-500 text-white cursor-pointer"
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
          <button
            className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
            onClick={onClose}
            disabled={isLoading}
          >
            Não
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default DeletarClientes;