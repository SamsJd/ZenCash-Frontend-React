import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5 text-white">

      <h1
        style={{
          fontSize: "120px",
          fontWeight: "bold",
        }}
      >
        404
      </h1>

      <h2 className="mb-3">
        Página não encontrada
      </h2>

      <p className="mb-4">
        A página que você tentou acessar não existe.
      </p>

      <Link to="/" className="btn btn-light">
        Voltar para Home
      </Link>

    </div>
  );
}