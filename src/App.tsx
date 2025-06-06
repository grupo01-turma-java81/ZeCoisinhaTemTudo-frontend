import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import ListaPedidos from "./components/pedidos/listapedidos/ListaPedidos";
import FormPedido from "./components/pedidos/formpedido/FormPedido";
import DeletarPedido from "./components/pedidos/deletarpedido/DeletarPedido";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/pedidos" element={<ListaPedidos />} />
            <Route path="/cadastrarpedido" element={<FormPedido />} />
            <Route path="/cadastrarpedido/:id" element={<FormPedido />} />
            <Route path="/deletarpedido/:id" element={<DeletarPedido />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
