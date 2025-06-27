export const camposPessoa = [
  { nome: "name", rotulo: "Nome", tipo: "text", obrigatorio: true, placeholder: "Digite seu nome completo" },
  { nome: "cpf", rotulo: "CPF", tipo: "text", obrigatorio: true, placeholder: "000.000.000-00" },

  { nome: "birth", rotulo: "Data de nascimento", tipo: "date", obrigatorio: true },
  
  { 
    nome: "type", 
    rotulo: "Tipo", 
    tipo: "select", 
    obrigatorio: true,
    opcoes: [
      { label: "Visitante", valor: "visitante" },
      { label: "Aluno", valor: "aluno" },
      { label: "Professor", valor: "professor" },
      { label: "Funcionario", valor: "funcionario" },
      { label: "Administrador", valor: "administrador" }
    ]
  },
  { nome: "email", rotulo: "Email", tipo: "email", obrigatorio: true, placeholder: "exemplo@email.com" },
  { nome: "registrationSenai", rotulo: "Matrícula SENAI", tipo: "text", obrigatorio: true, placeholder: "123456" },
  { nome: "phone", rotulo: "Telefone", tipo: "tel", obrigatorio: true, placeholder: "(99) 99999-9999" },
  { nome: "photo_url", rotulo: "Foto URL", tipo: "text", obrigatorio: true, placeholder: "https://..." },
  { nome: "password", rotulo: "Senha", tipo: "password", obrigatorio: true, placeholder: "Sua senha secreta" }
];
