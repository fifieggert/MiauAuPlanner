export class Compromisso {
    id?: number;
    data_compromissos: Date;
    ID_animal: number;
    observacoes: string;

    constructor(data_compromissos: Date, ID_animal: number, observacoes: string, id: number) {
        this.id = id;
        this.data_compromissos = data_compromissos;
        this.ID_animal = ID_animal;
        this.observacoes = observacoes;
    }
}