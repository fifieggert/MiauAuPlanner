export class Animal {
    id?: number;
    nome: string;
    raca: string;
    idade: number;
    genero: string;
    peso: number;
    id_usuario: number;
    id_especie: number;

    constructor(nome: string, raca: string, idade: number, genero: string, peso: number, id_usuario: number, id_especie: number, id?: number) {
        this.id = id;
        this.nome = nome;
        this.raca = raca;
        this.idade = idade;
        this.genero = genero;
        this.peso = peso;
        this.id_usuario = id_usuario;
        this.id_especie = id_especie;
    }
}