import { useEffect, useState } from "react";
import zenBg from "/assets/img/fundoTextura.png";
import ToastMessage from "../components/ToastMessage";
import {
  buscarTransacoes,
  criarTransacao,
  atualizarTransacao,
  deletarTransacao,
} from "../services/api";

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [tipoTransacaoId, setTipoTransacaoId] = useState(1);
  const [idEditando, setIdEditando] = useState<number | null>(null);

  const [toast, setToast] = useState("");
  const [tipoToast, setTipoToast] = useState<"success" | "danger" | "warning">("success");

  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    const dados = await buscarTransacoes();
    setTransacoes(dados);
  }

  function mostrarToast(mensagem: string, tipo: "success" | "danger" | "warning" = "success") {
    setToast(mensagem);
    setTipoToast(tipo);
    setTimeout(() => setToast(""), 3000);
  }

  async function salvarTransacao(e: any) {
    e.preventDefault();

    const transacao = {
      contaOrigemId: 1,
      tipoTransacaoId,
      descricao,
      valor: Number(valor),
      dataHora: dataHora ? `${dataHora}T10:00:00` : "2026-05-25T10:00:00",
    };

    if (idEditando) {
      await atualizarTransacao(idEditando, transacao);
      setIdEditando(null);
      mostrarToast("Transação atualizada com sucesso!", "success");
    } else {
      await criarTransacao(transacao);
      mostrarToast("Transação cadastrada com sucesso!", "success");
    }

    await carregarTransacoes();

    setDescricao("");
    setValor("");
    setDataHora("");
    setTipoTransacaoId(1);
  }

  function editarTransacao(transacao: any) {
    setIdEditando(transacao.id);
    setDescricao(transacao.descricao);
    setValor(String(transacao.valor));
    setTipoTransacaoId(transacao.tipoTransacaoId);

    if (transacao.dataHora) {
      setDataHora(transacao.dataHora.substring(0, 10));
    }
  }

  async function excluirTransacao(id: number) {
    await deletarTransacao(id);
    await carregarTransacoes();
    mostrarToast("Transação excluída com sucesso!", "danger");
  }

  return (
    <div className="container py-4">
      <ToastMessage mensagem={toast} tipo={tipoToast} />

      <div
        className="text-center p-2 rounded-3 shadow mb-4 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(7, 94, 170, 0.5), rgba(7, 94, 170, 0.3)), url(${zenBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textShadow: "5px 2px 4px #0a2540",
        }}
      >
        <h1 className="fw-bold mb-2">Transações</h1>
      </div>

      <form
        onSubmit={salvarTransacao}
        className="p-4 rounded mb-4 shadow-sm"
        style={{
          backgroundImage: `linear-gradient(rgba(189, 212, 233, 0.4), rgba(205, 207, 209, 0.73)), url(${zenBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mb-4">
          <label className="form-label fw-bold">Tipo da transação</label>

          <div className="d-flex gap-2">
            <button
              type="button"
              className={`btn w-50 ${tipoTransacaoId === 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setTipoTransacaoId(1)}
            >
              Receita
            </button>

            <button
              type="button"
              className={`btn w-50 ${tipoTransacaoId === 2 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setTipoTransacaoId(2)}
            >
              Gasto
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Descrição</label>
            <input
              type="text"
              className="form-control"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Supermercado, Salário, Uber"
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Valor</label>
            <input
              type="number"
              className="form-control"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="R$ 0.00"
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Data</label>
            <input
              type="date"
              className="form-control"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="btn btn-success w-100 fw-bold">
          {idEditando ? "Atualizar Transação" : "Confirmar Transação"}
        </button>
      </form>

      <div
        className="table-responsive mb-4"
        style={{
          border: "2px solid #075eaac7",
          borderRadius: "5px",
          overflow: "visible",
          boxShadow: "8px 2px 25px #0a254040",
        }}
      >
        <table className="table mb-0">
          <thead>
            <tr>
              {["ID", "Descrição", "Valor", "Tipo", "Data", "Ações"].map((titulo) => (
                <th key={titulo} style={{ backgroundColor: "#075eaac7", color: "white" }}>
                  {titulo}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transacoes.map((transacao: any, index: number) => (
              <tr key={transacao.id}>
                {[
                  transacao.id,
                  transacao.descricao,
                  `R$ ${transacao.valor}`,
                  transacao.tipoTransacaoId === 1 ? "Receita" : "Gasto",
                  transacao.dataHora?.substring(0, 10),
                ].map((valorCelula, i) => (
                  <td
                    key={i}
                    className={`align-middle ${
                      i === 2
                        ? transacao.tipoTransacaoId === 1
                          ? "fw-bold text-success"
                          : "fw-bold text-danger"
                        : ""
                    }`}
                    style={{ backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc" }}
                  >
                    {valorCelula}
                  </td>
                ))}

                <td
                  className="align-middle text-center"
                  style={{ backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc" }}
                >
                  <div className="dropdown text-center">
                    <button className="btn btn-sm btn-primary dropdown-toggle fw-bold" type="button" data-bs-toggle="dropdown">
                      Ações
                    </button>

                    <ul className="dropdown-menu text-center">
                      <li>
                        <button className="dropdown-item fw-bold" onClick={() => editarTransacao(transacao)}>
                          Editar
                        </button>
                      </li>

                      <li>
                        <button className="dropdown-item text-danger fw-bold" onClick={() => excluirTransacao(transacao.id)}>
                          Excluir
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}