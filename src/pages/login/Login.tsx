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
  }, [usuario]);

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
    <div className="min-h-screen flex">
      {/* Lado esquerdo */}
      <div className="w-1/2 bg-[#1C2C4C] text-white flex flex-col items-center justify-center p-8">
        <img src={iconLogo} alt="Logo ZéCoisinha" className="w-40 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Bem-vindo ao</h2>
        <h1 className="text-3xl font-bold">ZéCoisinha</h1>
        <p className="mt-10 text-sm">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="font-semibold underline">
            Cadastre-se
          </Link>
        </p>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center px-20">
        <h2 className="text-3xl font-bold text-[#1C2C4C] mb-2">LOGIN</h2>
        <p className="text-sm text-[#1C2C4C] mb-6">
          Preencha os campos abaixo corretamente
        </p>

        <form onSubmit={login}>
          <div className="mb-4">
            <input
              id="usuario"
              name="usuario"
              type="text"
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
              placeholder="user ou e-mail"
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <input
              id="senha"
              name="senha"
              type="password"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
              placeholder="senha"
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 font-bold rounded hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;