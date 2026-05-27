import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "/assets/img/Logo_v4.png";
import zenBg from "/assets/img/fundoTextura.png";
import ToastMessage from "../components/ToastMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [toast, setToast] = useState("");
  const [tipoToast, setTipoToast] = useState<"success" | "danger" | "warning">(
    "success"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const mensagem = localStorage.getItem("toastMensagem");

    if (mensagem) {
      setToast(mensagem);
      setTipoToast("success");
      localStorage.removeItem("toastMensagem");

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
  }, []);

  function fazerLogin(e: any) {
    e.preventDefault();

    const emailTeste = "admin@zencash.com";
    const senhaTeste = "123456";

    if (email === emailTeste && senha === senhaTeste) {
      localStorage.setItem("usuarioLogado", "true");
      localStorage.setItem("toastMensagem", "Login realizado com sucesso!");
      navigate("/");
    } else {
      setToast("Email ou senha inválidos.");
      setTipoToast("danger");

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
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
            to="/cadastro"
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