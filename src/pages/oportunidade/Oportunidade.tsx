import "../oportunidade/Oportunidade.css";
import { useEffect, useRef, useState } from "react";
import { buscar } from "../../services/Service";
import type Pedido from "../../models/Pedido";
import type Cliente from "../../models/Cliente";
import { FaWhatsapp } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import firstDivImg from "../../assets/oportunidade/firstDivImg.webp";
import secondDivImg from "../../assets/oportunidade/secondDivImg.webp";
import thirdDivImg from "../../assets/oportunidade/thirdDivImg.webp";
import oportunidadesMain from "../../assets/oportunidade/oportunidadesMain.webp";

function Oportunidade() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientesVisiveis, setClientesVisiveis] = useState(5);
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = usuario.token || "";

  const imgRef0 = useRef<HTMLDivElement | null>(null);
  const imgRef1 = useRef<HTMLDivElement | null>(null);
  const imgRef2 = useRef<HTMLDivElement | null>(null);
  const imgsRefs = [imgRef0, imgRef1, imgRef2];
  const [imgsVisiveis, setImgsVisiveis] = useState([false, false, false]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const novosVisiveis = [...imgsVisiveis];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            novosVisiveis[idx] = true;
          }
        });
        setImgsVisiveis(novosVisiveis);
      },
      { threshold: 0.3 }
    );
    imgsRefs.forEach((ref) => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    buscar(
      "/pedidos",
      (data: Pedido[]) => {
        const positivos = data.filter(
          (pedido) => pedido.positivo === true && pedido.cliente
        );
        const clientesUnicos: { [cpf: string]: Cliente } = {};
        positivos.forEach((pedido) => {
          if (pedido.cliente && pedido.cliente.cpf) {
            clientesUnicos[pedido.cliente.cpf] = pedido.cliente;
          }
        });
        setClientes(Object.values(clientesUnicos));
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
  }, [token]);

  useEffect(() => {
    setClientesVisiveis(5);
  }, [clientes.length]);

  return (
    <div className="min-h-screen bg-[#e5e6e8] font-montserrat">
      <div className="w-full min-h-screen flex items-center justify-center px-8 pt-12 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
          <img
            src={oportunidadesMain}
            alt="Ilustração Oportunidades"
            className="max-w-[700px] w-full h-auto"
          />
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-black font-semibold text-8xl leading-none text-center md:text-left">
              OPORTU
              <span className="block ml-30">NIDADES</span>
            </h1>
            <p className="mt-6 text-[#0387C4] text-xl md:text-4xl text-center md:text-left max-w-xl">
              Fidelize para crescer:{" "}
              <span className="text-[#1a7ed7] font-bold">
                estratégias inteligentes
              </span>{" "}
              que fazem seu cliente voltar — e indicar!
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#bfc8d6] mx-40 my-8" />

      <div className="flex flex-col md:flex-row justify-center items-center gap-20 px-8 pb-12">
        {[firstDivImg, secondDivImg, thirdDivImg].map((img, idx) => (
          <div
            key={idx}
            ref={imgsRefs[idx]}
            data-idx={idx}
            className={`bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex flex-col items-center justify-end w-[470px] h-[240px] transition-all duration-700 ${
              imgsVisiveis[idx]
                ? "animate-oport-fadeup opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <span className="mb-4 text-[#1a3e7a] font-bold text-lg text-center bg-white px-2 py-1 rounded">
              {idx === 0 && "Experiência de compra"}
              {idx === 1 && "Benefícios exclusivos"}
              {idx === 2 && "Comunicação pós-venda"}
            </span>
          </div>
        ))}
      </div>

      <div className="px-2 md:px-16 pb-10 mt-20">
        <div className="max-w-8xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-6 bg-transparent px-2 md:px-8 py-2 text-[#223047]">
            <span>CPF</span>
            <span>Nome</span>
            <span className="hidden md:block">Telefone</span>
            <span className="hidden md:block">Endereço</span>
            <span className="hidden md:block">Data de cadastro</span>
            <span className="text-center">Contato direto</span>
          </div>

          <div className="border-t border-[#bfc8d6] mb-2" />

          {loading ? (
            <div className="flex justify-center py-8">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#1B2F4F"
                secondaryColor="#AFC3E3"
                strokeWidth={5}
                ariaLabel="oval-loading"
                wrapperClass="mx-auto"
              />
            </div>
          ) : clientes.length === 0 ? (
            <p className="text-[#223047] text-center font-montserrat py-8">
              Nenhum cliente com avaliação positiva encontrado.
            </p>
          ) : (
            <>
              {clientes.slice(0, clientesVisiveis).map((cliente) => (
                <div
                  key={cliente.cpf}
                  className="bg-white rounded-xl shadow grid grid-cols-2 md:grid-cols-6 items-center px-2 md:px-8 py-4 min-h-[64px] mb-3"
                >
                  <span className="text-base md:text-lg font-normal break-all">
                    {cliente.cpf}
                  </span>
                  <span
                    className="text-base md:text-lg font-normal break-all truncate"
                    title={cliente.nome}
                  >
                    {cliente.nome}
                  </span>
                  <span className="text-base md:text-lg font-normal break-all hidden md:block">
                    {cliente.telefone}
                  </span>
                  <span className="text-base md:text-lg font-normal break-all hidden md:block">
                    {cliente.endereco}
                  </span>
                  <span className="text-base md:text-lg font-normal break-all hidden md:block">
                    {cliente.dataCadastro ? (
                      cliente.dataCadastro
                    ) : (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </span>
                  <span className="flex justify-center items-center">
                    <a
                      href={`https://wa.me/${cliente.telefone?.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0387C4] hover:text-[#9ac3d6] transition"
                      title="Enviar mensagem no WhatsApp"
                    >
                      <FaWhatsapp className="text-4xl" />
                    </a>
                  </span>
                </div>
              ))}
              {clientesVisiveis < clientes.length && (
                <div className="flex justify-center my-4">
                  <button
                    className="bg-transparent text-blue-700 border border-blue-400 rounded-xl px-8 py-3 text-base font-medium shadow-none hover:bg-blue-50 transition cursor-pointer"
                    onClick={() => setClientesVisiveis((prev) => prev + 5)}
                  >
                    Mostrar mais clientes
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Oportunidade;
