export class TipoCompromisso {
    id?: number;
    nome_tipo: string;

    constructor(nome_tipo: string, id?: number) {
        this.id = id;
        this.nome_tipo = nome_tipo;
    }
} 