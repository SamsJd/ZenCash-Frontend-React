import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import zenBg from "/assets/img/fundoTextura.png";
import ToastMessage from "../components/ToastMessage";
import { buscarInvestimentos, buscarTransacoes } from "../services/api";

export default function Home() {
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [investimentos, setInvestimentos] = useState<any[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    buscarTransacoes().then((dados) => {
      setTransacoes(dados);
    });

    buscarInvestimentos().then((dados) => {
      setInvestimentos(dados);
    });

    const mensagem = localStorage.getItem("toastMensagem");

    if (mensagem) {
      setToast(mensagem);
      localStorage.removeItem("toastMensagem");

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
  }, []);

  const entradas = transacoes
    .filter((transacao) => transacao.tipoTransacaoId === 1)
    .reduce((total, transacao) => total + Number(transacao.valor), 0);

  const saidas = transacoes
    .filter((transacao) => transacao.tipoTransacaoId === 2)
    .reduce((total, transacao) => total + Number(transacao.valor), 0);

  const saldoTotal = entradas - saidas;

  const ultimasTransacoes = [...transacoes]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  const totalInvestido = investimentos.reduce((total, investimento) => {
    return (
      total +
      Number(investimento.quantidade) *
        Number(investimento.valorUnitarioMedio)
    );
  }, 0);

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="container py-4">
      <ToastMessage mensagem={toast} tipo="success" />

      <div
        className="text-center p-4 rounded-3 shadow mb-5 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(7, 94, 170, 0.5), rgba(7, 94, 170, 0.3)), url(${zenBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textShadow: "5px 2px 4px #0a2540",
        }}
      >
        <h1 className="fw-bold mb-2">Bem-vindo ao ZenCash</h1>
        <p className="fs-4 m-0 fw-medium">
          Controle suas transações e investimentos em um só lugar.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div
            className="card h-100 shadow-sm p-4 d-flex flex-column justify-content-between border-0"
            style={{
              backgroundImage: `linear-gradient(rgba(189, 212, 233, 0.4), rgba(205, 207, 209, 0.73)), url(${zenBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="fw-bold h4 mb-3" style={{ color: "#0a2540" }}>
                Transações
              </h3>

              <div
                className="p-3 rounded-3 mb-3 shadow-sm"
                style={{ backgroundColor: "#ffffffc5" }}
              >
                <span className="text-secondary small d-block">
                  Saldo Total
                </span>

                <h4 className="fw-bold m-0" style={{ color: "#075eaa" }}>
                  {formatarMoeda(saldoTotal)}
                </h4>

                <div className="d-flex justify-content-between mt-2 pt-2 border-top border-white">
                  <small className="text-success fw-bold">
                    Entradas: {formatarMoeda(entradas)}
                  </small>

                  <small className="text-danger fw-bold">
                    Saídas: {formatarMoeda(saidas)}
                  </small>
                </div>
              </div>

              <span
                className="small d-block mb-2 fw-bold"
                style={{ color: "#0a2540", fontSize: "1rem" }}
              >
                Últimas Transações
              </span>

              <div className="d-flex flex-column gap-2 mb-3">
                {ultimasTransacoes.length === 0 && (
                  <span className="small" style={{ color: "#0a2540" }}>
                    Nenhuma transação cadastrada.
                  </span>
                )}

                {ultimasTransacoes.map((transacao) => (
                  <div
                    key={transacao.id}
                    className="d-flex justify-content-between align-items-center py-2 border-bottom border-light"
                  >
                    <span
                      className="fw-medium"
                      style={{ color: "#0a2540", fontSize: "1rem" }}
                    >
                      {transacao.descricao}
                    </span>

                    <span
                      className={`fw-semibold ${
                        transacao.tipoTransacaoId === 1
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {formatarMoeda(Number(transacao.valor))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/transacoes"
              className="btn btn-primary w-100 mt-3 py-2 fw-bold text-center text-decoration-none"
            >
              Acessar Transações
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div
            className="card h-100 shadow-sm p-4 d-flex flex-column justify-content-between border-0"
            style={{
              backgroundImage: `linear-gradient(rgba(189, 212, 233, 0.4), rgba(205, 207, 209, 0.73)), url(${zenBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="fw-bold h4 mb-3" style={{ color: "#0a2540" }}>
                Investimentos
              </h3>

              <div
                className="p-3 rounded-3 mb-3 shadow-sm"
                style={{ backgroundColor: "#ffffffc5" }}
              >
                <span className="text-secondary small d-block">
                  Total Investido
                </span>

                <h4 className="fw-bold m-0 text-success">
                  {formatarMoeda(totalInvestido)}
                </h4>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="small" style={{ color: "#0a2540" }}>
                    Produtos cadastrados
                  </span>

                  <span className="fw-bold" style={{ color: "#075eaa" }}>
                    {investimentos.length}
                  </span>
                </div>
              </div>

              <span
                className="small d-block mb-2 fw-bold"
                style={{ color: "#0a2540", fontSize: "1rem" }}
              >
                Evolução Patrimonial
              </span>

              <div
                className="p-3 rounded-3 d-flex align-items-end justify-content-center gap-3 shadow-sm"
                style={{ height: "105px", backgroundColor: "#ffffffc5" }}
              >
                <div
                  className="bg-primary rounded-top"
                  style={{ height: "30%", width: "30px", opacity: 0.5 }}
                ></div>

                <div
                  className="bg-primary rounded-top"
                  style={{ height: "50%", width: "30px", opacity: 0.65 }}
                ></div>

                <div
                  className="bg-primary rounded-top"
                  style={{ height: "70%", width: "30px", opacity: 0.8 }}
                ></div>

                <div
                  className="bg-primary rounded-top"
                  style={{ height: "95%", width: "30px", opacity: 0.95 }}
                ></div>
              </div>
            </div>

            <Link
              to="/investimentos"
              className="btn btn-primary w-100 mt-3 py-2 fw-bold text-center text-decoration-none"
            >
              Acessar Investimentos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}