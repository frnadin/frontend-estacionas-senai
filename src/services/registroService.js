import api from './api';

export const criarRegistro = async (dados) => {
  const response = await api.post('/registros', dados);
  return response.data;
};

export const criarRegistroAdmin = async (dados) => {
  const response = await api.post('/registros/admin', dados);
  return response.data;
};

export const listarRegistros = async () => {
  const response = await api.get('/registros');
  return response.data;
};
