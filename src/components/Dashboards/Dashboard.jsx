import PieChartVagas from "./Pie";
import { useState, useEffect } from "react";
import api from "../../services/api.js";
import PieChartModelos from "./PieChartModelos.jsx";
import './Dashboard.css';
export default function Dashboard() {
    const [veiculos, setVeiculos] = useState([]);

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

// Conta quantos veículos de cada tipo existem
const tiposCount = veiculos.reduce((acc, veiculo) => {
    const tipo = veiculo.type;
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
}, {});

// Prepara os dados pro gráfico de tipos
const dataTipos = Object.keys(tiposCount).map((tipo) => ({
    name: tipo,
    value: tiposCount[tipo],
}));

    const [vagas, setVagas] = useState({
        total: 0,
        livres: 0,
        ocupadas: 0
    });

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

    const dataPie = [
        { name: 'Ocupadas', value: vagas.ocupadas },
        { name: 'Disponíveis', value: vagas.livres },
    ];

    return (
        <div className="container-dashboard">
            <div className="pie-chart">
                <PieChartVagas data={dataPie} />
            </div>
            <div>
                <PieChartModelos data={dataTipos} />
            </div>
        </div>
    );
}
