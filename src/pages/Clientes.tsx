import { useEffect, useState } from "react";
import zenBg from "/assets/img/fundoTextura.png";
import {
  buscarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente,
} from "../services/api";

export default function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [idEditando, setIdEditando] = useState<number | null>(null);

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    const dados = await buscarClientes();
    setClientes(dados);
  }

  async function salvarCliente(e: any) {
    e.preventDefault();

    const cliente = {
      nome,
      email,
      senha,
    };

    if (idEditando) {
      await atualizarCliente(idEditando, cliente);
      setIdEditando(null);
    } else {
      await criarCliente(cliente);
    }

    await carregarClientes();

    setNome("");
    setEmail("");
    setSenha("");
  }

  function editarCliente(cliente: any) {
    setIdEditando(cliente.id);
    setNome(cliente.nome);
    setEmail(cliente.email);
    setSenha(cliente.senha);
  }

  async function excluirCliente(id: number) {
    await deletarCliente(id);
    await carregarClientes();
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
        <h1 className="fw-bold mb-2">Clientes</h1>
      </div>

      <form onSubmit={salvarCliente} className="bg-white p-4 rounded mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente: any) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarCliente(cliente)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluirCliente(cliente.id)}
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