const API_URL = "http://localhost:8080";

// TRANSAÇÕES
export async function buscarTransacoes() {
  const resposta = await fetch(`${API_URL}/transacoes`);
  return resposta.json();
}

export async function criarTransacao(transacao: any) {
  const resposta = await fetch(`${API_URL}/transacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transacao),
  });

  return resposta.json();
}

export async function atualizarTransacao(id: number, transacao: any) {
  const resposta = await fetch(`${API_URL}/transacoes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transacao),
  });

  return resposta.json();
}

export async function deletarTransacao(id: number) {
  await fetch(`${API_URL}/transacoes/${id}`, {
    method: "DELETE",
  });
}

// INVESTIMENTOS
export async function buscarInvestimentos() {
  const resposta = await fetch(`${API_URL}/investimentos`);
  return resposta.json();
}

export async function criarInvestimento(investimento: any) {
  const resposta = await fetch(`${API_URL}/investimentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(investimento),
  });

  return resposta.json();
}

export async function atualizarInvestimento(id: number, investimento: any) {
  const resposta = await fetch(`${API_URL}/investimentos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(investimento),
  });

  return resposta.json();
}

export async function deletarInvestimento(id: number) {
  await fetch(`${API_URL}/investimentos/${id}`, {
    method: "DELETE",
  });
}

// CLIENTES
export async function buscarClientes() {
  const resposta = await fetch(`${API_URL}/clientes`);
  return resposta.json();
}