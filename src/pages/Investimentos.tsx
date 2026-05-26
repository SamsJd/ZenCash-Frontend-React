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

  const [nomeInvestimento, setNomeInvestimento] = useState("");
  const [tipoInvestimento, setTipoInvestimento] = useState("");
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
      clienteId: 1,
      produtoId: Number(tipoInvestimento),
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

    setNomeInvestimento("");
    setTipoInvestimento("");
    setQuantidade("");
    setValorUnitarioMedio("");
    setDataCompra("");
  }

  function editarInvestimento(investimento: any) {
    setIdEditando(investimento.id);
    setNomeInvestimento(obterNomeInvestimento(investimento.produtoId));
    setTipoInvestimento(String(investimento.produtoId));
    setQuantidade(String(investimento.quantidade));
    setValorUnitarioMedio(String(investimento.valorUnitarioMedio));
    setDataCompra(investimento.dataCompra);
  }

  async function excluirInvestimento(id: number) {
    await deletarInvestimento(id);
    await carregarInvestimentos();
  }

  function obterNomeInvestimento(produtoId: number) {
    if (produtoId === 1) return "Tesouro Selic";
    if (produtoId === 2) return "CDB";
    if (produtoId === 3) return "Ações";
    if (produtoId === 4) return "Fundos Imobiliários";
    if (produtoId === 5) return "Poupança";
    return "Investimento";
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data: string) {
    if (!data) return "";

    return new Date(data + "T00:00:00").toLocaleDateString("pt-BR");
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

      <form
        onSubmit={salvarInvestimento}
        className="p-4 rounded mb-4 shadow-sm"
        style={{
          backgroundImage: `linear-gradient(rgba(189, 212, 233, 0.4), rgba(205, 207, 209, 0.73)), url(${zenBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Nome do Investimento</label>
            <input
              type="text"
              className="form-control"
              value={nomeInvestimento}
              onChange={(e) => setNomeInvestimento(e.target.value)}
              placeholder="Ex: Tesouro Selic, CDB, Ações"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Tipo do Investimento</label>
            <select
              className="form-control"
              value={tipoInvestimento}
              onChange={(e) => {
                setTipoInvestimento(e.target.value);
                setNomeInvestimento(obterNomeInvestimento(Number(e.target.value)));
              }}
              required
            >
              <option value="">Selecione</option>
              <option value="1">Tesouro Selic</option>
              <option value="2">CDB</option>
              <option value="3">Ações</option>
              <option value="4">Fundos Imobiliários</option>
              <option value="5">Poupança</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Quantidade</label>
            <input
              type="number"
              className="form-control"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              placeholder="Ex: 10"
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Valor Médio</label>
            <input
              type="number"
              className="form-control"
              value={valorUnitarioMedio}
              onChange={(e) => setValorUnitarioMedio(e.target.value)}
              placeholder="R$ 0.00"
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Data da Compra</label>
            <input
              type="date"
              className="form-control"
              value={dataCompra}
              onChange={(e) => setDataCompra(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="btn btn-success w-100 fw-bold">
          {idEditando ? "Atualizar Investimento" : "Confirmar Investimento"}
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
              {[
                "ID",
                "Investimento",
                "Tipo",
                "Quantidade",
                "Valor Médio",
                "Data da Compra",
                "Ações",
              ].map((titulo) => (
                <th
                  key={titulo}
                  style={{
                    backgroundColor: "#075eaac7",
                    color: "white",
                  }}
                >
                  {titulo}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {investimentos.map((investimento: any, index: number) => (
              <tr key={investimento.id}>
                <td
                  className="align-middle"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc",
                  }}
                >
                  {investimento.id}
                </td>

                <td
                  className="align-middle"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc",
                  }}
                >
                  {obterNomeInvestimento(investimento.produtoId)}
                </td>

                <td
                  className="align-middle"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc",
                  }}
                >
                  {obterNomeInvestimento(investimento.produtoId)}
                </td>

                <td
                  className="align-middle"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc",
                  }}
                >
                  {investimento.quantidade}
                </td>

                <td
                  className="align-middle fw-bold text-success"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc",
                  }}
                >
                  {formatarMoeda(Number(investimento.valorUnitarioMedio))}
                </td>

                <td
                  className="align-middle"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc",
                  }}
                >
                  {formatarData(investimento.dataCompra)}
                </td>

                <td
                  className="align-middle text-center"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#b6cee2" : "#f8fafc",
                  }}
                >
                  <div className="dropdown text-center">
                    <button
                      className="btn btn-sm btn-primary dropdown-toggle fw-bold"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Ações
                    </button>

                    <ul className="dropdown-menu text-center">

                      <li>
                        <button
                          className="dropdown-item fw-bold"
                          onClick={() => editarInvestimento(investimento)}
                        >
                          Editar
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger fw-bold"
                          onClick={() => excluirInvestimento(investimento.id)}
                        >
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