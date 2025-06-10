import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalCliente.css";
import FormClientes from "../formclientes/FormClientes";
import type Cliente from "../../../models/Cliente";

interface ModalClienteProps {
  cpf?: string;
  open: boolean;
  onClose: () => void;
  onAtualizar: (clienteAtualizado: Cliente) => void;
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
        onClienteCadastrado={(clienteAtualizado) => {
          onAtualizar(clienteAtualizado);
          onClose();
        }}
      />
    </Popup>
  );
}

export default ModalCliente;