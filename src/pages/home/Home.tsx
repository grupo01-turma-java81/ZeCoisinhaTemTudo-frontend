import React, { useEffect, useState } from "react";
import { buscar } from "../../services/Service";

interface Cliente {
  nome: string;
}

interface Pedido {
  id: number;
  dataPedido: string;
  statusEntrega: string;
  valorTotal: number;
  positivo: boolean;
  cliente: Cliente | null;
}

const Home: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  // Recupere o token do localStorage ou de onde você armazena o token
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    buscar(
      "/pedidos", // Corrija aqui para o endpoint correto!
      (data: Pedido[]) => {
        setPedidos(data);
        console.log("Pedidos recebidos:", data);
        setLoading(false);
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch(() => {
      setLoading(false);
      alert("Sessão expirada ou acesso não autorizado. Faça login novamente.");
    });
  }, []);

  const pedidosPositivos = pedidos.filter((pedido) => pedido.positivo === true);

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", width: "100vw" }}>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ textAlign: "center", color: "#223047", fontWeight: 700, fontSize: "3rem", marginBottom: 40, letterSpacing: 1 }}>
          BEM VINDO!
        </h1>
        {/* Cards superiores */}
        <section>
          <div
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                background: "#1B2F4F",
                borderRadius: 16,
                width: 170,
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                color: "#fff",
                cursor: "pointer",
                transition: "transform 0.2s, filter 0.2s",
              }}
              tabIndex={0}
              role="button"
              aria-label="Acessar card 1"
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
              onFocus={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onBlur={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>Logo 1</span>
            </div>
            <div
              style={{
                background: "#1B2F4F",
                borderRadius: 16,
                width: 170,
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                color: "#fff",
                cursor: "pointer",
                transition: "transform 0.2s, filter 0.2s",
              }}
              tabIndex={0}
              role="button"
              aria-label="Acessar card 2"
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
              onFocus={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onBlur={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>Logo 2</span>
            </div>
            <div
              style={{
                background: "#1B2F4F",
                borderRadius: 16,
                width: 170,
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                color: "#fff",
                cursor: "pointer",
                transition: "transform 0.2s, filter 0.2s",
              }}
              tabIndex={0}
              role="button"
              aria-label="Acessar card 3"
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
              onFocus={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onBlur={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>Logo 3</span>
            </div>
          </div>
        </section>

        {/* Card inferior com pedidos positivos */}
        <section>
          <hr style={{ margin: "32px 0 0 0", borderColor: "#bdbdbd" }} />
          <div style={{ display: "flex", alignItems: "center", margin: "24px 0 0 0", gap: 16 }}>
            <h2 style={{ fontWeight: 700, fontSize: 20, margin: 0, padding: 0, letterSpacing: 0.2, color: "#223047" }}>
              Pedidos com Avaliações Positivas
            </h2>
          </div>
          <div
            style={{
              background: "#d1d3d6",
              borderRadius: 8,
              padding: 24,
              marginTop: 12,
              overflowX: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              minHeight: "45vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: pedidosPositivos.length === 0 ? "center" : "flex-start",
            }}
          >
            {loading ? (
              <div style={{ padding: 20, textAlign: "center" }}>Carregando...</div>
            ) : pedidosPositivos.length === 0 ? (
              <div style={{ padding: 20, textAlign: "center" }}>Nenhum pedido com avaliação positiva encontrada.</div>
            ) : (
              <table style={{ minWidth: 700, width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 16px" }}>Pedido</th>
                    <th style={{ textAlign: "left", padding: "8px 16px" }}>Cliente</th>
                    <th style={{ textAlign: "left", padding: "8px 16px" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "8px 16px" }}>Valor</th>
                    <th style={{ textAlign: "left", padding: "8px 16px" }}>Data</th>
                    <th style={{ textAlign: "left", padding: "8px 16px" }}>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosPositivos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td style={{ padding: "8px 16px" }}>{pedido.id}</td>
                      <td style={{ padding: "8px 16px" }}>{pedido.cliente?.nome}</td>
                      <td style={{ padding: "8px 16px" }}>{pedido.statusEntrega}</td>
                      <td style={{ padding: "8px 16px" }}>{pedido.valorTotal}</td>
                      <td style={{ padding: "8px 16px" }}>{pedido.dataPedido}</td>
                      <td style={{ padding: "8px 16px" }}>
                        Cliente em potencial!
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;