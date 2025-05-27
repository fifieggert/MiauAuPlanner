import EspecieRepositorie from '../repositories/especieRepositories';
import connection from '../config/bd';

// Mock das dependências
jest.mock('../config/bd');

describe('EspecieRepositorie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar uma espécie com sucesso', (done) => {
      const mockResult = { insertId: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      EspecieRepositorie.create('Cachorro', (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'INSERT INTO especie (especie) values (?)',
          ['Cachorro'],
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

      EspecieRepositorie.create('Cachorro', (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as espécies com sucesso', (done) => {
      const mockEspecies = [
        { ID_especie: 1, especie: 'Cachorro' },
        { ID_especie: 2, especie: 'Gato' }
      ];
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(null, mockEspecies);
      });

      EspecieRepositorie.findAll((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockEspecies);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM especie',
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

      EspecieRepositorie.findAll((err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findById', () => {
    it('deve encontrar uma espécie por ID com sucesso', (done) => {
      const mockEspecie = { ID_especie: 1, especie: 'Cachorro' };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, [mockEspecie]);
      });

      EspecieRepositorie.findById(1, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual([mockEspecie]);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM especie WHERE ID_especie = ?',
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

      EspecieRepositorie.findById(1, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar uma espécie com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      EspecieRepositorie.update(1, 'Cachorro Atualizado', (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'UPDATE especie SET especie = ? WHERE ID_especie = ?',
          ['Cachorro Atualizado', 1],
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

      EspecieRepositorie.update(1, 'Cachorro Atualizado', (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('delete', () => {
    it('deve deletar uma espécie com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      EspecieRepositorie.delete(1, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'DELETE FROM especie WHERE ID_especie = ? ',
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

      EspecieRepositorie.delete(1, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
}); 