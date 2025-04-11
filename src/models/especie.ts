export class Especie {
    id?: number;
    especie: string;

    constructor(especie: string, id?: number) {
        this.id = id;
        this.especie = especie;
    }
}