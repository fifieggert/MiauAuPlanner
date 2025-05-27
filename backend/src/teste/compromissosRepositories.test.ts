import compromissosRepositorie from '../repositories/compromissosRepositories';
import connection from '../config/bd';

// Mock das dependências
jest.mock('../config/bd');

describe('CompromissosRepositorie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um compromisso com sucesso', (done) => {
      const mockResult = { insertId: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const compromissoData = {
        data_compromissos: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Check-up anual'
      };

      compromissosRepositorie.create(
        compromissoData.data_compromissos,
        compromissoData.ID_animal,
        compromissoData.observacoes,
        (err: Error | null, result?: any) => {
          expect(err).toBeNull();
          expect(result).toEqual(mockResult);
          expect(connection.query).toHaveBeenCalledWith(
            'INSERT INTO compromissos (data_compromissos, ID_animal, observacoes) VALUES (?, ?, ?)',
            [
              compromissoData.data_compromissos,
              compromissoData.ID_animal,
              compromissoData.observacoes
            ],
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

      const compromissoData = {
        data_compromissos: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Check-up anual'
      };

      compromissosRepositorie.create(
        compromissoData.data_compromissos,
        compromissoData.ID_animal,
        compromissoData.observacoes,
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os compromissos com sucesso', (done) => {
      const mockCompromissos = [
        {
          ID_compromissos: 1,
          data_compromissos: '2024-03-20',
          ID_animal: 1,
          observacoes: 'Check-up anual'
        },
        {
          ID_compromissos: 2,
          data_compromissos: '2024-04-15',
          ID_animal: 1,
          observacoes: 'Vacinação'
        }
      ];
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(null, mockCompromissos);
      });

      compromissosRepositorie.findAll((err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockCompromissos);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM compromissos',
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

      compromissosRepositorie.findAll((err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findById', () => {
    it('deve encontrar um compromisso por ID com sucesso', (done) => {
      const mockCompromisso = {
        ID_compromissos: 1,
        data_compromissos: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Check-up anual'
      };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, [mockCompromisso]);
      });

      compromissosRepositorie.findById(1, (err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual([mockCompromisso]);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM compromissos WHERE ID_compromissos = ?',
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

      compromissosRepositorie.findById(1, (err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um compromisso com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const updateData = {
        data_compromissos: '2024-03-25',
        observacoes: 'Check-up semestral'
      };

      compromissosRepositorie.update(
        1,
        updateData.data_compromissos,
        updateData.observacoes,
        (err: Error | null, result?: any) => {
          expect(err).toBeNull();
          expect(result).toEqual(mockResult);
          expect(connection.query).toHaveBeenCalledWith(
            'UPDATE compromissos SET data_compromissos = ?, observacoes = ? WHERE ID_compromissos = ?',
            [updateData.data_compromissos, updateData.observacoes, 1],
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
        data_compromissos: '2024-03-25',
        observacoes: 'Check-up semestral'
      };

      compromissosRepositorie.update(
        1,
        updateData.data_compromissos,
        updateData.observacoes,
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('delete', () => {
    it('deve deletar um compromisso com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      compromissosRepositorie.delete(1, (err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'DELETE FROM compromissos WHERE ID_compromissos = ?',
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

      compromissosRepositorie.delete(1, (err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
}); 