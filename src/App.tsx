import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import ListaPedidos from "./components/pedidos/listapedidos/ListaPedidos";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/pedidos" element={<ListaPedidos />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
