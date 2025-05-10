export class Vacina {
    id?: number;
    nome_vacina: string;
    dose: string;
    fabricante: string;
    id_animal: number;
    id_historico: number;

    constructor(nome_vacina: string, dose: string, fabricante: string, id_animal: number, id_historico: number, id: number) {
        this.id = id;
        this.nome_vacina = nome_vacina;
        this.dose = dose;
        this.fabricante = fabricante;
        this.id_animal = id_animal;
        this.id_historico = id_historico;
    }
}