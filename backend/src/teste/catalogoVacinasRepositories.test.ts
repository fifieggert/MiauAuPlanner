import catalogoVacinasRepositorie from '../repositories/catalogoVacinasRepositories';
import connection from '../config/bd';

// Mock das dependências
jest.mock('../config/bd');

describe('CatalogoVacinasRepositorie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar uma vacina no catálogo com sucesso', (done) => {
      const mockResult = { insertId: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      catalogoVacinasRepositorie.create('Vacina Antirrábica', 'Fabricante A', (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'INSERT INTO catalogo_vacinas (nome_vacina, fabricante) VALUES (?, ?)',
          ['Vacina Antirrábica', 'Fabricante A'],
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

      catalogoVacinasRepositorie.create('Vacina Antirrábica', 'Fabricante A', (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as vacinas do catálogo com sucesso', (done) => {
      const mockVacinas = [
        { ID_catalogo: 1, nome_vacina: 'Vacina Antirrábica', fabricante: 'Fabricante A' },
        { ID_catalogo: 2, nome_vacina: 'Vacina V8', fabricante: 'Fabricante B' }
      ];
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(null, mockVacinas);
      });

      catalogoVacinasRepositorie.findAll((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockVacinas);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM catalogo_vacinas',
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

      catalogoVacinasRepositorie.findAll((err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findById', () => {
    it('deve encontrar uma vacina por ID com sucesso', (done) => {
      const mockVacina = { ID_catalogo: 1, nome_vacina: 'Vacina Antirrábica', fabricante: 'Fabricante A' };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, [mockVacina]);
      });

      catalogoVacinasRepositorie.findById(1, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual([mockVacina]);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM catalogo_vacinas WHERE ID_catalogo = ?',
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

      catalogoVacinasRepositorie.findById(1, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar uma vacina com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      catalogoVacinasRepositorie.update(1, 'Vacina Antirrábica Atualizada', 'Fabricante B', (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'UPDATE catalogo_vacinas SET nome_vacina = ?, fabricante = ? WHERE ID_catalogo = ?',
          ['Vacina Antirrábica Atualizada', 'Fabricante B', 1],
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

      catalogoVacinasRepositorie.update(1, 'Vacina Antirrábica Atualizada', 'Fabricante B', (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('delete', () => {
    it('deve deletar uma vacina com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      catalogoVacinasRepositorie.delete(1, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'DELETE FROM catalogo_vacinas WHERE ID_catalogo = ?',
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

      catalogoVacinasRepositorie.delete(1, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
}); 