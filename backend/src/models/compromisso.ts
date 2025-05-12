export class Compromisso{
    id?: number;
    data_compromissos: any;
    ID_animal: number;
    observacoes: string;
    id_vacina: number;

    constructor(data_compromissos: any, ID_animal: number, observacoes: string, id_vacina: number, id: number) {
        this.id = id;
        this.data_compromissos = data_compromissos;
        this.ID_animal = ID_animal;
        this.observacoes = observacoes;
        this.id_vacina = id_vacina;
    }
}