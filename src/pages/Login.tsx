import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="card shadow p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={fazerLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}