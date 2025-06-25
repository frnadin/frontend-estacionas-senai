export const camposPermissao = [
  {
    nome: "pessoa_id",
    rotulo: "Pessoa",
    tipo: "select",
    opcoes: [],
    obrigatorio: true,
  },
  {
    nome: "veiculo_id",
    rotulo: "Veículo",
    tipo: "select",
    opcoes: [], 
    obrigatorio: true,
  },
  {
    nome: "validade",
    rotulo: "Validade",
    tipo: "date",
    obrigatorio: true,
  },
  {
    nome: "motivo_bloqueio",
    rotulo: "Motivo do Bloqueio",
    tipo: "text",
    obrigatorio: false,
  },
  {
    nome: "autorizado",
    rotulo: "Autorizado",
    tipo: "checkbox",
    obrigatorio: false,
  }
];
