import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ListaPedidos from "./components/pedidos/listapedidos/ListaPedidos";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div className="mx-auto min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/pedidos" element={<ListaPedidos />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
