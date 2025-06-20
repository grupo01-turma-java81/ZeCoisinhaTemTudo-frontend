import type Pedido from "../../../models/Pedido";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalPedido.css";
import FormPedido from "../formpedido/FormPedido";

interface ModalPedidoProps {
  id?: string;
  open: boolean;
  onClose: () => void;
  onAtualizar: (pedidoAtualizado: Pedido) => void;
}

function ModalPedido({ id, open, onClose, onAtualizar }: ModalPedidoProps) {
  return (
    <Popup open={open} modal onClose={onClose}>
      <FormPedido
        id={id}
        onAtualizar={(pedidoAtualizado: Pedido) => {
          onAtualizar(pedidoAtualizado);
          onClose();
        }}
        onClose={onClose}
      />
    </Popup>
  );
}

export default ModalPedido;
