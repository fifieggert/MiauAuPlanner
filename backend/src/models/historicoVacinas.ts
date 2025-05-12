export class HistoricoVacinas {
    id?: number; 
    ID_historico: number;
    ID_vacina: number;

    constructor (ID_historico: number, ID_vacina: number, id: number){
        this.id = id;
        this.ID_historico = ID_historico;
        this.ID_vacina  = ID_vacina;
    }
}