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
      contentStyle={{
        borderRadius: "1rem",
        padding: "2rem 2rem 2.5rem 2rem",
        background: "#fff",
        maxWidth: "650px",
        width: "95vw",
        margin: "0 auto",
        boxShadow: "0 4px 32px 0 rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
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