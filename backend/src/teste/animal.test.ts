import { Animal } from "../models/animal";

describe('Classe Animal', () => {
  it('deve criar um objeto Animal corretamente', () => {
    const animal = new Animal(
      'Frajola',
      'Siamês',
      3,
      'Macho',
      4.2,
      1,     // id_usuario
      2,     // id_especie
      10     // id opcional
    );

    expect(animal).toBeInstanceOf(Animal);
    expect(animal.id).toBe(10);
    expect(animal.nome).toBe('Frajola');
    expect(animal.raca).toBe('Siamês');
    expect(animal.idade).toBe(3);
    expect(animal.genero).toBe('Macho');
    expect(animal.peso).toBe(4.2);
    expect(animal.id_usuario).toBe(1);
    expect(animal.id_especie).toBe(2);
  });

  it('deve criar um Animal mesmo sem o id opcional', () => {
    const animal = new Animal(
      'Luna',
      'Labrador',
      5,
      'Fêmea',
      25.0,
      3,
      1
    );

    expect(animal.id).toBeUndefined();
    expect(animal.nome).toBe('Luna');
  });
});
