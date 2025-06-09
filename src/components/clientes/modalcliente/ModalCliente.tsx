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
