import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-2 py-2"
      style={{
        backgroundColor: "#075eaac7",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <img 
            src="/assets/img/Logo_v4.png"
            alt="Logo ZenCash" 
            style={{ 
              height: "35px",
              width: "auto" 
            }} 
          />
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor: isHovered ? "rgba(255, 255, 255, 0.2)" : "transparent",
            border: isHovered ? "2px solid #ffffff" : "2px solid rgba(255, 255, 255, 0.5)",
            transition: "all 0.3s ease",
            boxShadow: "none"
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarZenCash">
          <ul className="navbar-nav ms-auto text-end gap-lg-3 navbar-nav-hover">

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
                Sair
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}