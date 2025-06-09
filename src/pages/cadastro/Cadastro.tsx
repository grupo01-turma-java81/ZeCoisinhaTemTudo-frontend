import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { cadastrarUsuario } from "../../services/Service";
import type Usuario from "../../models/Usuario";
import iconLogo from "../../assets/logo_ze.svg";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navegar = useNavigate();

  const [estaCarregando, setEstaCarregando] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

  useEffect(() => {
    if (usuario.id !== undefined) {
      navegar("/login");
    }
  }, [usuario, navegar]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setEstaCarregando(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      } catch {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }

      setEstaCarregando(false);
    } else {
      ToastAlerta("Dados do usuário inconsistentes! Verifique as informações.", "info");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

  return (
    <div className="min-h-screen flex font-sans">
      <div className="w-[38%] bg-[#1C2C4C] text-white flex flex-col items-center justify-center p-8">
        <img
          src={iconLogo}
          alt="Logo ZéCoisinha"
          className="w-64 mb-10 mt-[-2rem]"
        />
        <h2 className="text-xl mb-1 text-white">Bem-vindo ao</h2>
        <h1 className="text-3xl font-bold mb-10 text-center leading-tight">
          <span className="block text-[#F5A9B8] text-4xl">ZeCoisinha</span>
          <span className="block text-[#9ED2DC] text-xl">TemTudo</span>
        </h1>

        <p className="text-sm text-center mt-auto">
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold underline">
            Faça o login
          </Link>
        </p>
      </div>

      <div className="w-[62%] bg-gray-100 flex flex-col justify-center items-center px-32">
        <h2 className="text-3xl font-bold text-[#1C2C4C] mb-1">Crie sua conta!</h2>
        <p className="text-sm text-[#1C2C4C] mb-8">
          Preencha os campos abaixo corretamente.
        </p>

        <form onSubmit={cadastrarNovoUsuario} className="w-full space-y-4">
          <input
            type="text"
            id="nome"
            name="nome"
            value={usuario.nome}
            onChange={atualizarEstado}
            placeholder="Nome completo"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
            required
          />

          <input
            type="email"
            id="usuario"
            name="usuario"
            value={usuario.usuario}
            onChange={atualizarEstado}
            placeholder="E-mail (ex: login@gmail.com)"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
            required
          />

          <input
            type="password"
            id="senha"
            name="senha"
            value={usuario.senha}
            onChange={atualizarEstado}
            placeholder="Digite uma senha entre 8 e 16 caracteres"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
            required
          />

          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            placeholder="Confirme sua senha"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
            required
          />

          <input
            type="text"
            id="foto"
            name="foto"
            value={usuario.foto}
            onChange={atualizarEstado}
            placeholder="Link da sua foto (opcional)"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-200 text-sm focus:outline-none"
          />

          <button
            type="submit"
            disabled={estaCarregando}
            className="w-full bg-[#1C2C4C] text-white py-2 font-bold rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {estaCarregando ?
              <Oval
                visible={true}
                width="24"
                height="24"
                strokeWidth="5"
                color="#1B2F4F"
                secondaryColor="#AFC3E3"
                ariaLabel="oval-loading" />
              : <span>Cadastrar</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;