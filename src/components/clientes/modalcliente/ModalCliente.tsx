import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalCliente.css";
import FormClientes from "../formclientes/FormClientes";

interface ModalClienteProps {
  cpf?: string;
  open: boolean;
  onClose: () => void;
  onAtualizar: () => void;
}

function ModalCliente({ cpf, open, onClose, onAtualizar }: ModalClienteProps) {
  return (
    <Popup
      open={open}
      modal
      onClose={onClose}
      className="reactjs-popup-overlay"
    >
      <button
        onClick={onClose}
        className="absolute top-3 left-4 text-2xl text-gray-400 hover:text-gray-700 font-bold z-10 cursor-pointer"
        aria-label="Fechar"
        type="button"
      >
        ×
      </button>
      <FormClientes
        cpf={cpf}
        onClienteCadastrado={() => {
          onAtualizar();
          onClose();
        }}
      />
    </Popup>
  );
}

export default ModalCliente;
