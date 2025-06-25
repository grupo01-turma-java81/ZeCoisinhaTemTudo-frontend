import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalCliente.css";
import FormClientes from "../formclientes/FormClientes";
import type Cliente from "../../../models/Cliente";
import LogoZe from "../../../assets/cadastro/logo_ze.webp";

interface ModalClienteProps {
  id?: number;
  open: boolean;
  onClose: () => void;
  onAtualizar: (clienteAtualizado: Cliente) => void;
}

function ModalCliente({ id, open, onClose, onAtualizar }: ModalClienteProps) {
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
      <div className="modal-cliente-container">
        <div className="modal-cliente-logo">
          <img
            src={LogoZe}
            alt="Logo ZéCoisinha"
            className="modal-cliente-logo-img"
          />
          <span className="modal-cliente-logo-text">ZéCoisinha</span>
        </div>
        <div className="modal-cliente-content">
          <FormClientes
            id={id}
            onClienteCadastrado={(clienteAtualizado) => {
              onAtualizar(clienteAtualizado);
              onClose();
            }}
          />
        </div>
      </div>
    </Popup>
  );
}

export default ModalCliente;
