import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";
import ModalPerfil from "./modalperfil/ModalPerfil";
import type Usuario from "../../models/Usuario";
import { buscar } from "../../services/Service";

function Perfil() {
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const navigate = useNavigate();

    const [modalAberta, setModalAberta] = useState(false);
    const [usuarioAtual, setUsuarioAtual] = useState<Usuario>(usuario);

    const logout = () => {
        handleLogout();
        ToastAlerta("Usuário desconectado com sucesso!", "sucesso");
        navigate("/");
    }

    const abrirModal = () => {
        setModalAberta(true);
    }

    const atualizarUsuario = (novoUsuario: Usuario) => {
        setUsuarioAtual(novoUsuario);
    }

    async function buscarUsuario() {
        try {
            await buscar(`/usuarios/${usuario.id}`, setUsuarioAtual, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        buscarUsuario();
    }, []);

    useEffect(() => {
        if (!modalAberta) {
            buscarUsuario();
        }
    }, [modalAberta]);

    return (
        <>
            <img src={usuarioAtual.foto} alt="Foto de Perfil" />
            <p>Nome user: {usuarioAtual.nome}</p>

            <button onClick={abrirModal}>Editar</button>
            <div>
                <ModalPerfil
                    open={modalAberta}
                    onClose={() => setModalAberta(false)}
                />
            </div>

            <button onClick={logout}>Sair</button>
        </>
    )
}

export default Perfil