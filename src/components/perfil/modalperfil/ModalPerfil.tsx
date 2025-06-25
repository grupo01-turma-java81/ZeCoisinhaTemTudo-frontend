import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalPerfil.css";
import FormPerfil from "../formperfil/FormPerfil";
import LogoZe from "../../../assets/cadastro/logo_ze.webp";

interface ModalPerfilProps {
  open: boolean;
  onClose: () => void;
}

function ModalPerfil({ open, onClose }: ModalPerfilProps) {
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
      <div className="modal-perfil-container">
        <div className="modal-perfil-logo">
          <img
            src={LogoZe}
            alt="Logo ZéCoisinha"
            className="modal-perfil-logo-img"
          />
          <span className="modal-perfil-logo-text">ZéCoisinha</span>
        </div>
        <div className="modal-perfil-content">
          <FormPerfil onClose={onClose} />
        </div>
      </div>
    </Popup>
  );
}

export default ModalPerfil;
