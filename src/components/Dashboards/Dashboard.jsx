import PieChartVagas from "./Pie";
import { useState, useEffect } from "react";
import api from "../../services/api.js";
import { listarRegistrosAbertos } from "../../services/registroService.js";
import PieChartModelos from "./PieChartModelos.jsx";
import './Dashboard.css';

export default function Dashboard() {
  const [ultimosAcessos, setUltimosAcessos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [vagas, setVagas] = useState({
    total: 0,
    livres: 0,
    ocupadas: 0
  });

  // Pega registros abertos
  useEffect(() => {
    const fetchAbertos = async () => {
      try {
        const data = await listarRegistrosAbertos();
        console.log("Registros abertos:", data);
        setUltimosAcessos(data);
      } catch (error) {
        console.error("Erro ao buscar registros abertos:", error);
      }
    };
    fetchAbertos();
  }, []);

  //  Pega veículos
  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await api.get('/veiculos');
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };
    fetchVeiculos();
  }, []);

  // Pega vagas
  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get('/registros/vagas-disponiveis');
        const { vagas_totais, vagas_disponiveis, vagas_ocupadas } = response.data;
        setVagas({
          total: vagas_totais,
          livres: vagas_disponiveis,
          ocupadas: vagas_ocupadas
        });
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };
    fetchVagas();
  }, []);

  // Conta tipos de veículos
  const tiposCount = veiculos.reduce((acc, veiculo) => {
    const tipo = veiculo.type;
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  const dataTipos = Object.keys(tiposCount).map((tipo) => ({
    name: tipo,
    value: tiposCount[tipo],
  }));

  const dataPie = [
    { name: 'Ocupadas', value: vagas.ocupadas },
    { name: 'Disponíveis', value: vagas.livres },
  ];

  return (
    <div className="container-dashboard">

      {/* Cards Resumo */}
      <div className="cards-resumo">
        <div className="card">
          <h3>Total</h3>
          <p>{vagas.total}</p>
        </div>
        <div className="card">
          <h3>Ocupadas</h3>
          <p>{vagas.ocupadas}</p>
        </div>
        <div className="card">
          <h3>Livres</h3>
          <p>{vagas.livres}</p>
        </div>
      </div>

      {/* Tabela Últimos Acessos */}
      <div className="tabela-acessos">
        <h2>Dentro do estacionas</h2>
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Entrada</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ultimosAcessos && ultimosAcessos.length > 0 ? (
              ultimosAcessos.map((acesso, index) => (
                <tr key={index}>
                  <td>{acesso.Veiculo?.plate}</td>
                  <td>{acesso.Veiculo?.model}</td>
                  <td>{acesso.Veiculo?.color}</td>
                  <td>{new Date(acesso.data_hora).toLocaleString()}</td>
                  <td className="user-table">{acesso.Pessoa?.name}</td>
                  <td style={{ color: 'green' }}>Dentro</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Nenhum registro encontrado</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Gráficos */}
      <div className="container-graficos">
        <div className="pie-chart">
          <h2>Vagas</h2>
          <PieChartVagas data={dataPie} />
        </div>

        <div className="pie-chart">
          <h2>Tipos de veículos</h2>
          <PieChartModelos data={dataTipos} />
        </div>

      </div>
    </div>
  );
}
