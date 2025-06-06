import React, { useState, useEffect, useContext, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Cliente from "../../../models/Cliente";
import { buscar, cadastrar, atualizar } from "../../../services/Service";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";

interface FormClientesProps {
  onClienteCadastrado?: (cliente: Cliente) => void;
}

const FormClientes: React.FC<FormClientesProps> = ({ onClienteCadastrado }) => {
  const [cliente, setCliente] = useState<Cliente>({
    cpf: 0,
    nome: "",
    telefone: "",
    endereco: "",
    dataCadastro: "",
    pedido: [],
  });

  const navigate = useNavigate();
  const { cpf } = useParams<{ cpf: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (cpf !== undefined) {
      buscarClientePorCpf(cpf);
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

    if (cpf !== undefined) {
      try {
        await atualizar(`/clientes`, cliente, setCliente, {
          headers: { Authorization: token },
        });
        toast.success("Cliente atualizado com sucesso!");
        navigate("/clientes");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          toast.error("Erro ao atualizar cliente.");
        }
      }
    } else {
      try {
        await cadastrar("/clientes", cliente, (novoCliente: Cliente) => {
          if (onClienteCadastrado) onClienteCadastrado(novoCliente);
        }, { headers: { Authorization: token } });
        setCliente({
          cpf: 0,
          nome: "",
          telefone: "",
          endereco: "",
          dataCadastro: "",
          pedido: [],
        });
        toast.success("Cliente cadastrado com sucesso!");
        navigate("/clientes");
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
      className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mb-8"
    >
      <h2 className="text-lg font-semibold mb-4">
        {cpf !== undefined ? "Editar Cliente" : "Cadastrar Cliente"}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">CPF</label>
        <input
          type="number"
          name="cpf"
          value={cliente.cpf || ""}
          onChange={atualizarEstado}
          className="w-full border rounded px-3 py-2"
          required
          disabled={cpf !== undefined}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={atualizarEstado}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <input
          type="text"
          name="telefone"
          value={cliente.telefone}
          onChange={atualizarEstado}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Endereço</label>
        <input
          type="text"
          name="endereco"
          value={cliente.endereco}
          onChange={atualizarEstado}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Data de Cadastro</label>
        <input
          type="date"
          name="dataCadastro"
          value={cliente.dataCadastro}
          onChange={atualizarEstado}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        {cpf !== undefined ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default FormClientes;
