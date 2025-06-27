export const usuariosConfig = {
  titulo: "Usuários Cadastrados",
  colunas: [
    { chave: "name", rotulo: "Nome" },
    { chave: "email", rotulo: "Email" },
    { chave: "cpf", rotulo: "CPF" },
    { chave: "type", rotulo: "Tipo" },
    { chave: "registrationSenai", rotulo: "Matrícula SENAI" },
    { chave: "phone", rotulo: "Telefone" },
  ],
  filtros: ["name", "email", "cpf", "type", "registrationSenai", "phone"],
};

export const veiculosConfig = {
  titulo: "Veiculos Cadastrados",
  colunas: [
    { chave: "plate", rotulo: "Placa" },
    { chave: "model", rotulo: "Modelo" },
    { chave: "color", rotulo: "Cor" },
    { chave: "type", rotulo: "Tipo" },
    { chave: "Pessoa.name", rotulo: "Proprietário" },
    { chave: "Pessoa.email", rotulo: "Email do Proprietário" },
  ],
  filtros: ["plate", "model", "color", "type", "Pessoa.name", "Pessoa.email"],
};

export const permissoesConfig = {
  titulo: "Permissões Cadastradas",
  colunas: [
    { chave: "Pessoa.name", rotulo: "Usuário" },
    { chave: "Veiculo.plate", rotulo: "Placa do Veículo" },
    { chave: "Veiculo.model", rotulo: "Modelo do Veículo" },
    { chave: "Veiculo.color", rotulo: "Cor" },
    { chave: "autorizado", rotulo: "Autorizado" },
    { chave: "validade", rotulo: "Validade" },
    { chave: "motivo_bloqueio", rotulo: "Motivo do Bloqueio" },
  ],
  filtros: [
    "Pessoa.name",
    "Pessoa.email",
    "Veiculo.plate",
    "Veiculo.model",
    "Veiculo.color",
    "autorizado",
    "validade",
    "motivo_bloqueio"
  ],
};

export const registrosConfig = {
  titulo: "Registros de Acesso",
  colunas: [
    { chave: "id", rotulo: "ID" },
    { chave: "data_hora", rotulo: "Data/Hora" },
    { chave: "tipo", rotulo: "Tipo" }, // entrada/saida
    { chave: "Pessoa.name", rotulo: "Usuário" },
    { chave: "Veiculo.plate", rotulo: "Placa do Veículo" },
    { chave: "Veiculo.model", rotulo: "Modelo do Veículo" },
    { chave: "autorizado", rotulo: "Autorizado" },
    { chave: "motivo_bloqueio", rotulo: "Motivo do Bloqueio" },
  ],
  filtros: [
    "id",
    "data_hora",
    "tipo",
    "Pessoa.name",
    "Veiculo.plate",
    "Veiculo.model",
    "autorizado",
    "motivo_bloqueio"
  ],
};