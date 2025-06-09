import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ListaPedidos from "./components/pedidos/listapedidos/ListaPedidos";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import ListaClientes from "./components/clientes/listaclientes/ListaClientes";
import Perfil from "./components/perfil/Perfil";

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
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
