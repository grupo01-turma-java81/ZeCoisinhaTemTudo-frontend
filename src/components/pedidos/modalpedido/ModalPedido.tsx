import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";
import "./ModalPedido.css";
import FormPedido from "../formpedido/FormPedido";

interface ModalPedidoProps {
  idPedido?: string;
  open: boolean;
  onClose: () => void;
}

function ModalPedido({ idPedido, open, onClose }: ModalPedidoProps) {
  return (
    <Popup open={open} modal onClose={onClose}>
      <FormPedido id={idPedido} />
    </Popup>
  );
}

export default ModalPedido;
