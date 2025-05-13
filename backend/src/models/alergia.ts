export class Alergia {
    id?: number;
    ID_animal: number;
    descricao: string;

    constructor(ID_animal: number, descricao: string, id: number) {
        this.id = id;
        this.ID_animal = ID_animal;
        this.descricao = descricao;
    }
}