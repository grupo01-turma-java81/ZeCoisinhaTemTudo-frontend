import { useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import type Pedido from "../../models/Pedido";
import { useNavigate } from "react-router-dom";
import "../home/Home.css";
import { Oval } from "react-loader-spinner";

function Home() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
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
      },
      {
        headers: {
          Authorization: token,
        },
      }
    ).catch(() => {});
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="font-montserrat bg-white min-h-screen">
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
          src="https://i.postimg.cc/Qxq7rXv1/Design-sem-nome-27.png"
          alt="Ilustração de vendas"
          className="w-[800px] h-auto mr-30"
        />
      </div>

      <div className="flex justify-center gap-30 bg-[#d7e1f2] py-4">
        <div className="text-center">
          <div className="bg-[#6c7a93] shadow-lg rounded-lg w-15 h-15 flex items-center justify-center mx-auto">
            <img
              src="https://i.postimg.cc/mkKPHkzQ/Test-Creative-Photoroom-1.png"
              alt="Dicas"
              width={40}
              height={40}
            />
          </div>
          <p className="mt-2 text-[#223047] font-semibold font-montserrat text-lg">
            brainstorming
          </p>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => navigate("/oportunidades")}
        >
          <div className="bg-[#6c7a93] shadow-lg rounded-lg w-15 h-15 flex items-center justify-center mx-auto hover:scale-107 transition-transform duration-200">
            <img
              src="https://i.postimg.cc/KzqkmJmp/Test-Creative-Photoroom.png"
              alt="Alertas"
              width={40}
              height={40}
            />
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
                wrapperStyle={{}}
                wrapperClass=""
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
                {pedidos.map((pedido) => (
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
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
