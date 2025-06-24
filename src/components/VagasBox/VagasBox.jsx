import React from 'react';
import './VagasBox.css';

export default function VagasBox({ total = 60, livres = 42, ocupadas = 18 }) {
  return (
    <div className="vagas-box">
      <h3>VAGAS</h3>
      <p className="vagas-total">TOTAL DE VAGAS: <strong>{total}</strong></p>
      <p className="vagas-livres">VAGAS LIVRES: <strong>{livres}</strong></p>
      <p className="vagas-ocupadas">VAGAS OCUPADAS: <strong>{ocupadas}</strong></p>
    </div>
  );
}
    