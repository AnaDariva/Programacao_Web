import { Outlet } from "react-router-dom";
import TopMenu from "../Top-Menu";

export function Layout() {
  return (
    <>
      <TopMenu />
      <main style={{ paddingTop: "40px", minHeight: "calc(100vh - 180px)" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer
      style={{
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        background: "var(--nba-blue)",
        color: "#fff",
        padding: "36px 0 16px 0",
        textAlign: "center",
        borderTopLeftRadius: "18px",
        borderTopRightRadius: "18px",
        fontSize: "1.05rem",
        boxShadow: "0 -2px 16px #0001",
        zIndex: 20,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div>
          <span style={{ fontWeight: 700, letterSpacing: ".5px" }}>
            NBA Store Oficial
          </span>{" "}
          &copy; {new Date().getFullYear()}
          <br />
          <span style={{ fontSize: "0.93rem", opacity: 0.9 }}>
            Desenvolvido por Nalu | Este é um projeto acadêmico sem fins
            lucrativos
          </span>
        </div>
        <div style={{ marginTop: "22px", fontSize: "1.25rem", opacity: 0.95 }}>
          <span style={{ fontWeight: 600 }}>Aceitamos:</span>{" "}
          <span title="Visa">💳</span>
          <span title="Mastercard">🟣</span>
          <span title="Elo">🟦</span>
          <span title="Pix" style={{ marginLeft: "10px" }}>
            🔷 PIX
          </span>
        </div>
        <div style={{ marginTop: "18px", fontSize: "1.35rem" }}>
          <span style={{ marginRight: "6px" }}>Siga-nos:</span>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              margin: "0 7px",
              textDecoration: "none",
              opacity: 0.88,
            }}
            aria-label="Instagram"
          >
            <span role="img" aria-label="Instagram">
              📸
            </span>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              margin: "0 7px",
              textDecoration: "none",
              opacity: 0.88,
            }}
            aria-label="Twitter/X"
          >
            <span role="img" aria-label="Twitter">
              🐦
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
