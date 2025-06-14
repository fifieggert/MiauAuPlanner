export class Compromisso {
    id?: number;
    data_compromissos: Date;
    horario_compromissos: string;
    ID_animal: number;
    ID_tipo: number;
    observacoes: string;

    constructor(data_compromissos: Date, horario_compromissos: string, ID_animal: number, ID_tipo: number, observacoes: string, id?: number) {
        this.id = id;
        this.data_compromissos = data_compromissos;
        this.horario_compromissos = horario_compromissos;
        this.ID_animal = ID_animal;
        this.ID_tipo = ID_tipo;
        this.observacoes = observacoes;
    }
}