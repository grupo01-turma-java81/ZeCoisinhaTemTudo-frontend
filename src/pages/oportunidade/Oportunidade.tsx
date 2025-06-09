import "../oportunidade/Oportunidade.css";
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

  return (
    <div className="min-h-screen bg-[#e5e6e8] font-montserrat">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-8 pt-12 pb-8">
        <img
          src="https://i.postimg.cc/W4hcSzYM/a5f2047c6d017c9775132b23a995663b9e8ef2b8.png"
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

      <div className="border-t border-[#bfc8d6] mx-40 my-8" />

      <div className="flex flex-col md:flex-row justify-center items-center gap-20 px-8 pb-12">
        <div
          className="bg-[url('https://i.postimg.cc/6TJQxRgJ/4265a1eb6fb8dd88dd50f6e72a414e63db6d8b68.jpg')]
  bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex flex-col items-center justify-end w-[470px] h-[240px]"
        >
          <span className="mb-4 text-[#1a3e7a] font-bold text-lg text-center bg-white px-2 py-1 rounded">
            Experiência de compra
          </span>
        </div>

        <div
          className="bg-[url('https://i.postimg.cc/JhmP42Zt/5cfadc274c6278dcf2fa5c42e2efecac15bd286f.jpg')]
  bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex flex-col items-center justify-end w-[470px] h-[240px]"
        >
          <span className="mb-4 text-[#1a3e7a] font-bold text-lg text-center bg-white px-2 py-1 rounded">
            Benefícios exclusivos
          </span>
        </div>

        <div
          className="bg-[url('https://i.postimg.cc/ZRMZqLyv/Design-sem-nome-29.png')]
  bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex flex-col items-center justify-end w-[470px] h-[240px]"
        >
          <span className="mb-4 text-[#1a3e7a] font-bold text-lg text-center bg-white px-2 py-1 rounded">
            Comunicação pós-venda
          </span>
        </div>
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
            clientes.map((cliente) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Oportunidade;
