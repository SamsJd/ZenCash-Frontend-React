import { useEffect, useState } from "react";
import { buscarInvestimentos } from "../services/api";

export default function Investimentos() {
  const [investimentos, setInvestimentos] = useState([]);

useEffect(() => {
  buscarInvestimentos().then((dados) => {
    setInvestimentos(dados);
  });
}, []);

  // async function carregarInvestimentos() {
  //   const dados = await buscarInvestimentos();
  //   setInvestimentos(dados);
  // }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-white">Investimentos</h1>

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}