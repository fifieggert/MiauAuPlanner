import { VacinasAplicadas } from '../models/vacinasAplicadas';

describe('VacinasAplicadas Model', () => {
  it('deve criar uma instância de VacinasAplicadas com todos os parâmetros', () => {
    const data = '2024-03-20';
    const vacina = new VacinasAplicadas('1', '1ª dose', 1, data, 1);
    
    expect(vacina).toBeInstanceOf(VacinasAplicadas);
    expect(vacina.id).toBe(1);
    expect(vacina.ID_catalogo).toBe('1');
    expect(vacina.dose).toBe('1ª dose');
    expect(vacina.ID_animal).toBe(1);
    expect(vacina.data_aplicacao).toBe(data);
  });

  it('deve criar uma instância de VacinasAplicadas com id 0', () => {
    const data = '2024-03-20';
    const vacina = new VacinasAplicadas('1', '1ª dose', 1, data, 0);
    
    expect(vacina).toBeInstanceOf(VacinasAplicadas);
    expect(vacina.id).toBe(0);
    expect(vacina.ID_catalogo).toBe('1');
    expect(vacina.dose).toBe('1ª dose');
    expect(vacina.ID_animal).toBe(1);
    expect(vacina.data_aplicacao).toBe(data);
  });
}); 