import vacinasAplicadasRepositorie from '../repositories/vacinasAplicadasRepositories';
import connection from '../config/bd';

// Mock do módulo de conexão com o banco de dados
jest.mock('../config/bd', () => ({
  query: jest.fn()
}));

describe('VacinasAplicadasRepositorie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar uma vacina aplicada com sucesso', (done) => {
      const mockResults = { insertId: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResults);
      });

      const vacinaData = {
        ID_catalogo: 1,
        dose: '1ª dose',
        ID_animal: 1,
        data_aplicacao: '2024-03-20'
      };

      vacinasAplicadasRepositorie.create(
        vacinaData.ID_catalogo,
        vacinaData.dose,
        vacinaData.ID_animal,
        vacinaData.data_aplicacao,
        (err, results) => {
          expect(err).toBeNull();
          expect(results).toEqual(mockResults);
          expect(connection.query).toHaveBeenCalledWith(
            'INSERT INTO vacinas_aplicadas (ID_catalogo, dose, ID_animal, data_aplicacao) values (?, ?, ?, ?)',
            [
              vacinaData.ID_catalogo,
              vacinaData.dose,
              vacinaData.ID_animal,
              vacinaData.data_aplicacao
            ],
            expect.any(Function)
          );
          done();
        }
      );
    });

    it('deve retornar erro ao falhar na criação', (done) => {
      const mockError = new Error('Erro no banco de dados');
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      const vacinaData = {
        ID_catalogo: 1,
        dose: '1ª dose',
        ID_animal: 1,
        data_aplicacao: '2024-03-20'
      };

      vacinasAplicadasRepositorie.create(
        vacinaData.ID_catalogo,
        vacinaData.dose,
        vacinaData.ID_animal,
        vacinaData.data_aplicacao,
        (err, results) => {
          expect(err).toBe(mockError);
          expect(results).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as vacinas aplicadas', (done) => {
      const mockResults = [
        { ID_vacina: 1, ID_catalogo: 1, dose: '1ª dose', ID_animal: 1, data_aplicacao: '2024-03-20' },
        { ID_vacina: 2, ID_catalogo: 2, dose: '2ª dose', ID_animal: 1, data_aplicacao: '2024-04-20' }
      ];
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(null, mockResults);
      });

      vacinasAplicadasRepositorie.findAll((err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM vacinas_aplicadas',
          expect.any(Function)
        );
        done();
      });
    });
  });

  describe('findById', () => {
    it('deve retornar uma vacina aplicada específica', (done) => {
      const mockResults = [{ ID_vacina: 1, ID_catalogo: 1, dose: '1ª dose', ID_animal: 1, data_aplicacao: '2024-03-20' }];
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResults);
      });

      vacinasAplicadasRepositorie.findById(1, (err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM vacinas_aplicadas WHERE ID_vacina = ?',
          [1],
          expect.any(Function)
        );
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar uma vacina aplicada com sucesso', (done) => {
      const mockResults = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResults);
      });

      const updateData = {
        dose: '2ª dose',
        data_aplicacao: '2024-04-20'
      };

      vacinasAplicadasRepositorie.update(
        1,
        updateData.dose,
        updateData.data_aplicacao,
        (err, results) => {
          expect(err).toBeNull();
          expect(results).toEqual(mockResults);
          expect(connection.query).toHaveBeenCalledWith(
            'UPDATE vacinas_aplicadas SET  dose = ?, data_aplicacao = ? WHERE ID_vacina = ?',
            [updateData.dose, updateData.data_aplicacao, 1],
            expect.any(Function)
          );
          done();
        }
      );
    });
  });

  describe('delete', () => {
    it('deve deletar uma vacina aplicada com sucesso', (done) => {
      const mockResults = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResults);
      });

      vacinasAplicadasRepositorie.delete(1, (err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        expect(connection.query).toHaveBeenCalledWith(
          'DELETE FROM vacinas_aplicadas WHERE ID_vacina = ?',
          [1],
          expect.any(Function)
        );
        done();
      });
    });
  });
}); 