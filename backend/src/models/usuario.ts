export class Usuario {
  id?: number;
  nome: string;
  telefone: string;
  cpf: string;
  email: string;
  senha: string;

  constructor(nome: string, telefone: string, cpf: string, email: string, senha: string, id?: number) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
  }
}
