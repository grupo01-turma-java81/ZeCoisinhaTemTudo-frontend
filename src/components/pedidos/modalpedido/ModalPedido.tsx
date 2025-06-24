import type Pedido from "../../../models/Pedido";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalPedido.css";
import FormPedido from "../formpedido/FormPedido";
import LogoZe from "../../../assets/cadastro/logo_ze.webp";

interface ModalPedidoProps {
  id?: string;
  open: boolean;
  onClose: () => void;
  onAtualizar: (pedidoAtualizado: Pedido) => void;
}

function ModalPedido({ id, open, onClose, onAtualizar }: ModalPedidoProps) {
  return (
    <Popup
      open={open}
      modal
      onClose={onClose}
      contentStyle={{ padding: 0, borderRadius: 16 }}
      className="popup-content"
    >
      <button
        onClick={onClose}
        className="absolute top-2 left-4 text-2xl text-gray-400 hover:text-gray-700 font-bold z-10 cursor-pointer"
        aria-label="Fechar"
        type="button"
      >
        ×
      </button>
      <div className="modal-pedido-container">
        <div className="modal-pedido-logo">
          <img
            src={LogoZe}
            alt="Logo ZéCoisinha"
            className="modal-pedido-logo-img"
          />
          <span className="modal-pedido-logo-text">ZéCoisinha</span>
        </div>
        <div className="modal-pedido-content">
          <FormPedido
            id={id}
            onAtualizar={(pedidoAtualizado: Pedido) => {
              onAtualizar(pedidoAtualizado);
              onClose();
            }}
            onClose={onClose}
          />
        </div>
      </div>
    </Popup>
  );
}

export default ModalPedido;
