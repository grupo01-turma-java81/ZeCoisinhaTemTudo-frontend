import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import logoZe from "../../assets/cadastro/logo_ze.webp";

function NavBar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "sucesso");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <nav className="flex items-center justify-between bg-[#fafafa] px-10 pl-6 h-16 border-b border-[#e0e0e0] font-inherit">
        <Link to="/home" className="flex items-center">
          <img
            src={logoZe}
            alt="Logo do ZéCoisinhaTemTudo"
            width="53"
            height="53"
            className="object-contain mb-2"
          />
          <div className="flex flex-col leading-tight">
            <span
              className="text-[1.15rem] font-bold"
              style={{ color: "#e6b1b1" }}
            >
              ZéCoisinha
            </span>
            <span
              className="text-[1.15rem] font-bold text-center"
              style={{ color: "#7bb3c8", marginTop: "-0.3rem" }}
            >
              TemTudo
            </span>
          </div>
        </Link>
        <ul className="flex items-center gap-7 text-[16px]">
          {["home", "pedidos", "clientes", "oportunidades"].map((item) => (
            <li key={item}>
              <NavLink
                to={`/${item}`}
                className={({ isActive }) =>
                  `cursor-pointer ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="" onClick={logout}>
              Sair
            </Link>
          </li>
        </ul>
        <div className="w-10 h-10 rounded-full bg-[#ede7f6] flex items-center justify-center">
          <Link to="/perfil">
            <img
              src={usuario.foto}
              alt="Foto de Perfil"
              className="rounded-4xl"
              width="30"
              height="30"
            />
          </Link>
        </div>
      </nav>
    );
  }

  return <>{component}</>;
}

export default NavBar;
