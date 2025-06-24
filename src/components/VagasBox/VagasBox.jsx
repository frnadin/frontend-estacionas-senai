import React, { useEffect, useState } from 'react';
import './VagasBox.css';
import api from '../../services/api.js';

export default function VagasBox() {
  const [vagas, setVagas] = useState({
    total: 0,
    livres: 0,
    ocupadas: 0
  });

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get('/registros/vagas-disponiveis');
        console.log("Dados das vagas:", response.data);

        const { vagas_totais, vagas_disponiveis, vagas_ocupadas } = response.data;
        
        setVagas({
          total: vagas_totais,
          livres: vagas_disponiveis,
          ocupadas: vagas_ocupadas
        }); console.log("Vagas atualizadas:", vagas);

      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    }
    fetchVagas();
  }, []);

  return (
    <div className="vagas-box">
      <h3>VAGAS</h3>
      <p className="vagas-total">TOTAL DE VAGAS: <strong>{vagas.total}</strong></p>
      <p className="vagas-livres">VAGAS LIVRES: <strong>{vagas.livres}</strong></p>
      <p className="vagas-ocupadas">VAGAS OCUPADAS: <strong>{vagas.ocupadas}</strong></p>
    </div>
  );
}
