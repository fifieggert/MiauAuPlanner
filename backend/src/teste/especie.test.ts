import { Especie } from '../models/especie';

describe('Especie Model', () => {
  it('deve criar uma instância de Especie com todos os parâmetros', () => {
    const especie = new Especie('Cachorro', 1);
    
    expect(especie).toBeInstanceOf(Especie);
    expect(especie.id).toBe(1);
    expect(especie.especie).toBe('Cachorro');
  });

  it('deve criar uma instância de Especie sem id', () => {
    const especie = new Especie('Gato');
    
    expect(especie).toBeInstanceOf(Especie);
    expect(especie.id).toBeUndefined();
    expect(especie.especie).toBe('Gato');
  });
}); 