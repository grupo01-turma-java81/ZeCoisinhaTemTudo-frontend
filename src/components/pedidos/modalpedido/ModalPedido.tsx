import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";
import "./ModalPostagem.css";
import FormPedido from "../formpedido/FormPedido";

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
            Nova Postagem
          </button>
        }
        modal
      >
        <FormPedido />
      </Popup>
    </>
  );
}

export default ModalPostagem;
