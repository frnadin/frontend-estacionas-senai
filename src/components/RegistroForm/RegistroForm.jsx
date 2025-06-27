import React, { useEffect, useState } from 'react';
import { criarRegistro } from '../../services/registroService';
import { listarPessoas } from '../../services/pessoaService';
import { buscarVeiculosPorUsuario } from '../../services/veiculoService';
import './RegistroForm.css'


export default function RegistroForm({ onRegistroCriado }) {
  const [formData, setFormData] = useState({
    pessoa_id: '',
    veiculo_id: '',
    tipo: 'entrada',
  });

  const [pessoas, setPessoas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    const carregarPessoas = async () => {
      try {
        const dados = await listarPessoas();
        setPessoas(dados);
      } catch (error) {
        console.error("Erro ao carregar pessoas", error);
      }
    };
    carregarPessoas();
  }, []);

  useEffect(() => {
    const carregarVeiculos = async () => {
      if (formData.pessoa_id) {
        try {
          const dados = await buscarVeiculosPorUsuario(formData.pessoa_id);
          setVeiculos(dados);
        } catch (error) {
          console.error("Erro ao carregar veículos do usuário", error);
          setVeiculos([]);
        }
      } else {
        setVeiculos([]);
      }
    };
    carregarVeiculos();
  }, [formData.pessoa_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'pessoa_id' ? { veiculo_id: '' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarRegistro(formData);
      alert("Registro criado com sucesso!");
      setFormData({ pessoa_id: '', veiculo_id: '', tipo: 'entrada' });
      setVeiculos([]);
      if (onRegistroCriado) onRegistroCriado();
    } catch (error) {
      console.error("Erro ao criar registro", error);
      alert("Erro ao criar registro.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registro-form" style={{ margin: '0 auto' }}>

      <h2 className="form-title">Criar Registro</h2>

      <div className="form-group">
        <label>Pessoa:</label>
        <select name="pessoa_id" value={formData.pessoa_id} onChange={handleChange} required>
          <option value="">Selecione uma pessoa</option>
          {pessoas.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Veículo:</label>
        <select name="veiculo_id" value={formData.veiculo_id} onChange={handleChange} required disabled={!formData.pessoa_id}>
          <option value="">Selecione um veículo</option>
          {veiculos.map(v => (
            <option key={v.id} value={v.id}>{v.plate} - {v.model}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Tipo:</label>
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </div>
      <div className="form-group form-group-botao">
        <button type="submit" className="botao-submit">Registrar</button>
      </div>

    </form>

  );
}
