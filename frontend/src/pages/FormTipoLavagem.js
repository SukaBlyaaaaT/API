import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function FormTipoLavagem() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [tempoEstimado, setTempoEstimado] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  async function carregarTipo() {
    if (!id) return;

    try {
      const resposta = await api.get(`/tipos-lavagem/${id}`);
      setNome(resposta.data.nome);
      setValor(resposta.data.valor);
      setTempoEstimado(resposta.data.tempo_estimado);
    } catch (error) {
      alert("Erro ao carregar tipo de lavagem");
    }
  }

  async function salvar(e) {
    e.preventDefault();


    
    const dados = {
      nome,
      valor: Number(valor),
      tempo_estimado: Number(tempoEstimado)
    };

    try {
      if (id) {
        await api.put(`/tipos-lavagem/${id}`, dados);
        alert("Tipo atualizado com sucesso!");
      } else {
        await api.post("/tipos-lavagem", dados);
        alert("Tipo cadastrado com sucesso!");
      }

      navigate("/tipos");
    } catch (error) {
      alert("Erro ao salvar tipo de lavagem");
    }
  }

  useEffect(() => {
    carregarTipo();
  }, [id]);

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h4>{id ? "Editar Tipo de Lavagem" : "Cadastrar Tipo de Lavagem"}</h4>
      </div>

      <div className="card-body">
        <form onSubmit={salvar}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Valor</label>
            <input
              type="number"
              className="form-control"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tempo Estimado</label>
            <input
              type="number"
              className="form-control"
              value={tempoEstimado}
              onChange={(e) => setTempoEstimado(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success me-2" type="submit">
            Salvar
          </button>

          <Link className="btn btn-secondary" to="/tipos">
            Voltar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default FormTipoLavagem;