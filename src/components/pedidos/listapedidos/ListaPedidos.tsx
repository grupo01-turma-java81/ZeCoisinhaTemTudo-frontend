import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import type Pedido from "../../../models/Pedido";
import CardPedido from "../cardpedidos/CardPedidos";
import ModalPedido from "../modalpedido/ModalPedido";

function ListaPedidos() {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<string | undefined>();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  function abrirModalNovo() {
    setIdSelecionado(undefined);
    setModalAberto(true);
  }

  function abrirModalEditar(id: string) {
    setIdSelecionado(id);
    setModalAberto(true);
  }

  async function buscarPedidos() {
    try {
      await buscar("/pedidos", setPedidos, {
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
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarPedidos();
  }, [pedidos.length]);

  return (
    <>
      {pedidos.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex flex-col w-full flex-1 bg-gray-200 px-4 md:px-10 min-h-screen">
        <div className="flex items-center justify-between gap-x-4 w-full max-w-7xl mx-auto mt-8 mb-6">
          <div className="bg-white rounded-full px-8 py-2 max-w-4xl w-full">
            <span className="text-2xl font-bold text-[#E09B96] font-montserrat">
              Pedidos
            </span>
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold rounded-full px-8 py-2 text-lg shadow hover:bg-blue-700 transition"
            onClick={abrirModalNovo}
          >
            <span className="text-2xl">+</span> Criar pedido
          </button>
        </div>
        <div className="w-full max-w-7xl mx-auto my-4">
          {pedidos.map((pedido) => (
            <CardPedido
              key={pedido.id}
              pedido={pedido}
              onEditar={abrirModalEditar}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListaPedidos;
