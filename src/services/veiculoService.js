import api from './api';

export const criarVeiculo = async (dados) => {
  const response = await api.post('/veiculos', dados);
  return response.data;
};

export const listarVeiculos = async () => {
  const response = await api.get('/veiculos');
  return response.data;
};

export const buscarVeiculoPorId = async (id) => {
  const response = await api.get(`/veiculos/${id}`);
  return response.data;
};

export const atualizarVeiculo = async (id, dados) => {
  const response = await api.put(`/veiculos/${id}`, dados);
  return response.data;
};

export const deletarVeiculo = async (id) => {
  const response = await api.delete(`/veiculos/${id}`);
  return response.data;
};

export const buscarVeiculosPorUsuario = async (usuarioId) => {
  const response = await api.get(`/veiculos/dono/${usuarioId}`);
  return response.data;
};
