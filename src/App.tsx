import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ListaPedidos from "./components/pedidos/listapedidos/ListaPedidos";
import { AuthProvider } from "./contexts/AuthContext";
import FormPedido from "./components/pedidos/formpedido/FormPedido";
import DeletarPedido from "./components/pedidos/deletarpedido/DeletarPedido";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="mx-auto min-h-[calc(100vh-64px)]">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/" element={<ListaPedidos />} />
              <Route path="/pedidos" element={<ListaPedidos />} />
              <Route path="/cadastrarpedido" element={<FormPedido />} />
              <Route path="/cadastrarpedido/:id" element={<FormPedido />} />
              <Route path="/deletarpedido/:id" element={<DeletarPedido />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
