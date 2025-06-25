import type Pedido from "../../../models/Pedido";
import { motion, useAnimationFrame } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

interface DashboardPedidosProps {
  pedidos: Pedido[];
}

function DashboardPedidos({ pedidos }: DashboardPedidosProps) {
  const totalPedidos = pedidos.length;
  const totalVendido = pedidos.reduce((acc, p) => acc + (p.valorTotal || 0), 0);

  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 6);
  const pedidosSemana = pedidos.filter((p) => {
    const [dia, mes, ano] = p.dataPedido.split("/");
    const data = new Date(+ano, +mes - 1, +dia);
    return data >= seteDiasAtras && data <= hoje;
  }).length;

  const pedidosConcluidos = pedidos.filter(
    (p) => p.statusEntrega === "Concluído"
  ).length;

  const pedidosAndamento = pedidos.filter(
    (p) => p.statusEntrega === "Em Andamento"
  ).length;

  const pedidosCancelados = pedidos.filter(
    (p) => p.statusEntrega === "Cancelado"
  ).length;

  const clientesPositivos = pedidos.filter((p) => p.positivo === true).length;

  const clientesNegativos = pedidos.filter((p) => p.positivo === false).length;

  const totalVendidoConcluido = pedidos
    .filter((p) => p.statusEntrega === "Concluído")
    .reduce((acc, p) => acc + (p.valorTotal || 0), 0);

  const cards = [
    {
      label: "Total de Pedidos",
      value: totalPedidos,
      color: "text-[#1a7ed7]",
    },
    {
      label: "Total Vendido (Estimado)",
      value: `R$ ${totalVendido.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
      color: "text-green-600",
    },
    {
      label: "Total Recebido (Concluído)",
      value: `R$ ${totalVendidoConcluido.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
      color: "text-green-700",
    },
    {
      label: "Pedidos da Semana",
      value: pedidosSemana,
      color: "text-[#1a7ed7]",
    },
    {
      label: "Em Andamento",
      value: pedidosAndamento,
      color: "text-yellow-500",
    },
    {
      label: "Concluídos",
      value: pedidosConcluidos,
      color: "text-green-600",
    },
    {
      label: "Cancelados",
      value: pedidosCancelados,
      color: "text-red-500",
    },
    {
      label: "Clientes Satisfeitos",
      value: clientesPositivos,
      color: "text-green-600",
    },
    {
      label: "Clientes Insatisfeitos",
      value: clientesNegativos,
      color: "text-red-500",
    },
  ];

  const allCards = [...cards, ...cards];
  const containerRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [width, setWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2);
    }
  }, [pedidos.length]);

  useAnimationFrame((t, delta) => {
    if (!isPaused && width > 0) {
      setX((prev) => {
        const next = prev - delta * 0.05;
        return next <= -width ? 0 : next;
      });
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto mb-4 overflow-hidden pb-8 border-b border-gray-300">
      <motion.div
        ref={containerRef}
        className="flex gap-8 px-20 pt-8"
        style={{ width: "max-content", x }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {allCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center min-w-[220px]"
          >
            <span className="text-sm text-gray-500 mb-1">{card.label}</span>
            <span className={`text-3xl font-extrabold ${card.color}`}>
              {card.value}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default DashboardPedidos;
