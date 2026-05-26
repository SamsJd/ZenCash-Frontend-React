import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "/assets/img/Logo_v4.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function fazerLogin(e: any) {
    e.preventDefault();

    if (email && senha) {
      navigate("/");
    } else {
      alert("Preencha email e senha.");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="text-center" style={{ maxWidth: "420px", width: "100%" }}>
        <h2 className="text-white mb-4">Olá, Bem-Vindo(a)</h2>

        <img
          src={logo}
          alt="Logo ZenCash"
          className="mb-3"
          style={{ width: "170px" }}
        />

        <h1 className="fw-bold text-white">ZenCash</h1>

        <p className="fs-4 text-white mb-4">
          Mantenha a calma <br /> com seu dinheiro
        </p>

        <form onSubmit={fazerLogin}>
          <input
            type="email"
            className="form-control rounded-pill mb-3 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="password"
            className="form-control rounded-pill mb-3 px-4"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
          />

          <button className="btn btn-success rounded-pill w-100 fw-bold mb-3">
            Entrar
          </button>

          <p className="text-white fw-bold mb-2">ou</p>

          <Link
            to="/clientes"
            className="btn text-white rounded-pill px-5"
            style={{ backgroundColor: "#075eaa" }}
          >
            Cadastrar
          </Link>
        </form>
      </div>
    </div>
  );
}