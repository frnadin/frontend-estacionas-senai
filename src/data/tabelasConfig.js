export const usuariosConfig = {
  titulo: "Usuários",
  colunas: [
    { chave: 'name', rotulo: 'Nome' },
    { chave: 'email', rotulo: 'Email' },
    { chave: 'cpf', rotulo: 'CPF' },
    { chave: 'type', rotulo: 'Tipo' },
    { chave: 'registrationSenai', rotulo: 'Matrícula SENAI' },
    { chave: 'phone', rotulo: 'Telefone' },
  ],
  filtros: ['name', 'email', 'cpf', 'type', 'registrationSenai', 'phone']
};

export const veiculosConfig = {
  titulo: "Veículos",
  colunas: [
    { chave: 'placa', rotulo: 'Placa' },
    { chave: 'modelo', rotulo: 'Modelo' },
    { chave: 'cor', rotulo: 'Cor' },
    { chave: 'tipo', rotulo: 'Tipo' }
  ],
  filtros: ['placa', 'modelo', 'cor', 'tipo']
};
