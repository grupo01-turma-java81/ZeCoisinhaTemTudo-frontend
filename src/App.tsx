import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import ListaPedidos from "./components/pedidos/listapedidos/ListaPedidos";
import ListaClientes from "./components/clientes/listaclientes/ListaClientes";
import FormClientes from "./components/clientes/formclientes/FormClientes";
import DeletarClientes from "./components/clientes/deletarcliente/DeletarClientes";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/pedidos" element={<ListaPedidos />} />
            <Route path="/clientes" element={<ListaClientes />} />
            <Route path="/cadastrarcliente" element={<FormClientes />} />
            <Route path="/editarcliente/:cpf" element={<FormClientes />} />
            <Route path="/deletarcliente/:cpf" element={<DeletarClientes/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;;