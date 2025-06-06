import React, { useState } from "react";
import type Cliente from "../../../models/Cliente";
import { cadastrar } from "../../../services/Service";
import { toast } from "react-toastify";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cadastrar("/clientes", cliente, (novoCliente: Cliente) => {
        if (onClienteCadastrado) onClienteCadastrado(novoCliente);
      }, {});
      setCliente({
        cpf: 0,
        nome: "",
        telefone: "",
        endereco: "",
        dataCadastro: "",
        pedido: [],
      });
      toast.success("Cliente cadastrado com sucesso!");
    } catch {
      toast.error("Erro ao cadastrar cliente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mb-8"
    >
      <h2 className="text-lg font-semibold mb-4">Cadastrar Cliente</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">CPF</label>
        <input
          type="number"
          name="cpf"
          value={cliente.cpf || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default FormClientes;