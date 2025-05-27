import animalRepositorie from '../repositories/animalRepositories';
import connection from '../config/bd';

// Mock das dependências
jest.mock('../config/bd');

describe('AnimalRepositorie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um animal com sucesso', (done) => {
      const mockResult = { insertId: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const animalData = {
        nome: 'Rex',
        raca: 'Labrador',
        idade: 3,
        genero: 'M',
        peso: 25.5,
        id_usuario: 1,
        id_especie: 1
      };

      animalRepositorie.create(
        animalData.nome,
        animalData.raca,
        animalData.idade,
        animalData.genero,
        animalData.peso,
        animalData.id_usuario,
        animalData.id_especie,
        (err: Error | null, result?: any) => {
          expect(err).toBeNull();
          expect(result).toEqual(mockResult);
          expect(connection.query).toHaveBeenCalledWith(
            'INSERT INTO animal (nome, raca, idade, genero, peso, id_usuario, id_especie) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
              animalData.nome,
              animalData.raca,
              animalData.idade,
              animalData.genero,
              animalData.peso,
              animalData.id_usuario,
              animalData.id_especie
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

      const animalData = {
        nome: 'Rex',
        raca: 'Labrador',
        idade: 3,
        genero: 'M',
        peso: 25.5,
        id_usuario: 1,
        id_especie: 1
      };

      animalRepositorie.create(
        animalData.nome,
        animalData.raca,
        animalData.idade,
        animalData.genero,
        animalData.peso,
        animalData.id_usuario,
        animalData.id_especie,
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os animais com sucesso', (done) => {
      const mockAnimais = [
        {
          ID_animal: 1,
          nome: 'Rex',
          raca: 'Labrador',
          idade: 3,
          genero: 'M',
          peso: 25.5,
          id_usuario: 1,
          id_especie: 1
        },
        {
          ID_animal: 2,
          nome: 'Luna',
          raca: 'Poodle',
          idade: 2,
          genero: 'F',
          peso: 15.0,
          id_usuario: 1,
          id_especie: 1
        }
      ];
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(null, mockAnimais);
      });

      animalRepositorie.findAll((err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockAnimais);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM animal',
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

      animalRepositorie.findAll((err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findById', () => {
    it('deve encontrar um animal por ID com sucesso', (done) => {
      const mockAnimal = {
        ID_animal: 1,
        nome: 'Rex',
        raca: 'Labrador',
        idade: 3,
        genero: 'M',
        peso: 25.5,
        id_usuario: 1,
        id_especie: 1
      };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, [mockAnimal]);
      });

      animalRepositorie.findById(1, (err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual([mockAnimal]);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM animal WHERE ID_animal = ?',
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

      animalRepositorie.findById(1, (err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um animal com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const updateData = {
        nome: 'Rex Atualizado',
        raca: 'Labrador Retriever',
        idade: 4,
        genero: 'M',
        peso: 28.0
      };

      animalRepositorie.update(
        1,
        updateData.nome,
        updateData.raca,
        updateData.idade,
        updateData.genero,
        updateData.peso,
        (err: Error | null, result?: any) => {
          expect(err).toBeNull();
          expect(result).toEqual(mockResult);
          expect(connection.query).toHaveBeenCalledWith(
            'UPDATE animal SET nome = ?, raca = ?, idade = ?, genero = ?, peso = ? WHERE ID_animal = ?',
            [
              updateData.nome,
              updateData.raca,
              updateData.idade,
              updateData.genero,
              updateData.peso,
              1
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

      const updateData = {
        nome: 'Rex Atualizado',
        raca: 'Labrador Retriever',
        idade: 4,
        genero: 'M',
        peso: 28.0
      };

      animalRepositorie.update(
        1,
        updateData.nome,
        updateData.raca,
        updateData.idade,
        updateData.genero,
        updateData.peso,
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('delete', () => {
    it('deve deletar um animal com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      animalRepositorie.delete(1, (err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'DELETE FROM animal WHERE ID_animal = ?',
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

      animalRepositorie.delete(1, (err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
}); 