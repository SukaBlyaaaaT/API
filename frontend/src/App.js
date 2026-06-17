import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TiposLavagem from "./pages/TiposLavagem";
import FormTipoLavagem from "./pages/FormTipoLavagem";
import Atendimentos from "./pages/Atendimentos";
import FormAtendimento from "./pages/FormAtendimento";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">
          Sistema de Lavação
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/tipos">
            Tipos de Lavagem
          </Link>

          <Link className="btn btn-outline-light" to="/atendimentos">
            Atendimentos
          </Link>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Atendimentos />} />

          <Route path="/tipos" element={<TiposLavagem />} />
          <Route path="/tipos/novo" element={<FormTipoLavagem />} />
          <Route path="/tipos/editar/:id" element={<FormTipoLavagem />} />

          <Route path="/atendimentos" element={<Atendimentos />} />
          <Route path="/atendimentos/novo" element={<FormAtendimento />} />
          <Route path="/atendimentos/editar/:id" element={<FormAtendimento />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;