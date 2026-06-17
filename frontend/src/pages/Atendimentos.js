import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState([]);

  async function carregarAtendimentos() {
    try {
      const resposta = await api.get("/atendimentos");
      setAtendimentos(resposta.data);
    } catch (error) {
      alert("Erro ao carregar atendimentos");
    }
  }

  async function excluirAtendimento(id) {
    if (!window.confirm("Deseja excluir este atendimento?")) return;

    try {
      await api.delete(`/atendimentos/${id}`);
      alert("Atendimento excluído com sucesso!");
      carregarAtendimentos();
    } catch (error) {
      alert("Erro ao excluir atendimento");
    }
  }

  async function finalizarAtendimento(id) {
    const dataFim = prompt("Informe a data final no formato: 2026-06-09 18:00");

    if (!dataFim) return;

    try {
      await api.put(`/atendimentos/${id}/finalizar`, {
        data_fim: dataFim
      });

      alert("Atendimento finalizado com sucesso!");
      carregarAtendimentos();
    } catch (error) {
      alert("Erro ao finalizar atendimento");
    }
  }

  useEffect(() => {
    carregarAtendimentos();
  }, []);

  return (
    <div className="card shadow">
      <div className="card-header bg-success text-white d-flex justify-content-between">
        <h4>Atendimentos</h4>

        <Link className="btn btn-light" to="/atendimentos/novo">
          Novo Atendimento
        </Link>
      </div>

      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Valor Final</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {atendimentos.map((atendimento) => (
              <tr key={atendimento.id}>
                <td>{atendimento.id}</td>
                <td>{atendimento.cliente}</td>
                <td>{atendimento.placa}</td>
                <td>{atendimento.TipoLavagem?.nome}</td>
                <td>{atendimento.data_inicio}</td>
                <td>{atendimento.data_fim || "Em andamento"}</td>
                <td>
                  {atendimento.valor_final
                    ? `R$ ${atendimento.valor_final}`
                    : "-"}
                </td>

                <td>
                  <Link
                    className="btn btn-warning btn-sm me-2"
                    to={`/atendimentos/editar/${atendimento.id}`}
                  >
                    Editar
                  </Link>

                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => finalizarAtendimento(atendimento.id)}
                  >
                    Finalizar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluirAtendimento(atendimento.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {atendimentos.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  Nenhum atendimento cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Atendimentos;
