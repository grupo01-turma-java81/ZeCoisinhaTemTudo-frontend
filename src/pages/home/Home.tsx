import React, { useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import type Pedido from "../../models/Pedido";
import { useNavigate } from "react-router-dom";

function Home() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = usuario.token || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    buscar(
      "/pedidos",
      (data: Pedido[]) => {
        setPedidos(data.filter((pedido) => pedido.positivo === true));
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
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div
      style={{
        fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "48px 60px 32px 60px",
          background: "#fff",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 48,
              color: "#223047",
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: 1,
              fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
            }}
          >
            BEM VINDO!
          </h1>
          <p
            style={{
              fontSize: 28,
              maxWidth: 600,
              lineHeight: "1.3",
              fontWeight: 500,
              fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
            }}
          >
            <span style={{ color: "#2a5bd7", fontWeight: 700 }}>
              Conecte-se
            </span>{" "}
            melhor com seus clientes e{" "}
            <span style={{ color: "#2a5bd7", fontWeight: 700 }}>venda</span>{" "}
            mais todos os dias.
          </p>
        </div>
        <img
          src="https://i.postimg.cc/GtXQwkfb/Test-Creative-removebg-preview.png"
          alt="Ilustração de vendas"
          style={{ maxWidth: 400, height: "auto" }}
        />
      </div>

      {/* Dicas e Alertas */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          background: "#AFC3E3",
          padding: "24px 0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              background: "#bfcbe6",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <img
              src="https://i.postimg.cc/mkKPHkzQ/Test-Creative-Photoroom-1.png"
              alt="Dicas"
              width={28}
            />
          </div>
          <p
            style={{
              marginTop: 8,
              color: "#223047",
              fontWeight: 500,
              fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
            }}
          >
            dicas
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              background: "#bfcbe6",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <img
              src="https://i.postimg.cc/KzqkmJmp/Test-Creative-Photoroom.png"
              alt="Alertas"
              width={28}
            />
          </div>
          <p
            style={{
              marginTop: 8,
              color: "#223047",
              fontWeight: 500,
              fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
            }}
          >
            alertas
          </p>
        </div>
      </div>

      {/* Card de Pedidos Positivos */}
      <div style={{ padding: "32px 60px" }}>
        <h2
          style={{
            fontSize: 22,
            color: "#223047",
            marginBottom: 16,
            fontWeight: 700,
            letterSpacing: 0.5,
            fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
          }}
        >
          Pedidos com Avaliações Positivas
        </h2>
        <div
          style={{
            background: "#D9D9D9",
            borderRadius: 10,
            padding: 40,
            minHeight: 400,
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {loading ? (
            <p
              style={{
                color: "#D9D9D9",
                textAlign: "center",
                fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
              }}
            >
              Carregando...
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: 8,
                overflow: "hidden",
                fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#D9D9D9", textAlign: "left" }}>
                  <th style={thStyle}>Pedido</th>
                  <th style={thStyle}>Cliente</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Valor</th>
                  <th style={thStyle}>Data</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr
                    key={pedido.id}
                    style={{ borderBottom: "1px solid #D9D9D9" }}
                  >
                    <td style={tdStyle}>#{pedido.id}</td>
                    <td style={tdStyle}>
                      {pedido.cliente?.nome || "Cliente não informado"}
                    </td>
                    <td style={tdStyle}>{pedido.statusEntrega}</td>
                    <td style={tdStyle}>R$ {pedido.valorTotal.toFixed(2)}</td>
                    <td style={tdStyle}>
                      {new Date(pedido.dataPedido).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "14px 18px",
  fontWeight: "bold",
  color: "#223047",
  fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
  fontSize: 18,
};

const tdStyle: React.CSSProperties = {
  padding: "14px 18px",
  color: "#223047",
  fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
  fontSize: 17,
};

export default Home;
