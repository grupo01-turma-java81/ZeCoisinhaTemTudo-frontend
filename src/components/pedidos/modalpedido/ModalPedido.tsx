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
      <FormPedido id={id} onAtualizar={onAtualizar} onClose={onClose} />
    </Popup>
  );
}

export default ModalPedido;
