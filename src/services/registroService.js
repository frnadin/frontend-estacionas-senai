import api from "./api";

export const listarRegistros = async () => {
  const response = await api.get('/registros');
  return response.data;
};  