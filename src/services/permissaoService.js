import api from './api';

export const criarPermissao = async (dados) => {
  const response = await api.post('/permissoes', dados);
  return response.data;
};

export const listarPermissoes = async () => {
  const response = await api.get('/permissoes');
  return response.data;
};

