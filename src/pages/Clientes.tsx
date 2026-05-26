import { useEffect, useState } from "react";
import { buscarClientes } from "../services/api";

export default function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  
useEffect(() => {
  buscarClientes().then((dados) => {
    setClientes(dados);
  });
}, []);
  
  // async function carregarClientes() {
  //   const dados = await buscarClientes();
  //   setClientes(dados);
  // }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-white">Clientes</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered bg-white">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente: any) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}