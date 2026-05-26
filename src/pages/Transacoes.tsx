import { useEffect, useState } from "react";
import { buscarTransacoes } from "../services/api";

export default function Transacoes() {

  const [transacoes, setTransacoes] = useState([]);

useEffect(() => {
  buscarTransacoes().then((dados) => {
    setTransacoes(dados);
  });
}, []);

  // async function carregarTransacoes() {
  //   const dados = await buscarTransacoes();
  //   setTransacoes(dados);
  // }

  return (
    <div className="container mt-4">

      <h1 className="mb-4 text-white">
        Transações
      </h1>

      <div className="table-responsive">

        <table className="table table-striped table-bordered bg-white">

          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
            </tr>
          </thead>

          <tbody>

            {transacoes.map((transacao: any) => (
              <tr key={transacao.id}>

                <td>{transacao.id}</td>

                <td>{transacao.descricao}</td>

                <td>
                  R$ {transacao.valor}
                </td>

                <td>
                  {transacao.tipoTransacaoId}
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}