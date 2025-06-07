import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";
import "./ModalPedido.css";
import FormPedido from "../formpedido/FormPedido";

function ModalPedido() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
            Novo Pedido
          </button>
        }
        modal
      >
        <FormPedido />
      </Popup>
    </>
  );
}

export default ModalPedido;
