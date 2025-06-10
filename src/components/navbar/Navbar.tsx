import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

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
        <div className="flex items-center">
          <img
            src="https://i.postimg.cc/VN4kLqSp/Login-1-1.png"
            alt="Logo do ZéCoisinhaTemTudo"
            width="48"
            height="48"
          />
        </div>
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
