import { useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import type Pedido from "../../models/Pedido";
import { useNavigate } from "react-router-dom";
import "../home/Home.css";

function Home() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = usuario.token || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    buscar(
      "/pedidos",
      (data: Pedido[]) => {
        setPedidos(data.filter((pedido) => pedido.positivo === true));
        setLoading(false);
      },
      {
        headers: {
          Authorization: token,
        },
      }
    ).catch(() => {
      setLoading(false);
    });
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="font-montserrat bg-white min-h-screen">
      <div className="flex justify-between items-center px-16 pt-12 pb-8 bg-white">
        <div>
          <h1 className="text-5xl text-[#223047] font-bold mb-4 tracking-wide font-montserrat">
            BEM VINDO!
          </h1>
          <p className="text-2xl max-w-xl leading-snug font-semibold font-montserrat">
            <span className="text-[#2a5bd7] font-bold">Conecte-se</span> melhor
            com seus clientes e{" "}
            <span className="text-[#2a5bd7] font-bold">venda</span> mais todos
            os dias.
          </p>
        </div>
        <img
          src="https://i.postimg.cc/GtXQwkfb/Test-Creative-removebg-preview.png"
          alt="Ilustração de vendas"
          className="max-w-[400px] h-auto"
        />
      </div>

      <div className="flex justify-center gap-16 bg-[#AFC3E3] py-6">
        <div className="text-center">
          <div className="bg-[#bfcbe6] rounded-full w-12 h-12 flex items-center justify-center mx-auto">
            <img
              src="https://i.postimg.cc/mkKPHkzQ/Test-Creative-Photoroom-1.png"
              alt="Dicas"
              width={28}
            />
          </div>
          <p className="mt-2 text-[#223047] font-semibold font-montserrat">
            dicas
          </p>
        </div>
        <div className="text-center">
          <div className="bg-[#bfcbe6] rounded-full w-12 h-12 flex items-center justify-center mx-auto">
            <img
              src="https://i.postimg.cc/KzqkmJmp/Test-Creative-Photoroom.png"
              alt="Alertas"
              width={28}
            />
          </div>
          <p className="mt-2 text-[#223047] font-semibold font-montserrat">
            alertas
          </p>
        </div>
      </div>

      <div className="px-16 py-8">
        <h2 className="text-2xl text-[#223047] mb-4 font-bold tracking-wide font-montserrat">
          Pedidos com Avaliações Positivas
        </h2>
        <div className="bg-[#D9D9D9] rounded-xl p-10 min-h-[400px] shadow-md flex flex-col justify-start">
          {loading ? (
            <p className="text-[#D9D9D9] text-center font-montserrat">
              Carregando...
            </p>
          ) : (
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden font-montserrat">
              <thead>
                <tr className="bg-[#D9D9D9] text-left">
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Status</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Número</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-b border-[#D9D9D9]">
                    <td>#{pedido.id}</td>
                    <td>{pedido.cliente?.nome || "Cliente não informado"}</td>
                    <td>{pedido.statusEntrega}</td>
                    <td>R$ {pedido.valorTotal.toFixed(2)}</td>
                    <td>{new Date(pedido.dataPedido).toLocaleDateString()}</td>
                    <td>{pedido.cliente?.telefone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
