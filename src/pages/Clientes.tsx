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

      <form
        onSubmit={salvarCliente}
        className="p-4 rounded mb-4 shadow-sm"
        style={{
          backgroundImage: `linear-gradient(rgba(189, 212, 233, 0.4), rgba(205, 207, 209, 0.73)), url(${zenBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">
              Nome Completo
            </label>

            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do cliente"
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cliente@email.com"
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">
              Senha
            </label>

            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite uma senha"
              required
            />
          </div>
        </div>

        <button className="btn btn-success w-100 fw-bold">
          {idEditando
            ? "Atualizar Cliente"
            : "Cadastrar Cliente"}
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
              <th
                style={{
                  backgroundColor: "#075eaac7",
                  color: "white",
                }}
              >
                ID
              </th>

              <th
                style={{
                  backgroundColor: "#075eaac7",
                  color: "white",
                }}
              >
                Nome
              </th>

              <th
                style={{
                  backgroundColor: "#075eaac7",
                  color: "white",
                }}
              >
                Email
              </th>

              <th
                style={{
                  backgroundColor: "#075eaac7",
                  color: "white",
                }}
              >
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente: any, index: number) => (
              <tr key={cliente.id}>

                <td
                  className="align-middle"
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "#b6cee2"
                        : "#f8fafc",
                  }}
                >
                  {cliente.id}
                </td>

                <td
                  className="align-middle fw-semibold"
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "#b6cee2"
                        : "#f8fafc",
                  }}
                >
                  {cliente.nome}
                </td>

                <td
                  className="align-middle"
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "#b6cee2"
                        : "#f8fafc",
                  }}
                >
                  {cliente.email}
                </td>

                <td
                  className="align-middle text-center"
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "#b6cee2"
                        : "#f8fafc",
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
                          onClick={() => editarCliente(cliente)}
                        >
                          Editar
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger fw-bold"
                          onClick={() => excluirCliente(cliente.id)}
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