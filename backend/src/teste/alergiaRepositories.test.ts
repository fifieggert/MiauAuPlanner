import AlergiaRepositorie from '../repositories/alergiaRepositories';
import connection from '../config/bd';

// Mock das dependências
jest.mock('../config/bd');

describe('AlergiaRepositorie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar uma alergia com sucesso', (done) => {
      const mockResult = { insertId: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      AlergiaRepositorie.create(1, 'Alergia a penicilina', (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'INSERT INTO alergia (ID_animal, descricao) values (?, ?)',
          [1, 'Alergia a penicilina'],
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

      AlergiaRepositorie.create(1, 'Alergia a penicilina', (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as alergias com sucesso', (done) => {
      const mockAlergias = [
        { ID_alergia: 1, ID_animal: 1, descricao: 'Alergia 1' },
        { ID_alergia: 2, ID_animal: 2, descricao: 'Alergia 2' }
      ];
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(null, mockAlergias);
      });

      AlergiaRepositorie.findAll((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockAlergias);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM alergia',
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

      AlergiaRepositorie.findAll((err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findById', () => {
    it('deve encontrar uma alergia por ID com sucesso', (done) => {
      const mockAlergia = { ID_alergia: 1, ID_animal: 1, descricao: 'Alergia 1' };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, [mockAlergia]);
      });

      AlergiaRepositorie.findById(1, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual([mockAlergia]);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM alergia WHERE ID_alergia = ?',
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

      AlergiaRepositorie.findById(1, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar uma alergia com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      AlergiaRepositorie.update(1, 'Nova descrição', (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'UPDATE alergia SET descricao = ? WHERE ID_alergia = ?',
          ['Nova descrição', 1],
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

      AlergiaRepositorie.update(1, 'Nova descrição', (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('delete', () => {
    it('deve deletar uma alergia com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      AlergiaRepositorie.delete(1, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'DELETE FROM alergia WHERE ID_alergia = ?',
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

      AlergiaRepositorie.delete(1, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
}); 