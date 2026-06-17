import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function FormAtendimento() {
  const [cliente, setCliente] = useState("");
  const [placa, setPlaca] = useState("");
  const [TipoLavagemId, setTipoLavagemId] = useState("");
  const [tipos, setTipos] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  async function carregarTipos() {
    try {
      const resposta = await api.get("/tipos-lavagem");
      setTipos(resposta.data);
    } catch (error) {
      alert("Erro ao carregar tipos de lavagem");
    }
  }

  async function carregarAtendimento() {
    if (!id) return;

    try {
      const resposta = await api.get(`/atendimentos/${id}`);

      setCliente(resposta.data.cliente);
      setPlaca(resposta.data.placa);
      setTipoLavagemId(resposta.data.TipoLavagemId);
    } catch (error) {
      alert("Erro ao carregar atendimento");
    }
  }

  async function salvar(e) {
  e.preventDefault();

  const dados = {
    cliente,
    placa,
    TipoLavagemId: Number(TipoLavagemId),
    tipoLavagemId: Number(TipoLavagemId)
  };

  try {
    if (id) {
      await api.put(`/atendimentos/${id}`, dados);
      alert("Atendimento atualizado com sucesso!");
    } else {
      await api.post("/atendimentos", dados);
      alert("Atendimento cadastrado com sucesso!");
    }

    navigate("/atendimentos");
  } catch (error) {
    console.log(error.response?.data || error);
    alert("Erro ao salvar atendimento");
  }
}

  useEffect(() => {
    carregarTipos();
    carregarAtendimento();
  }, [id]);

  return (
    <div className="card shadow">
      <div className="card-header bg-success text-white">
        <h4>{id ? "Editar Atendimento" : "Cadastrar Atendimento"}</h4>
      </div>

      <div className="card-body">
        <form onSubmit={salvar}>
          <div className="mb-3">
            <label className="form-label">Cliente</label>
            <input
              className="form-control"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Placa</label>
            <input
              className="form-control"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo de Lavagem</label>
            <select
              className="form-select"
              value={TipoLavagemId}
              onChange={(e) => setTipoLavagemId(e.target.value)}
              required
            >
              <option value="">Selecione</option>

              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome} - R$ {tipo.valor}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-success me-2" type="submit">
            Salvar
          </button>

          <Link className="btn btn-secondary" to="/atendimentos">
            Voltar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default FormAtendimento;