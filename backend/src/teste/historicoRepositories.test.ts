import historicoRepositorie from '../repositories/historicoRepositories';
import connection from '../config/bd';

// Mock das dependências
jest.mock('../config/bd');

interface Historico {
  ID_historico: number;
  data_historico: string;
  ID_animal: number;
  observacoes: string;
}

describe('HistoricoRepositorie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um histórico com sucesso', (done) => {
      const mockResult = { insertId: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const historicoData = {
        data_historico: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Consulta de rotina'
      };

      historicoRepositorie.create(
        historicoData.data_historico,
        historicoData.ID_animal,
        historicoData.observacoes,
        (err: Error | null, result?: any) => {
          expect(err).toBeNull();
          expect(result).toEqual(mockResult);
          expect(connection.query).toHaveBeenCalledWith(
            'INSERT INTO historico (data_historico, ID_animal, observacoes) values (?, ?, ?)',
            [historicoData.data_historico, historicoData.ID_animal, historicoData.observacoes],
            expect.any(Function)
          );
          done();
        }
      );
    });

    it('deve retornar erro quando houver falha no banco de dados', (done) => {
      const mockError = new Error('Erro no banco de dados');
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      const historicoData = {
        data_historico: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Consulta de rotina'
      };

      historicoRepositorie.create(
        historicoData.data_historico,
        historicoData.ID_animal,
        historicoData.observacoes,
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os históricos com sucesso', (done) => {
      const mockHistoricos: Historico[] = [
        {
          ID_historico: 1,
          data_historico: '2024-03-20',
          ID_animal: 1,
          observacoes: 'Consulta de rotina'
        },
        {
          ID_historico: 2,
          data_historico: '2024-03-21',
          ID_animal: 2,
          observacoes: 'Vacinação'
        }
      ];
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(null, mockHistoricos);
      });

      historicoRepositorie.findAll((err: Error | null, result?: Historico[]) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockHistoricos);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM historico',
          expect.any(Function)
        );
        done();
      });
    });

    it('deve retornar erro quando houver falha no banco de dados', (done) => {
      const mockError = new Error('Erro no banco de dados');
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(mockError, null);
      });

      historicoRepositorie.findAll((err: Error | null, result?: Historico[]) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findById', () => {
    it('deve encontrar um histórico por ID com sucesso', (done) => {
      const mockHistorico: Historico = {
        ID_historico: 1,
        data_historico: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Consulta de rotina'
      };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, [mockHistorico]);
      });

      historicoRepositorie.findById(1, (err: Error | null, result?: Historico[]) => {
        expect(err).toBeNull();
        expect(result).toEqual([mockHistorico]);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM historico WHERE ID_historico = ?',
          [1],
          expect.any(Function)
        );
        done();
      });
    });

    it('deve retornar erro quando houver falha no banco de dados', (done) => {
      const mockError = new Error('Erro no banco de dados');
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      historicoRepositorie.findById(1, (err: Error | null, result?: Historico[]) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um histórico com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const updateData = {
        data_historico: '2024-03-21',
        observacoes: 'Consulta de emergência'
      };

      historicoRepositorie.update(
        updateData.data_historico,
        updateData.observacoes,
        1,
        (err: Error | null, result?: any) => {
          expect(err).toBeNull();
          expect(result).toEqual(mockResult);
          expect(connection.query).toHaveBeenCalledWith(
            'UPDATE historico SET  data_historico = ?, observacoes = ? WHERE ID_historico = ?',
            [updateData.data_historico, updateData.observacoes, 1],
            expect.any(Function)
          );
          done();
        }
      );
    });

    it('deve retornar erro quando houver falha no banco de dados', (done) => {
      const mockError = new Error('Erro no banco de dados');
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      const updateData = {
        data_historico: '2024-03-21',
        observacoes: 'Consulta de emergência'
      };

      historicoRepositorie.update(
        updateData.data_historico,
        updateData.observacoes,
        1,
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('delete', () => {
    it('deve deletar um histórico com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      historicoRepositorie.delete(1, (err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'DELETE FROM historico WHERE ID_historico = ?',
          [1],
          expect.any(Function)
        );
        done();
      });
    });

    it('deve retornar erro quando houver falha no banco de dados', (done) => {
      const mockError = new Error('Erro no banco de dados');
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      historicoRepositorie.delete(1, (err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
}); 