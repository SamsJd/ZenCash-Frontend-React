import { useEffect, useState } from "react";
import zenBg from "/assets/img/fundoTextura.png";
import {
  buscarInvestimentos,
  criarInvestimento,
  atualizarInvestimento,
  deletarInvestimento,
} from "../services/api";

export default function Investimentos() {
  const [investimentos, setInvestimentos] = useState<any[]>([]);

  const [clienteId, setClienteId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitarioMedio, setValorUnitarioMedio] = useState("");
  const [dataCompra, setDataCompra] = useState("");

  const [idEditando, setIdEditando] = useState<number | null>(null);

  useEffect(() => {
    carregarInvestimentos();
  }, []);

  async function carregarInvestimentos() {
    const dados = await buscarInvestimentos();
    setInvestimentos(dados);
  }

  async function salvarInvestimento(e: any) {
    e.preventDefault();

    const investimento = {
      clienteId: Number(clienteId),
      produtoId: Number(produtoId),
      quantidade: Number(quantidade),
      valorUnitarioMedio: Number(valorUnitarioMedio),
      dataCompra,
    };

    if (idEditando) {
      await atualizarInvestimento(idEditando, investimento);
      setIdEditando(null);
    } else {
      await criarInvestimento(investimento);
    }

    await carregarInvestimentos();

    setClienteId("");
    setProdutoId("");
    setQuantidade("");
    setValorUnitarioMedio("");
    setDataCompra("");
  }

  function editarInvestimento(investimento: any) {
    setIdEditando(investimento.id);
    setClienteId(String(investimento.clienteId));
    setProdutoId(String(investimento.produtoId));
    setQuantidade(String(investimento.quantidade));
    setValorUnitarioMedio(String(investimento.valorUnitarioMedio));
    setDataCompra(investimento.dataCompra);
  }

  async function excluirInvestimento(id: number) {
    await deletarInvestimento(id);
    await carregarInvestimentos();
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
        <h1 className="fw-bold mb-2">Investimentos</h1>
      </div>

      <form onSubmit={salvarInvestimento} className="bg-white p-4 rounded mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">ID do Cliente</label>
            <input
              type="number"
              className="form-control"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">ID do Produto</label>
            <input
              type="number"
              className="form-control"
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Quantidade</label>
            <input
              type="number"
              className="form-control"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Valor Unitário Médio</label>
            <input
              type="number"
              className="form-control"
              value={valorUnitarioMedio}
              onChange={(e) => setValorUnitarioMedio(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Data da Compra</label>
            <input
              type="date"
              className="form-control"
              value={dataCompra}
              onChange={(e) => setDataCompra(e.target.value)}
              required
            />
          </div>
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
              <th>Cliente</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Data Compra</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {investimentos.map((investimento: any) => (
              <tr key={investimento.id}>
                <td>{investimento.id}</td>
                <td>{investimento.clienteId}</td>
                <td>{investimento.produtoId}</td>
                <td>{investimento.quantidade}</td>
                <td>R$ {investimento.valorUnitarioMedio}</td>
                <td>{investimento.dataCompra}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarInvestimento(investimento)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluirInvestimento(investimento.id)}
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