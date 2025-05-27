import { Historico } from '../models/historico';

describe('Historico Model', () => {
  it('deve criar uma instância de Historico com todos os parâmetros', () => {
    const data = new Date('2024-03-20');
    const historico = new Historico(data, 1, 'Consulta de rotina', 1);
    
    expect(historico).toBeInstanceOf(Historico);
    expect(historico.id).toBe(1);
    expect(historico.data_historico).toBe(data);
    expect(historico.id_animal).toBe(1);
    expect(historico.observacoes).toBe('Consulta de rotina');
  });

  it('deve criar uma instância de Historico com id 0', () => {
    const data = new Date('2024-03-20');
    const historico = new Historico(data, 1, 'Consulta de rotina', 0);
    
    expect(historico).toBeInstanceOf(Historico);
    expect(historico.id).toBe(0);
    expect(historico.data_historico).toBe(data);
    expect(historico.id_animal).toBe(1);
    expect(historico.observacoes).toBe('Consulta de rotina');
  });
}); 