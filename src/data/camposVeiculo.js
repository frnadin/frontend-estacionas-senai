export const camposVeiculos = [
  { nome: "plate", rotulo: "Placa", tipo: "text", placeholder: "Digite a placa", obrigatorio: true },
  { nome: "model", rotulo: "Modelo", tipo: "text", placeholder: "Digite o modelo", obrigatorio: true },
  { nome: "color", rotulo: "Cor", tipo: "text", placeholder: "Digite a cor", obrigatorio: true },
  { 
    nome: "type", 
    rotulo: "Tipo", 
    tipo: "select", 
    placeholder: "Selecione o tipo", 
    opcoes: [
      { label: "Carro", valor: "carro" },
      { label: "Moto", valor: "moto" },
      { label: "Outros", valor: "outro" }
    ], 
    obrigatorio: true 
  },
  { nome: "id_usuario", rotulo: "Usuário", tipo: "select", opcoes: [], placeholder: "Selecione o usuário", obrigatorio: true }, 
  { nome: "ativo", rotulo: "Ativo", tipo: "checkbox", obrigatorio: false }

];
