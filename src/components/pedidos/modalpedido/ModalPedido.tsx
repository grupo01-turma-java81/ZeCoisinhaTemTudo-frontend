import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";
import "./ModalPedido.css";
import FormPedido from "../formpedido/FormPedido";

interface ModalPedidoProps {
  id?: string;
  open: boolean;
  onClose: () => void;
  onAtualizar: () => void;
}

function ModalPedido({ id, open, onClose, onAtualizar }: ModalPedidoProps) {
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
      <FormPedido id={id} onAtualizar={onAtualizar} onClose={onClose} />
    </Popup>
  );
}

export default ModalPedido;
