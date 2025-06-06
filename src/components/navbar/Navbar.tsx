import { Link, useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function NavBar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <nav className="flex items-center justify-between bg-[#fafafa] px-10 pl-6 h-16 border-b border-[#e0e0e0] font-inherit">
        <div className="flex items-center">
          <img
            src="https://i.postimg.cc/VN4kLqSp/Login-1-1.png"
            alt="Logo do ZéCoisinhaTemTudo"
            width="48"
            height="48"
          />
        </div>
        <div className="flex items-center gap-7 text-[16px]">
          <Link to="" className="text-[#374151] no-underline font-normal">
            Avaliacoes
          </Link>
          <Link to="" className="text-[#374151] no-underline font-normal">
            Home
          </Link>
          <Link to="" className="text-[#232b3b] no-underline font-bold">
            Pedidos
          </Link>
          <Link to="" className="text-[#374151] no-underline font-normal">
            Oportunidades
          </Link>
          <Link
            to=""
            onClick={logout}
            className="text-[#374151] no-underline font-normal"
          >
            Sair
          </Link>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#ede7f6] flex items-center justify-center">
          <img
            src={usuario.foto}
            alt="Foto de Perfil"
            className="rounded-4xl"
            width="28"
            height="28"
          />
        </div>
      </nav>
    );
  }

  return <>{component}</>;
}

export default NavBar;
