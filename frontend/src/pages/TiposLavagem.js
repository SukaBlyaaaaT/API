import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function TiposLavagem() {
  const [tipos, setTipos] = useState([]);

  async function carregarTipos() {
    try {
      const resposta = await api.get("/tipos-lavagem");
      setTipos(resposta.data);
    } catch (error) {
      alert("Erro ao carregar tipos de lavagem");
    }
  }

  async function excluirTipo(id) {
    if (!window.confirm("Deseja excluir este tipo de lavagem?")) return;

    try {
      await api.delete(`/tipos-lavagem/${id}`);
      alert("Tipo excluído com sucesso!");
      carregarTipos();
    } catch (error) {
      alert("Erro ao excluir tipo de lavagem");
    }
  }

  useEffect(() => {
    carregarTipos();
  }, []);

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h4>Tipos de Lavagem</h4>

        <Link className="btn btn-light" to="/tipos/novo">
          Novo Tipo
        </Link>
      </div>

      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Valor</th>
              <th>Tempo Estimado</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {tipos.map((tipo) => (
              <tr key={tipo.id}>
                <td>{tipo.id}</td>
                <td>{tipo.nome}</td>
                <td>R$ {tipo.valor}</td>
                <td>{tipo.tempo_estimado} horas</td>
                <td>
                  <Link
                    className="btn btn-warning btn-sm me-2"
                    to={`/tipos/editar/${tipo.id}`}
                  >
                    Editar
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluirTipo(tipo.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {tipos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhum tipo cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TiposLavagem;