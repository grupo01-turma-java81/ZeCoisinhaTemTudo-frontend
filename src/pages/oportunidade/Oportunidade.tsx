import { useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import type Pedido from "../../models/Pedido";
import type Cliente from "../../models/Cliente";
import { FaWhatsapp } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

function Oportunidade() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = usuario.token || "";

  useEffect(() => {
    buscar(
      "/pedidos",
      (data: Pedido[]) => {
        const positivos = data.filter((pedido) => pedido.positivo === true && pedido.cliente);
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

  return (
    <div className="font-montserrat bg-gray-200 min-h-screen">
      {/* Topo ilustrativo e título */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 pt-8 pb-4 bg-white">
        <img
          src="https://i.postimg.cc/GtXQwkfb/Test-Creative-removebg-preview.png"
          alt="Ilustração de vendas"
          className="max-w-[350px] md:max-w-[420px] h-auto mb-4 md:mb-0"
        />
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-5xl md:text-6xl text-[#223047] font-bold mb-2 leading-tight text-center md:text-left">
            OPORTU<br className="hidden md:block" />NIDADES
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl leading-snug font-semibold font-montserrat text-center md:text-left">
            Fidelize para crescer: <span className="text-[#2a5bd7] font-bold">estratégias inteligentes</span> que fazem seu cliente voltar — e indicar!
          </p>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="px-2 md:px-16 pb-10">
        <div className="max-w-7xl mx-auto w-full">
          {/* Cabeçalho dos cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 bg-transparent px-2 md:px-8 py-2 font-bold text-[#223047]">
            <span>CPF</span>
            <span>Nome</span>
            <span className="hidden md:block">Telefone</span>
            <span className="hidden md:block">Endereço</span>
            <span className="hidden md:block">Data de cadastro</span>
            <span className="text-center">Contato direto</span>
          </div>
          {/* Linha divisória */}
          <div className="border-b-2 border-[#bfcbe6] mb-2" />
          {/* Lista de cards */}
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
            clientes.map((cliente) => (
              <div
                key={cliente.cpf}
                className="bg-white rounded-xl shadow grid grid-cols-2 md:grid-cols-6 items-center px-2 md:px-8 py-5 min-h-[64px] mb-3"
              >
                <span className="text-base md:text-lg font-normal break-all">{cliente.cpf}</span>
                <span
                  className="text-base md:text-lg font-normal break-all truncate"
                  title={cliente.nome}
                >
                  {cliente.nome}
                </span>
                <span className="text-base md:text-lg font-normal break-all hidden md:block">{cliente.telefone}</span>
                <span className="text-base md:text-lg font-normal break-all hidden md:block">{cliente.endereco}</span>
                <span className="text-base md:text-lg font-normal break-all hidden md:block">
                  {cliente.dataCadastro
                    ? cliente.dataCadastro
                    : <span className="text-gray-400 italic">-</span>}
                </span>
                <span className="flex justify-center items-center">
                  <a
                    href={`https://wa.me/${cliente.telefone?.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] rounded-full p-2 hover:bg-[#128C7E] transition"
                    title="Enviar mensagem no WhatsApp"
                  >
                    <FaWhatsapp className="text-white text-2xl" />
                  </a>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Oportunidade;