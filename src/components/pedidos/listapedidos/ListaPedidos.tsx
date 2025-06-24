import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { Oval } from "react-loader-spinner";
import type Pedido from "../../../models/Pedido";
import CardPedido from "../cardpedidos/CardPedidos";
import ModalPedido from "../modalpedido/ModalPedido";
import DashboardPedidos from "../dashboardpedido/DashboardPedido";
import bgSquares from "../../../assets/bg-squares.webp";

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
  }, [token, navigate]);

  useEffect(() => {
    buscarPedidos();
  }, []);

  function atualizarPedidoNaLista(pedidoOuId: Pedido | string | number) {
    if (typeof pedidoOuId === "string" || typeof pedidoOuId === "number") {
      setPedidos((pedidos) =>
        pedidos.filter((p) => p.id !== Number(pedidoOuId))
      );
    } else if (pedidoOuId) {
      setPedidos((pedidos) => {
        const existe = pedidos.some((p) => p.id === pedidoOuId.id);
        if (existe) {
          return pedidos.map((p) => (p.id === pedidoOuId.id ? pedidoOuId : p));
        } else {
          return [...pedidos, pedidoOuId];
        }
      });
    }
  }

  return (
    <>
      {pedidos.length === 0 ? (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-200">
          <Oval
            visible={true}
            width="60"
            height="60"
            color="#1B2F4F"
            secondaryColor="#AFC3E3"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${bgSquares})`,
            backgroundRepeat: "no-repeat",
          }}
          className="flex flex-col w-full flex-1 bg-gray-200 px-4 md:px-10 min-h-screen"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center mt-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2">
              Controle total dos seus pedidos
              <br />e indicadores em um só lugar
            </h1>
            <div className="flex items-center gap-2 mb-2 mt-4">
              <span className="bg-[#1a3052] text-white text-xs font-bold rounded px-2 py-1 mr-2 rotate-[-5deg]">
                Novo
              </span>
              <span className="text-base text-gray-700">
                Dê o primeiro passo para uma gestão mais eficiente e
                inteligente.
              </span>
            </div>
            <div className="flex flex-col items-center mt-6 mb-2">
              <button
                className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-full px-8 py-3 text-lg shadow flex items-center gap-2 cursor-pointer"
                onClick={abrirModalNovo}
              >
                <span className="text-2xl">+</span> Crie seu pedido
              </button>
            </div>
          </div>
          <DashboardPedidos pedidos={pedidos} />
          <div className="w-full max-w-7xl mx-auto mt-6 mb-4">
            {pedidos.map((pedido) => (
              <CardPedido
                key={pedido.id}
                pedido={pedido}
                onEditar={abrirModalEditar}
                onAtualizar={atualizarPedidoNaLista}
              />
            ))}
          </div>
          <ModalPedido
            open={modalAberto}
            id={idSelecionado}
            onClose={() => setModalAberto(false)}
            onAtualizar={atualizarPedidoNaLista}
          />
        </div>
      )}
    </>
  );
}

export default ListaPedidos;
