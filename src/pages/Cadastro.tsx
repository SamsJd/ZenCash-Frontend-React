import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "/assets/img/Logo_v4.png";
import zenBg from "/assets/img/fundoTextura.png";
import { criarCliente } from "../services/api";
import ToastMessage from "../components/ToastMessage";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [toast, setToast] = useState("");
  const [tipoToast, setTipoToast] = useState<"success" | "danger" | "warning">(
    "success"
  );

  const navigate = useNavigate();

  function mostrarToast(
    mensagem: string,
    tipo: "success" | "danger" | "warning" = "success"
  ) {
    setToast(mensagem);
    setTipoToast(tipo);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  async function cadastrar(e: any) {
    e.preventDefault();

    const cliente = {
      nome,
      email,
      senha,
    };

    await criarCliente(cliente);

    mostrarToast("Cadastro realizado com sucesso!", "success");

    localStorage.setItem("toastMensagem", "Cadastro realizado com sucesso!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ToastMessage mensagem={toast} tipo={tipoToast} />

      <div
        className="text-center p-4 rounded-4 shadow"
        style={{
          maxWidth: "450px",
          width: "100%",
          backgroundImage: `linear-gradient(rgba(7, 94, 170, 0.5), rgba(7, 94, 170, 0.3)), url(${zenBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo ZenCash"
          className="mb-3"
          style={{ width: "170px" }}
        />

        <h1
          className="fw-bold text-white mb-2"
          style={{
            textShadow: "5px 2px 4px #0a2540",
          }}
        >
          Criar Conta
        </h1>

        <p className="text-white mb-4 fs-5">
          Cadastre-se para acessar o ZenCash
        </p>

        <form onSubmit={cadastrar}>
          <input
            type="text"
            className="form-control rounded-pill mb-3 px-4"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            className="form-control rounded-pill mb-3 px-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control rounded-pill mb-4 px-4"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button className="btn btn-success rounded-pill w-100 fw-bold mb-3">
            Cadastrar
          </button>

          <Link to="/login" className="text-white text-decoration-none fw-bold">
            Já possui conta? Entrar
          </Link>
        </form>
      </div>
    </div>
  );
}