import { CatalogoVacinas } from '../models/catalogoVacinas';

describe('CatalogoVacinas Model', () => {
  it('deve criar uma instância de CatalogoVacinas com todos os parâmetros', () => {
    const vacina = new CatalogoVacinas('Vacina Antirrábica', 'Merial', 1);
    
    expect(vacina).toBeInstanceOf(CatalogoVacinas);
    expect(vacina.id).toBe(1);
    expect(vacina.nome_vacina).toBe('Vacina Antirrábica');
    expect(vacina.fabricante).toBe('Merial');
  });

  it('deve criar uma instância de CatalogoVacinas com id 0', () => {
    const vacina = new CatalogoVacinas('Vacina Antirrábica', 'Merial', 0);
    
    expect(vacina).toBeInstanceOf(CatalogoVacinas);
    expect(vacina.id).toBe(0);
    expect(vacina.nome_vacina).toBe('Vacina Antirrábica');
    expect(vacina.fabricante).toBe('Merial');
  });
}); 