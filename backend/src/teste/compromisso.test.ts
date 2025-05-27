import { Compromisso } from '../models/compromisso';

describe('Compromisso Model', () => {
  it('deve criar uma instância de Compromisso com todos os parâmetros', () => {
    const data = new Date('2024-03-20');
    const compromisso = new Compromisso(data, 1, 'Consulta de rotina', 1);
    
    expect(compromisso).toBeInstanceOf(Compromisso);
    expect(compromisso.id).toBe(1);
    expect(compromisso.data_compromissos).toBe(data);
    expect(compromisso.ID_animal).toBe(1);
    expect(compromisso.observacoes).toBe('Consulta de rotina');
  });

  it('deve criar uma instância de Compromisso com id 0', () => {
    const data = new Date('2024-03-20');
    const compromisso = new Compromisso(data, 1, 'Consulta de rotina', 0);
    
    expect(compromisso).toBeInstanceOf(Compromisso);
    expect(compromisso.id).toBe(0);
    expect(compromisso.data_compromissos).toBe(data);
    expect(compromisso.ID_animal).toBe(1);
    expect(compromisso.observacoes).toBe('Consulta de rotina');
  });
}); 