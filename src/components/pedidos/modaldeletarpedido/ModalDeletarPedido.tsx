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
    <Popup
      open={open}
      modal
      onClose={onClose}
      contentStyle={{
        maxWidth: "22rem",
        width: "100%",
        borderRadius: "1rem",
        padding: 0,
        overflow: "visible",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 left-4 text-2xl text-gray-400 hover:text-gray-700 font-bold z-10 cursor-pointer"
        aria-label="Fechar"
        type="button"
      >
        ×
      </button>
      <div className="flex flex-col items-center p-6 bg-white rounded-xl relative min-h-[20rem]">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 mt-2">
          <svg
            className="w-7 h-7 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="text-lg font-bold text-center mb-2">
          Deletar pedido{" "}
          <span className="text-green-600">
            #{id.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="w-full border-b border-gray-200 my-3"></div>

        <div className="text-center text-gray-600 mb-6 px-2">
          Esta ação é{" "}
          <span className="font-semibold text-red-500">permanente</span> e não
          poderá ser desfeita.
          <br />
          Tem certeza que deseja excluir este pedido?
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            className="w-full py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center cursor-pointer"
            onClick={deletarPedido}
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
              "Deletar"
            )}
          </button>
          <button
            className="w-full py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold cursor-pointer"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default ModalDeletarPedido;
