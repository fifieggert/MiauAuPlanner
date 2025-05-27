import { Alergia } from '../models/alergia';

describe('Alergia Model', () => {
  it('deve criar uma instância de Alergia com todos os parâmetros', () => {
    const alergia = new Alergia(1, 'Alergia a penicilina', 1);
    
    expect(alergia).toBeInstanceOf(Alergia);
    expect(alergia.id).toBe(1);
    expect(alergia.ID_animal).toBe(1);
    expect(alergia.descricao).toBe('Alergia a penicilina');
  });

  it('deve criar uma instância de Alergia sem id', () => {
    const alergia = new Alergia(1, 'Alergia a penicilina', 0);
    
    expect(alergia).toBeInstanceOf(Alergia);
    expect(alergia.id).toBe(0);
    expect(alergia.ID_animal).toBe(1);
    expect(alergia.descricao).toBe('Alergia a penicilina');
  });
}); 