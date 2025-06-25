import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalPerfil.css";
import FormPerfil from "../formperfil/FormPerfil";

interface ModalPerfilProps {
  open: boolean;
  onClose: () => void;
}

function ModalPerfil({ open, onClose }: ModalPerfilProps) {
  return (
    <Popup open={open} modal onClose={onClose}>
      <FormPerfil onClose={onClose} />
    </Popup>
  );
}

export default ModalPerfil;
