const API_URL = "http://localhost:8080";

export async function buscarTransacoes() {
  const resposta = await fetch(`${API_URL}/transacoes`);
  return resposta.json();
}

export async function buscarInvestimentos() {
  const resposta = await fetch(`${API_URL}/investimentos`);
  return resposta.json();
}

export async function buscarClientes() {
  const resposta = await fetch(`${API_URL}/clientes`);
  return resposta.json();
}