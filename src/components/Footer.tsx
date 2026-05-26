export default function Footer() {
  return (
    <footer 
      className="text-center py-2 mt-auto border-top footer-custom"
      style={{
        background: "#b6cee2",
        backdropFilter: "blur(10px)",
        color: "#0a2540"
      }}
    >
      <p className="m-0 fw-medium">
        © 2026 ZenCash • Sistema Financeiro
      </p>

      <small className="d-block mt-1" style={{ opacity: 0.85 }}>
        Desenvolvido por Sâmara Jeise - RM 567002
      </small>
    </footer>
  );
}