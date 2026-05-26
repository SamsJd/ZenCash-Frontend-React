import { useEffect, useState } from "react";
import zenBg from "/assets/img/fundoTextura.png";
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
  const [idEditando, setIdEditando] = useState<number | null>(null);

  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    const dados = await buscarTransacoes();
    setTransacoes(dados);
  }

  async function salvarTransacao(e: any) {
    e.preventDefault();

    const transacao = {
      contaOrigemId: 1,
      tipoTransacaoId: 1,
      descricao,
      valor: Number(valor),
      dataHora: "2026-05-25T10:00:00",
    };

    if (idEditando) {
      await atualizarTransacao(idEditando, transacao);
      setIdEditando(null);
    } else {
      await criarTransacao(transacao);
    }

    await carregarTransacoes();
    setDescricao("");
    setValor("");
  }

  function editarTransacao(transacao: any) {
    setIdEditando(transacao.id);
    setDescricao(transacao.descricao);
    setValor(String(transacao.valor));
  }

  async function excluirTransacao(id: number) {
    await deletarTransacao(id);
    await carregarTransacoes();
  }

  return (
    <div className="container py-4">
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
      <form onSubmit={salvarTransacao} className="bg-white p-4 rounded mb-4">
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Valor</label>
          <input
            type="number"
            className="form-control"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">
          {idEditando ? "Atualizar" : "Salvar"}
        </button>
      </form>

      <div className="table-responsive">
        <table className="table table-striped table-bordered bg-white">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {transacoes.map((transacao: any) => (
              <tr key={transacao.id}>
                <td>{transacao.id}</td>
                <td>{transacao.descricao}</td>
                <td>R$ {transacao.valor}</td>
                <td>{transacao.tipoTransacaoId}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarTransacao(transacao)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluirTransacao(transacao.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}