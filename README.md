# 💸 ZenCash - Sistema Financeiro

Projeto desenvolvido para a atividade **Cap 14 - Grand Finale**, integrando:

- Java
- Spring Boot
- Oracle Database
- ReactJS

O sistema permite o gerenciamento de:

- Clientes
- Transações
- Investimentos

---

# 📚 Tecnologias Utilizadas

## Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Oracle Database
- Maven

## Frontend
- ReactJS
- TypeScript
- Bootstrap
- React Router DOM
- Axios

---

# ⚙️ Funcionalidades

## 👤 Clientes
- Cadastrar clientes
- Atualizar clientes
- Excluir clientes
- Listar clientes

## 💰 Transações
- Cadastro de receitas
- Cadastro de gastos
- Atualização de transações
- Exclusão de transações

## 📈 Investimentos
- Cadastro de investimentos
- Atualização de investimentos
- Exclusão de investimentos
- Controle de patrimônio investido

## 🔐 Autenticação
- Tela de login
- Logout
- Toasts de autenticação
- Usuário de teste

---

# 🔑 Dados de Login

```txt
Email: admin@zencash.com
Senha: 123456
```

---

# 🚀 Como executar o Backend

## 1. Abrir o projeto backend no IntelliJ

## 2. Configurar o Oracle Database FIAP

Editar o arquivo:

```txt
src/main/resources/application.properties
```

Adicionar/configurar:

```properties
spring.datasource.url=SEU_URL_ORACLE
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## 3. Instalar dependências Maven

```bash
mvn clean install
```

---

## 4. Executar o projeto

Rodar a classe principal Spring Boot.

Backend será iniciado em:

```txt
http://localhost:8080
```

---

# 🚀 Como executar o Frontend

## 1. Abrir o projeto frontend

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Executar o projeto

```bash
npm run dev
```

Frontend será iniciado em:

```txt
http://localhost:5173
```

---

# 🔗 Integração Frontend + Backend

O frontend consome APIs REST desenvolvidas em Spring Boot utilizando Axios.

Exemplo de endpoints:

```txt
GET /transacoes
POST /transacoes
PUT /transacoes/{id}
DELETE /transacoes/{id}
```

---

# 📁 Estrutura do Projeto

## Backend
```txt
backend/
├── model
├── repository
├── service
├── controller
```

## Frontend
```txt
frontend/
├── assets
├── components
├── pages
├── services
├── routes
```

---

# ✅ Requisitos Atendidos

- CRUD completo
- Integração React + Spring Boot
- Oracle Database FIAP
- SPA com React Router
- Componentização
- Hooks
- Página de Login
- Página Home
- Página 404
- Consumo de APIs REST
- 3 entidades completas

---

# 👩‍💻 Desenvolvido por

Sâmara Jeise Dias  
RM: 567002