import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { Oval } from "react-loader-spinner";
import type Cliente from "../../../models/Cliente";
import ModalCliente from "../modalcliente/ModalCliente";
import DeletarClientes from "../deletarcliente/DeletarClientes";
import CardClientes from "../cardclientes/CardClientes";

function ListaClientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const [clientesVisiveis, setClientesVisiveis] = useState(7);

  const [modalAberto, setModalAberto] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<number | undefined>(
    undefined
  );

  const [modalDeletarAberto, setModalDeletarAberto] = useState(false);
  const [idDeletar, setIdDeletar] = useState<number | undefined>(undefined);

  function abrirModalNovo() {
    setIdSelecionado(undefined);
    setModalAberto(true);
  }

  function abrirModalEditar(id: number) {
    setIdSelecionado(id);
    setModalAberto(true);
  }

  function abrirModalDeletar(id: number) {
    setIdDeletar(id);
    setModalDeletarAberto(true);
  }

  async function buscarClientes() {
    try {
      await buscar("/clientes", setClientes, {
        headers: { Authorization: token },
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
    buscarClientes();
  }, []);

  useEffect(() => {
    setClientesVisiveis(7);
  }, [clientes.length]);

  function atualizarClientes(clienteAtualizado?: Cliente) {
    if (clienteAtualizado) {
      setClientes((clientes) => {
        const existe = clientes.some((c) => c.id === clienteAtualizado.id);
        if (existe) {
          return clientes.map((c) =>
            c.id === clienteAtualizado.id ? clienteAtualizado : c
          );
        } else {
          return [...clientes, clienteAtualizado];
        }
      });
    } else {
      buscarClientes();
    }
  }

  return (
    <div className="flex flex-col w-full flex-1 bg-gray-200 px-4 md:px-10 min-h-screen">
      <div className="flex items-center justify-between gap-x-4 w-full max-w-7xl mx-auto mt-8 mb-6">
        <div className="bg-white rounded-full px-8 py-2 max-w-3xl w-full">
          <span className="text-2xl font-bold text-[#E28B7C] font-montserrat">
            Clientes
          </span>
        </div>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold rounded-full px-8 py-2 text-lg shadow hover:bg-blue-700 transition cursor-pointer"
          onClick={abrirModalNovo}
        >
          <span className="text-2xl">+</span> Adicionar cliente
        </button>
      </div>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full pb-10">
        <div className="hidden md:grid grid-cols-6 bg-transparent px-6 py-2 font-bold text-[#E28B7C]">
          <span>CPF</span>
          <span>Nome</span>
          <span>Telefone</span>
          <span>Endereço</span>
          <span>Data de cadastro</span>
          <span className="text-center">Ações</span>
        </div>
        {clientes.length === 0 ? (
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
        ) : (
          clientes
            .slice(0, clientesVisiveis)
            .map((cliente) => (
              <CardClientes
                key={cliente.id}
                cliente={cliente}
                onEditar={() => abrirModalEditar(cliente.id)}
                onDeletar={() => abrirModalDeletar(cliente.id)}
              />
            ))
        )}

        {clientesVisiveis < clientes.length && (
          <div className="flex justify-center">
            <button
              className="bg-transparent text-gray-800 border border-gray-600 rounded-xl px-8 py-3 text-base font-medium shadow-none hover:border-blue-300 hover:text-blue-900 transition cursor-pointer"
              onClick={() => setClientesVisiveis((prev) => prev + 7)}
            >
              Carregar Mais
            </button>
          </div>
        )}
      </div>
      <ModalCliente
        open={modalAberto}
        id={idSelecionado}
        onClose={() => setModalAberto(false)}
        onAtualizar={atualizarClientes}
      />
      <DeletarClientes
        open={modalDeletarAberto}
        id={idDeletar}
        onClose={() => setModalDeletarAberto(false)}
        onAtualizar={atualizarClientes}
      />
    </div>
  );
}

export default ListaClientes;
