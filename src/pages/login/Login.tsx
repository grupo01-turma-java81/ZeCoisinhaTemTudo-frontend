import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import iconLogo from "../../assets/logo_ze.svg";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario.token]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="min-h-screen flex font-sans">
      <div className="w-[38%] bg-[#1C2C4C] text-white flex flex-col items-center justify-center p-8">
        <img
          src={iconLogo}
          alt="Logo ZéCoisinha"
          className="w-64 mb-10 mt-[-2rem]"
        />
        <h2 className="text-xl mb-1  text-white">Bem-vindo ao</h2>
        <h1 className="text-3xl font-bold mb-10 text-center leading-tight">
          <span className="block text-[#F5A9B8] text-4xl">ZeCoisinha</span>
          <span className="block text-[#9ED2DC] text-xl">TemTudo</span>
        </h1>

        <p className="text-sm text-center mt-auto">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="font-semibold underline">
            Cadastre-se
          </Link>
        </p>
      </div>

      <div className="w-[62%] bg-gray-100 flex flex-col justify-center items-center px-32">
        <h2 className="text-3xl font-bold text-[#1C2C4C] mb-1">
          Faça seu login!
        </h2>
        <p className="text-sm text-[#1C2C4C] mb-8">
          Preencha os campos abaixo corretamente.
        </p>

        <form onSubmit={login} className="w-full space-y-4">
          <input
            id="usuario"
            name="usuario"
            type="text"
            value={usuarioLogin.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            placeholder="E-mail ( ex: login@gmail.com )"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
            required
          />

          <input
            id="senha"
            name="senha"
            type="password"
            value={usuarioLogin.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            placeholder="Digite sua senha"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#1C2C4C] text-white py-2 font-bold rounded hover:bg-gray-800 transition"
          >
            Entre!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
