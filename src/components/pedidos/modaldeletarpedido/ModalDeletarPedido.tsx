import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { deletar } from "../../../services/Service";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ModalDeletarPedidoProps {
  id: number;
  open: boolean;
  onClose: () => void;
  onAtualizar: (id: number) => void;
}

function ModalDeletarPedido({
  id,
  open,
  onClose,
  onAtualizar,
}: ModalDeletarPedidoProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function deletarPedido() {
    setIsLoading(true);

    try {
      await deletar(`/pedidos/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Pedido apagado com sucesso", "info");
      onAtualizar(Number(id));
      onClose();
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar o pedido.", "erro");
      }
    }

    setIsLoading(false);
  }

  return (
    <Popup open={open} modal onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-3 left-4 text-2xl text-gray-400 hover:text-gray-700 font-bold z-10 cursor-pointer"
        aria-label="Fechar"
        type="button"
      >
        ×
      </button>
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">
          Deseja realmente deletar este pedido?
        </h2>
        <div className="flex gap-4 mt-3">
          <button
            className="px-4 py-2 rounded bg-red-500 text-white cursor-pointer"
            onClick={deletarPedido}
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
          >
            Não
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default ModalDeletarPedido;
