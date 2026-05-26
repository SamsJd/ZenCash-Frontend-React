import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Transacoes from "../pages/Transacoes";
import Investimentos from "../pages/Investimentos";
import Clientes from "../pages/Clientes";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <div className="d-flex flex-column min-vh-100">

        <Navbar />

        <main className="flex-grow-1">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/transacoes" element={<Transacoes />} />
            <Route path="/investimentos" element={<Investimentos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}