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
      id: usuarioPerfil.id,
      nome: usuarioPerfil.nome,
      usuario: usuarioPerfil.usuario,
      foto: usuarioPerfil.foto,
      ...(novaSenha ? { senha: novaSenha } : {}),
    };

    try {
      await atualizar(
        `/usuarios/atualizar`,
        dadosAtualizados,
        setUsuarioPerfil,
        {
          headers: {
            Authorization: token,
          },
        }
      );
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
      <form
        className="flex flex-col w-full mx-auto max-w-md gap-6"
        onSubmit={atualizarPerfil}
      >
        <div>
          <label htmlFor="nome" className="block text-sm font-medium mb-2">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            required
            className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
            value={usuarioPerfil.nome || ""}
            onChange={atualizarEstado}
          />
        </div>
        <div>
          <label htmlFor="usuario" className="block text-sm font-medium mb-2">
            E-mail
          </label>
          <input
            type="email"
            name="usuario"
            className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm bg-gray-100 cursor-not-allowed"
            value={usuarioPerfil.usuario || ""}
            readOnly
            disabled
          />
        </div>
        <div>
          <label htmlFor="senha" className="block text-sm font-medium mb-2">
            Nova Senha
          </label>
          <input
            type="password"
            name="senha"
            className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Digite a senha"
            minLength={8}
          />
        </div>
        <div>
          <label htmlFor="foto" className="block text-sm font-medium mb-2">
            Foto (URL)
          </label>
          <input
            type="text"
            name="foto"
            className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
            value={usuarioPerfil.foto || ""}
            onChange={atualizarEstado}
            placeholder="Link da sua foto (opcional)"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 hover:bg-blue-700 text-white font-bold w-full py-2 flex justify-center mt-3 cursor-pointer"
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
            <span>Atualizar</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPerfil;
