export class Alergia {
    id?: number;
    animal_id: number;
    descricao: string;

    constructor(animal_id: number, descricao: string, id: number ) {
        this.id = id;
        this.animal_id = animal_id;
        this.descricao = descricao;
    }
}