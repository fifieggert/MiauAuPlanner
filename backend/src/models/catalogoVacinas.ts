export class CatalogoVacinas {
   id?: number;
   nome_vacina: string;
   fabricante: string;

   constructor(nome_vacina: string, fabricante: string, id: number) {
      this.id = id;
      this.nome_vacina = nome_vacina;
      this.fabricante = fabricante;
   }
}