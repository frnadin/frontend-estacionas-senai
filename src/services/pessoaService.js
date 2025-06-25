import api from './api'; 

export const criarPessoa = async (dados) => {
  const response = await api.post('/pessoas', dados);
  return response.data;
};

export const listarPessoas = async () => {
  const response = await api.get('/pessoas');
  return response.data;
};

export const buscarPessoaPorId = async (id) => {
  const response = await api.get(`/pessoas/${id}`);
  return response.data;
};

export const atualizarPessoa = async (id, dados) => {
  const response = await api.put(`/pessoas/${id}`, dados);
  return response.data;
};

export const deletarPessoa = async (id) => {
  const response = await api.delete(`/pessoas/${id}`);
  return response.data;
};
