type FooterProps = {
  isLogin?: boolean;
};

export default function Footer({ isLogin }: FooterProps) {
  return (
    <footer className="text-center py-3 mt-auto" style={{ backgroundColor: "#b6cee2" }}>
      <p className="m-0 fw-bold">
        © 2026 ZenCash • Sistema Financeiro
      </p>

      <small>
        {isLogin
          ? ""
          : "Desenvolvido por Sâmara Jeise - RM 567002"}
      </small>
    </footer>
  );
}