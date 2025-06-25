import { useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import type Pedido from "../../models/Pedido";
import { useNavigate } from "react-router-dom";
import "../home/Home.css";
import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";
import profile from "../../assets/home/profile.webp";
import creative from "../../assets/home/bulb.webp";
import homeMainImg from "../../assets/home/homeMainImg.webp";
import mascote from "../../assets/home/mascote.png";

function Home() {
  const [pedidosVisiveis, setPedidosVisiveis] = useState(5);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = usuario.token || "";
  const navigate = useNavigate();

  const frases = [
    "Em home você encontra oportunidades exclusivas!",
    "Em oportunidades ,faça contato direto com seu cliente! ",
    "Gerencie seus pedidos e clientes!",
  ];
  const [fraseIndex, setFraseIndex] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    buscar(
      "/pedidos",
      (data: Pedido[]) => {
        setPedidos(data.filter((pedido) => pedido.positivo === true));
      },
      {
        headers: {
          Authorization: token,
        },
      }
    ).catch(() => {});
  }, [token, navigate]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    setPedidosVisiveis(5);
  }, [pedidos.length]);

  if (!token) return null;

  return (
    <div className="font-montserrat bg-white min-h-screen relative">
      <div className="flex justify-between items-center px-24 pt-16 pb-12 bg-white">
        <div>
          <h1 className="text-8xl text-[#223047] font-bold mb-6 tracking-wide font-montserrat drop-shadow-lg">
            BEM VINDO!
          </h1>
          <p className="text-3xl max-w-3xl leading-snug font-semibold font-montserrat mt-4">
            <span className="text-[#2a5bd7] font-bold">Conecte-se</span> melhor
            com seus clientes e{" "}
            <span className="text-[#2a5bd7] font-bold">venda</span> mais todos
            os dias.
          </p>
        </div>
        <img
          src={homeMainImg}
          alt="Ilustração de vendas"
          className="w-[800px] h-auto mr-30"
        />
      </div>

      <div className="flex justify-center gap-30 bg-[#d7e1f2] py-4">
        <div
          className="text-center cursor-pointer"
          onClick={() => navigate("/perfil")}
        >
          <div className="bg-[#6c7a93] shadow-lg rounded-lg w-15 h-15 flex items-center justify-center mx-auto hover:scale-107 transition-transform duration-200">
            <img src={profile} alt="Dicas" width={40} height={40} />
          </div>
          <p className="mt-2 text-[#223047] font-semibold font-montserrat text-lg">
            Perfil
          </p>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => navigate("/oportunidades")}
        >
          <div className="bg-[#6c7a93] shadow-lg rounded-lg w-15 h-15 flex items-center justify-center mx-auto hover:scale-107 transition-transform duration-200">
            <img src={creative} alt="Alertas" width={40} height={40} />
          </div>
          <p className="mt-2 text-[#223047] font-semibold font-montserrat text-lg">
            Oportunidades
          </p>
        </div>
      </div>

      <div className="px-16 py-8">
        <div className="border-t border-[#bfc8d6] mb-6" />
        <h2 className="text-3xl text-[#223047] mb-4 font-bold tracking-wide font-montserrat ml-8 mt-8">
          Pedidos com Avaliações Positivas
        </h2>
        <div className="px-8 py-6 bg-[#dddddd] rounded-xl shadow-md mx-4 min-h-[350px]">
          {pedidos.length === 0 ? (
            <div className="flex items-center justify-center pt-20">
              <Oval
                visible={true}
                width="60"
                height="60"
                color="#1B2F4F"
                secondaryColor="#AFC3E3"
                ariaLabel="oval-loading"
              />
            </div>
          ) : (
            <table className="w-full border-collapse font-montserrat">
              <thead>
                <tr className="border-b border-[#bfc8d6]">
                  <th className="px-5 py-3 text-[#6c7a93] text-xl font-bold text-left">
                    Pedido
                  </th>
                  <th className="px-5 py-3 text-[#6c7a93] text-xl font-bold text-left">
                    Cliente
                  </th>
                  <th className="px-5 py-3 text-[#6c7a93] text-xl font-bold text-left">
                    Status
                  </th>
                  <th className="px-5 py-3 text-[#6c7a93] text-xl font-bold text-left">
                    Valor
                  </th>
                  <th className="px-5 py-3 text-[#6c7a93] text-xl font-bold text-left">
                    Data
                  </th>
                  <th className="px-5 py-3 text-[#6c7a93] text-xl font-bold text-left">
                    Número
                  </th>
                </tr>
              </thead>
              <tbody>
                {pedidos.slice(0, pedidosVisiveis).map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-[#e7e7e7] transition">
                    <td className="px-5 py-3">#{pedido.id}</td>
                    <td className="px-5 py-3">
                      {pedido.cliente?.nome || "Cliente não informado"}
                    </td>
                    <td className="px-5 py-3">{pedido.statusEntrega}</td>
                    <td className="px-5 py-3">
                      R$ {pedido.valorTotal.toFixed(2)}
                    </td>
                    <td className="px-5 py-3">{pedido.dataPedido}</td>
                    <td className="px-5 py-3">{pedido.cliente?.telefone}</td>
                  </tr>
                ))}
              </tbody>
              {pedidosVisiveis < pedidos.length && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    <div className="w-full border-t border-[#bfc8d6] mb-3" />
                    <span
                      className="text-blue-500 font-semibold cursor-pointer hover:underline"
                      onClick={() => setPedidosVisiveis((prev) => prev + 5)}
                    >
                      Mostrar mais pedidos
                    </span>
                  </td>
                </tr>
              )}
            </table>
          )}
        </div>
      </div>

      <motion.div
        className="fixed bottom-5 right-5 z-50 flex items-end gap-2"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="bg-white shadow-lg rounded-xl px-4 py-2 text-sm text-[#223047] font-semibold border border-[#ccc] max-w-xs">
          {frases[fraseIndex]}
        </div>

        <img
          src={mascote}
          alt="Mascote Zé Coisinha"
          className="w-20 h-auto drop-shadow-md"
        />
      </motion.div>
    </div>
  );
}

export default Home;
