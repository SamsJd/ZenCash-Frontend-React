import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Transacoes from "../pages/Transacoes";
import Investimentos from "../pages/Investimentos";
import Clientes from "../pages/Clientes";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/investimentos" element={<Investimentos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}