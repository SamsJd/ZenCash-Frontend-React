import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-2 py-2"
      style={{
        backgroundColor: "#075eaac7",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          ZenCash
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarZenCash"
          aria-controls="navbarZenCash"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarZenCash">
          <ul className="navbar-nav ms-auto gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/transacoes">
                Transações
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/investimentos">
                Investimentos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/clientes">
                Clientes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}