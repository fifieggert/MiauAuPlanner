export class User {
  id?: number;
  nome: string;
  telefone: string;
  cpf: string;
  email: string;

  constructor(nome: string, telefone: string, cpf: string, email: string, id?: number) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.cpf = cpf;
    this.email = email;
  }
}
