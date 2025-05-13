export class VacinasAplicadas {
    id?: number;
    ID_catalogo: string;
    dose: string;
    ID_animal: number;
    data_aplicacao: any;

    constructor(ID_catalogo: string, dose: string, ID_animal: number, data_aplicacao: string, id: number) {
        this.id = id;
        this.ID_catalogo = ID_catalogo;
        this.dose = dose;
        this.ID_animal = ID_animal;
        this.data_aplicacao = data_aplicacao;
    }
}