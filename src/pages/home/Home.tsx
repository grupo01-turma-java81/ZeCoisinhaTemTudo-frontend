import React from "react";

const Home: React.FC = () => {
  return (
    <div
      style={{
        background: "#f5f6fa",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#223047",
            fontWeight: 700,
            fontSize: "3rem",
            marginBottom: 40,
            letterSpacing: 1,
          }}
        >
          BEM VINDO!
        </h1>
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
                background: "#bfc1c4",
                borderRadius: 16,
                width: 170,
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
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
              <span>Icone 1</span>
            </div>
            <div
              style={{
                background: "#bfc1c4",
                borderRadius: 16,
                width: 170,
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
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
              <span>Icone 2</span>
            </div>
            <div
              style={{
                background: "#bfc1c4",
                borderRadius: 16,
                width: 170,
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
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
              <span>Icone 3</span>
            </div>
            <div
              style={{
                background: "#bfc1c4",
                borderRadius: 16,
                width: 170,
                height: 140,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s, filter 0.2s",
              }}
              tabIndex={0}
              role="button"
              aria-label="Acessar avaliação"
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
              onFocus={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onBlur={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span style={{ fontSize: 48, fontWeight: 700 }}>5,0</span>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Avaliação</span>
                <div style={{ color: "#f7c948", fontSize: 20 }}>★★★★★</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <hr style={{ margin: "32px 0 0 0", borderColor: "#bdbdbd" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "24px 0 0 0",
              gap: 16,
            }}
          >
            <h2
              style={{
                fontWeight: 700,
                fontSize: 20,
                margin: 0,
                padding: 0,
                letterSpacing: 0.2,
                color: "#223047",
              }}
            >
              Pedidos Recentes
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
            }}
          >
            <table style={{ minWidth: 700, width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 16px", fontWeight: 700, fontSize: 16, color: "#223047" }}>
                    Pedido
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 16px", fontWeight: 700, fontSize: 16, color: "#223047" }}>
                    Cliente
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 16px", fontWeight: 700, fontSize: 16, color: "#223047" }}>
                    Status
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 16px", fontWeight: 700, fontSize: 16, color: "#223047" }}>
                    Valor
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 16px", fontWeight: 700, fontSize: 16, color: "#223047" }}>
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "8px 16px" }}>#1234</td>
                  <td style={{ padding: "8px 16px" }}>João S.</td>
                  <td style={{ padding: "8px 16px" }}>A caminho</td>
                  <td style={{ padding: "8px 16px" }}>R$ 250,00</td>
                  <td style={{ padding: "8px 16px" }}>05/06/2025</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 16px" }}>#1235</td>
                  <td style={{ padding: "8px 16px" }}>Ana R.</td>
                  <td style={{ padding: "8px 16px" }}>Pendente</td>
                  <td style={{ padding: "8px 16px" }}>R$ 180,00</td>
                  <td style={{ padding: "8px 16px" }}>06/06/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;