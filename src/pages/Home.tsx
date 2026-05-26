import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-5">
      <div className="text-white mb-4">
        <h1 className="fw-bold">Bem-vinda ao ZenCash</h1>
        <p className="fs-5">
          Controle suas transações, investimentos e clientes em um só lugar.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5 className="card-title">Transações</h5>
              <p className="card-text">
                Cadastre, consulte, edite e exclua receitas e despesas.
              </p>
              <Link to="/transacoes" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5 className="card-title">Investimentos</h5>
              <p className="card-text">
                Gerencie sua carteira de investimentos.
              </p>
              <Link to="/investimentos" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">
                Controle os usuários cadastrados no sistema.
              </p>
              <Link to="/clientes" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}