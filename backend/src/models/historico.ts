export class Historico {
    id?: any;
    data_historico: any;
    id_animal: any;
    observacoes: string;

    constructor(data_historico: any, id_animal: any, observacoes: string, id: number) {
        this.id = id;
        this.data_historico = data_historico;
        this.id_animal = id_animal;
        this.observacoes = observacoes;
    }
}