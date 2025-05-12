export class CompromissosVacinas {
    id?: number; 
    ID_compromissos: number;
    ID_catalogo: number;
    dose_prevista: string;

    constructor(ID_compromissos: number, ID_catalogo: number, dose_prevista: string, id: number){
        this.id = id;
        this.ID_compromissos = ID_compromissos;
        this.ID_catalogo = ID_catalogo;
        this.dose_prevista = dose_prevista; 
    }
}