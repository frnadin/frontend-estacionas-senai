export const camposRegistro = [
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
    nome: "tipo",
    rotulo: "Tipo",
    tipo: "select",
    opcoes: [
      { valor: "entrada", label: "Entrada" },
      { valor: "saida", label: "Saída" },
    ],
    obrigatorio: true,
  }
];
