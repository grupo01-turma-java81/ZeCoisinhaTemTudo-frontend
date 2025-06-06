import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { cadastrarUsuario } from "../../services/Service";
import type Usuario from "../../models/Usuario";
import iconLogo from "../../assets/Icomidacadastrar (1) 1.svg";
import { Link, useNavigate } from "react-router-dom";

function Cadastro() {
  const navegar = useNavigate();

  const [estaCarregando, setEstaCarregando] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

  useEffect(() => {
    if (usuario.id !== undefined) {
      navegar("/login");
    }
  }, [usuario]);

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
        alert("Usuário cadastrado com sucesso!");
      } catch {
        alert("Erro ao cadastrar o usuário!");
      }

      setEstaCarregando(false);
    } else {
      alert("Dados do usuário inconsistentes! Verifique as informações.");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo */}
      <div className="w-1/2 bg-[#1C2C4C] text-white flex flex-col items-center justify-center p-8">
        <img src={iconLogo} alt="Logo ZéCoisinha" className="w-40 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Bem-vindo ao</h2>
        <h1 className="text-3xl font-bold">ZéCoisinha</h1>
        <p className="mt-10 text-sm">
          Já tem uma conta?{" "}
          <Link to="/login" className="underline font-semibold">
            Faça o login
          </Link>
        </p>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-20">
        <h2 className="text-3xl font-bold text-[#1C2C4C] mb-2">Crie sua conta</h2>
        <p className="text-sm text-[#1C2C4C] mb-6">
          Preencha os campos abaixo corretamente
        </p>

        <form onSubmit={cadastrarNovoUsuario} className="flex flex-col gap-4">
          <input
            type="text"
            id="nome"
            name="nome"
            value={usuario.nome}
            onChange={atualizarEstado}
            placeholder="nome completo"
            className="w-full px-4 py-2 bg-gray-200 text-sm border border-gray-300 rounded focus:outline-none"
            required
          />

          <input
            type="email"
            id="usuario"
            name="usuario"
            value={usuario.usuario}
            onChange={atualizarEstado}
            placeholder="user ou e-mail"
            className="w-full px-4 py-2 bg-gray-200 text-sm border border-gray-300 rounded focus:outline-none"
            required
          />

          <input
            type="password"
            id="senha"
            name="senha"
            value={usuario.senha}
            onChange={atualizarEstado}
            placeholder="senha"
            className="w-full px-4 py-2 bg-gray-200 text-sm border border-gray-300 rounded focus:outline-none"
            required
          />

          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            placeholder="confirmar senha"
            className="w-full px-4 py-2 bg-gray-200 text-sm border border-gray-300 rounded focus:outline-none"
            required
          />

          <input
            type="text"
            id="foto"
            name="foto"
            value={usuario.foto}
            onChange={atualizarEstado}
            placeholder="URL da sua foto (opcional)"
            className="w-full px-4 py-2 bg-gray-200 text-sm border border-gray-300 rounded focus:outline-none"
          />

          <button
            type="submit"
            className="bg-black text-white py-2 font-bold rounded hover:opacity-90 transition"
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;