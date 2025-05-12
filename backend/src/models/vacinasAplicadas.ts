export class VacinasAplicadas {
    id?: number; 
    ID_catalago: string;
    dose: string;
    data_aplicacao: any;

    constructor (ID_catalogo: string, dose: string, data_aplicacao: string, id: number){
        this.id = id;
        this.ID_catalago = ID_catalogo;
        this.dose = dose;
        this.data_aplicacao = data_aplicacao;
    }
}