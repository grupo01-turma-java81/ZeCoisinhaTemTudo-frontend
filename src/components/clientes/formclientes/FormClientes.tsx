import React, { useState, useEffect, useContext, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Cliente from "../../../models/Cliente";
import { buscar, cadastrar, atualizar } from "../../../services/Service";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";

interface FormClientesProps {
  cpf?: string;
  onClienteCadastrado?: (cliente: Cliente) => void;
}

const FormClientes: React.FC<FormClientesProps> = ({ cpf, onClienteCadastrado }) => {
  const [cliente, setCliente] = useState<Cliente>({
    cpf: "",
    nome: "",
    telefone: "",
    endereco: "",
    dataCadastro: "",
    pedido: [],
  });

  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (cpf) {
      buscarClientePorCpf(cpf);
    } else {
      setCliente({
        cpf: "",
        nome: "",
        telefone: "",
        endereco: "",
        dataCadastro: "",
        pedido: [],
      });
    }
    // eslint-disable-next-line
  }, [cpf]);

  async function buscarClientePorCpf(cpf: string) {
    try {
      await buscar(`/clientes/${cpf}`, setCliente, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let clienteParaEnviar: any = {
      cpf: cliente.cpf,
      nome: cliente.nome,
      telefone: cliente.telefone,
      endereco: cliente.endereco
    };

    if (cpf && cliente.dataCadastro) {
      clienteParaEnviar.dataCadastro = cliente.dataCadastro;
    }

    if (cpf) {
      try {
        await atualizar(`/clientes`, clienteParaEnviar, setCliente, {
          headers: { Authorization: token },
        });
        toast.success("Cliente atualizado com sucesso!");
        if (onClienteCadastrado) onClienteCadastrado(clienteParaEnviar);
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          toast.error("Erro ao atualizar cliente.");
        }
      }
    } else {
      try {
        await cadastrar("/clientes", clienteParaEnviar, (novoCliente: Cliente) => {
          if (onClienteCadastrado) onClienteCadastrado(novoCliente);
        }, { headers: { Authorization: token } });
        setCliente({
          cpf: "",
          nome: "",
          telefone: "",
          endereco: "",
          dataCadastro: "",
          pedido: [],
        });
        toast.success("Cliente cadastrado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          toast.error("Erro ao cadastrar cliente.");
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto font-sans"
    >
      <h2 className="text-4xl text-center my-8">
        {cpf ? "Editar Cliente" : "Cadastrar Cliente"}
      </h2>
      <div className="mb-6">
        <label className="block text-base font-medium mb-2 font-sans">CPF</label>
        <input
          type="text"
          name="cpf"
          value={cliente.cpf}
          onChange={atualizarEstado}
          className="w-full border border-black rounded px-3 py-2 bg-white text-lg font-sans"
          required
          disabled={!!cpf}
          minLength={10}
          maxLength={11}
        />
      </div>
      <div className="mb-6">
        <label className="block text-base font-medium mb-2 font-sans">Nome</label>
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={atualizarEstado}
          className="w-full border border-black rounded px-3 py-2 bg-white text-lg font-sans"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-base font-medium mb-2 font-sans">Telefone</label>
        <input
          type="text"
          name="telefone"
          value={cliente.telefone}
          onChange={atualizarEstado}
          className="w-full border border-black rounded px-3 py-2 bg-white text-lg font-sans"
          required
          minLength={14}
          maxLength={14}
        />
      </div>
      <div className="mb-6">
        <label className="block text-base font-medium mb-2 font-sans">Endereço</label>
        <input
          type="text"
          name="endereco"
          value={cliente.endereco}
          onChange={atualizarEstado}
          className="w-full border border-black rounded px-3 py-2 bg-white text-lg font-sans"
          required
        />
      </div>
      <div className="mb-8">
        <label className="block text-base font-medium mb-2 font-sans">Data de Cadastro</label>
        <input
          type="text"
          name="dataCadastro"
          value={cliente.dataCadastro || ""}
          onChange={atualizarEstado}
          className="w-full border border-black rounded px-3 py-2 bg-white text-lg font-sans"
          disabled
          placeholder="Preenchido automaticamente"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#16213E] text-white text-lg font-bold py-3 rounded hover:bg-[#0f1730] transition font-sans"
      >
        {cpf ? "PRONTO!" : "PRONTO!"}
      </button>
    </form>
  );
};

export default FormClientes;