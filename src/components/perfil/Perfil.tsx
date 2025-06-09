import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";
import ModalPerfil from "./modalperfil/ModalPerfil";
import type Usuario from "../../models/Usuario";
import { buscar } from "../../services/Service";
import imagem1 from "../../assets/imagem1.svg";
import imagem2 from "../../assets/imagem2.svg";
import imagem3 from "../../assets/imagem3.svg";

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
  };

  const abrirModal = () => {
    setModalAberta(true);
  };

  const atualizarUsuario = (novoUsuario: Usuario) => {
    setUsuarioAtual(novoUsuario);
  };

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
      <div className="w-full min-h-screen bg-gray-100 px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <img
              src={usuarioAtual.foto}
              alt="Foto de Perfil"
              className="w-32 h-32 rounded-full object-cover mb-2"
            />
            <button
              onClick={logout}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sair
            </button>
          </div>

          <div className="flex flex-col w-full md:w-3/4 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                  {usuarioAtual.nome}
                </h2>
                <button
                  onClick={abrirModal}
                  className="text-blue-600 hover:underline text-sm cursor-pointer"
                >
                  Editar perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-9 rounded-xl shadow-md">
            <img
              src={imagem1}
              alt="Imagem 1"
              className="w-36 h-36 mb-4 mx-auto block"
            />
            <h3 className="text-lg font-bold mb-3 text-center">
              Melhore suas vendas
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Responda rápido aos clientes (ideal até 15 minutos)</li>
              <li>Ofereça frete grátis acima de um valor</li>
              <li>Crie kits de produtos para aumentar o ticket médio</li>
              <li>Insira boas fotos, títulos e descrições</li>
              <li>Desative casos avaliados e responda os feedbacks</li>
            </ul>
          </div>

          <div className="bg-white p-9 rounded-xl shadow-md">
            <img
              src={imagem2}
              alt="Imagem 2"
              className="w-36 h-36 mb-4 mx-auto block"
            />
            <h3 className="text-lg font-bold mb-3 text-center">
              Campanhas inteligentes
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Volta às compras: cupom para clientes inativos</li>
              <li>Compre 2, leve 3: ideal para produtos de giro rápido</li>
              <li>Desconto exclusivo para novos clientes</li>
              <li>Análise dos motivos de não compra</li>
              <li>Replanejamento de 24h: promoções com urgência</li>
              <li>
                Avaliação premiada: incentivo para novas reviews com fotos
              </li>
            </ul>
          </div>

          <div className="bg-white p-9 rounded-xl shadow-md">
            <img
              src={imagem3}
              alt="Imagem 3"
              className="w-36 h-36 mb-4 mx-auto block"
            />
            <h3 className="text-lg font-bold mb-3 text-center">
              Use o CRM ao seu favor
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Programe mensagens automáticas e respostas rápidas</li>
              <li>Use filtros para identificar clientes inativos ou fiéis</li>
              <li>
                Crie campanhas segmentadas com base no histórico de compra
              </li>
              <li>Campanhas em massa: emails, mensagens, conversão</li>
              <li>Integre com redes sociais e automações pela plataforma</li>
            </ul>
          </div>
        </div>

        <ModalPerfil open={modalAberta} onClose={() => setModalAberta(false)} />
      </div>
    </>
  );
}

export default Perfil;
