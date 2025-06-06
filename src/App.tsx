import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ListaPedidos from "./components/pedidos/listapedidos/ListaPedidos";
import ListaClientes from "./components/clientes/listaclientes/ListaClientes";
import FormClientes from "./components/clientes/formclientes/FormClientes";
import DeletarClientes from "./components/clientes/deletarcliente/DeletarClientes";
import { AuthProvider } from "./contexts/AuthContext";
import FormPedido from "./components/pedidos/formpedido/FormPedido";
import DeletarPedido from "./components/pedidos/deletarpedido/DeletarPedido";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";

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
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/pedidos" element={<ListaPedidos />} />
              <Route path="/clientes" element={<ListaClientes />} />
              <Route path="/cadastrarcliente" element={<FormClientes />} />
              <Route path="/editarcliente/:cpf" element={<FormClientes />} />
              <Route path="/deletarcliente/:cpf" element={<DeletarClientes/>} />
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

export default App;;