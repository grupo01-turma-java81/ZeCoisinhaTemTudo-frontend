import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { Oval } from "react-loader-spinner"; 
import type Cliente from "../../../models/Cliente";
import ModalCliente from "../modalcliente/ModalCliente";
import DeletarClientes from "../deletarcliente/DeletarClientes";

function ListaClientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [modalAberto, setModalAberto] = useState(false);
  const [cpfSelecionado, setCpfSelecionado] = useState<string | undefined>(undefined);

  const [modalDeletarAberto, setModalDeletarAberto] = useState(false);
  const [cpfDeletar, setCpfDeletar] = useState<string | undefined>(undefined);

  function abrirModalNovo() {
    setCpfSelecionado(undefined);
    setModalAberto(true);
  }

  function abrirModalEditar(cpf: string) {
    setCpfSelecionado(cpf);
    setModalAberto(true);
  }

  function abrirModalDeletar(cpf: string) {
    setCpfDeletar(cpf);
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

  function atualizarClientes() {
    buscarClientes();
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
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        {/* Cabeçalho dos cards */}
        <div className="hidden md:grid grid-cols-6 bg-transparent px-6 py-2 font-bold text-[#E28B7C]">
          <span>CPF</span>
          <span>Nome</span>
          <span>Telefone</span>
          <span>Endereço</span>
          <span>Data de cadastro</span>
          <span className="text-center">Ações</span>
        </div>
        {/* Lista de clientes */}
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
          clientes.map((cliente) => (
            <div
              key={cliente.cpf}
              className="bg-white rounded-xl shadow-sm grid grid-cols-2 md:grid-cols-6 items-center px-6 py-4 min-h-[56px] gap-y-2"
            >
              <span className="text-base font-normal break-all">{cliente.cpf}</span>
              <span className="text-base font-normal break-all">{cliente.nome}</span>
              <span className="text-base font-normal break-all hidden md:block">{cliente.telefone}</span>
              <span className="text-base font-normal break-all hidden md:block">{cliente.endereco}</span>
              <span className="text-base font-normal break-all hidden md:block">
                {cliente.dataCadastro ? cliente.dataCadastro : <span className="text-gray-400 italic">-</span>}
              </span>
              <div className="flex gap-2 justify-center">
                <button
                  title="Editar"
                  className="text-blue-600 hover:text-blue-900 transition cursor-pointer"
                  onClick={() => abrirModalEditar(cliente.cpf)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2h5a2 2 0 012 2v5a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button
                  title="Deletar"
                  className="text-red-600 hover:text-red-900 transition cursor-pointer"
                  onClick={() => abrirModalDeletar(cliente.cpf)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ModalCliente
        open={modalAberto}
        cpf={cpfSelecionado}
        onClose={() => setModalAberto(false)}
        onAtualizar={atualizarClientes}
      />
      <DeletarClientes
        open={modalDeletarAberto}
        cpf={cpfDeletar || ""}
        onClose={() => setModalDeletarAberto(false)}
        onAtualizar={atualizarClientes}
      />
    </div>
  );
}

export default ListaClientes;
