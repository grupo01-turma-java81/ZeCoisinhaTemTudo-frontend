import React, { useState, useContext, useEffect, type ChangeEvent } from "react";
import type Cliente from "../../../models/Cliente";
import { cadastrar } from "../../../services/Service";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormClientesProps {
    onClienteCadastrado?: (cliente: Cliente) => void;
}

const FormClientes: React.FC<FormClientesProps> = ({ onClienteCadastrado }) => {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token || "";

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cliente, setCliente] = useState<Cliente>({
        cpf: 0,
        nome: "",
        telefone: "",
        endereco: "",
        dataCadastro: "",
        pedido: [],
    });

    useEffect(() => {
        // Se não estiver logado, redireciona para login
        if (!token) {
            toast.info("Você precisa estar logado!");
            navigate("/login");
        }
    }, [token, navigate]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await cadastrar("/clientes", cliente, () => {}, {
                headers: { Authorization: token }
            });
            toast.success("Cliente cadastrado com sucesso!");
            setCliente({
                cpf: 0,
                nome: "",
                telefone: "",
                endereco: "",
                dataCadastro: "",
                pedido: [],
            });
            if (onClienteCadastrado) onClienteCadastrado(cliente);
        } catch (error: any) {
            // Se o token expirou ou for inválido, faz logout
            if (error?.response?.status === 403 || error.toString().includes("403")) {
                handleLogout();
                toast.error("Sessão expirada. Faça login novamente.");
            } else {
                toast.error("Erro ao cadastrar o cliente.");
            }
        }
        setIsLoading(false);
    }

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
                disabled={isLoading}
            >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
        </form>
    );
};

export default FormClientes;