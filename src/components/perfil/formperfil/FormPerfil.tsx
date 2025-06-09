import { useState, useContext, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import type Usuario from "../../../models/Usuario";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface FormPerfilProps {
    onClose: () => void;
}

function FormPerfil({ onClose }: FormPerfilProps) {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usuarioPerfil, setUsuarioPerfil] = useState<Usuario>({ ...usuario });
  const [novaSenha, setNovaSenha] = useState<string>("");

  useEffect(() => {
    async function buscarUsuarioAtualizado() {
      try {
        await buscar(`/usuarios/${usuario.id}`, setUsuarioPerfil, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        }
      }
    }
    if (token) {
      buscarUsuarioAtualizado();
    } else {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token, usuario.id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioPerfil({
      ...usuarioPerfil,
      [e.target.name]: e.target.value,
    });
  }

  async function atualizarPerfil(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const dadosAtualizados = {
      ...usuarioPerfil,
      ...(novaSenha ? { senha: novaSenha } : {}),
    };

    try {
      await atualizar(`/usuarios/atualizar`, dadosAtualizados, setUsuarioPerfil, {
        headers: {
          Authorization: token,
        },
      });
      await buscar(`/usuarios/${usuario.id}`, setUsuarioPerfil, {
        headers: { Authorization: token },
      });
      ToastAlerta("Perfil atualizado com sucesso", "sucesso");
      onClose();
      setNovaSenha("");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao atualizar o perfil", "erro");
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">Editar Perfil</h1>
      <form className="flex flex-col w-1/2 gap-4" onSubmit={atualizarPerfil}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={usuarioPerfil.nome || ""}
            onChange={atualizarEstado}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="usuario">E-mail</label>
          <input
            type="email"
            name="usuario"
            className="border-2 border-slate-700 rounded p-2 bg-gray-100 cursor-not-allowed"
            value={usuarioPerfil.usuario || ""}
            readOnly
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senha">Nova Senha</label>
          <input
            type="password"
            name="senha"
            className="border-2 border-slate-700 rounded p-2"
            value={novaSenha}
            onChange={e => setNovaSenha(e.target.value)}
            placeholder="Digite uma nova senha (opcional)"
            minLength={8}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Foto (URL)</label>
          <input
            type="text"
            name="foto"
            className="border-2 border-slate-700 rounded p-2"
            value={usuarioPerfil.foto || ""}
            onChange={atualizarEstado}
            placeholder="Link da sua foto (opcional)"
          />
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-[#1a3052] hover:bg-[#232e3f]
                               text-white font-bold w-full py-2 flex justify-center mt-3 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>ATUALIZAR</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPerfil;