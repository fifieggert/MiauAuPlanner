import { Request, Response } from 'express';
import AnimalController from '../controllers/animalController';
import AnimalRepositorie from '../repositories/animalRepositories';

// Mock das dependências
jest.mock('../repositories/animalRepositories');

describe('AnimalController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    responseObject = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('deve criar um animal com sucesso', (done) => {
      const mockAnimal = {
        nome: 'Test Animal',
        raca: 'Test Breed',
        idade: 2,
        genero: 'M',
        peso: 10.5,
        id_usuario: 1,
        id_especie: 1
      };
      mockRequest.body = mockAnimal;

      (AnimalRepositorie.create as jest.Mock).mockImplementation((nome, raca, idade, genero, peso, id_usuario, id_especie, callback) => {
        callback(null, { insertId: 1 });
      });

      AnimalController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        try {
          expect(AnimalRepositorie.create).toHaveBeenCalledWith(
            'Test Animal',
            'Test Breed',
            2,
            'M',
            10.5,
            1,
            1,
            expect.any(Function)
          );
          expect(mockResponse.status).toHaveBeenCalledWith(201);
          expect(responseObject).toEqual({
            message: 'Animal criado com sucesso',
            result: { insertId: 1 }
          });
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      const mockAnimal = {
        nome: 'Test Animal',
        raca: 'Test Breed',
        idade: 2,
        genero: 'M',
        peso: 10.5,
        id_usuario: 1,
        id_especie: 1
      };
      mockRequest.body = mockAnimal;

      (AnimalRepositorie.create as jest.Mock).mockImplementation((nome, raca, idade, genero, peso, id_usuario, id_especie, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      AnimalController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        try {
          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(responseObject).toEqual({
            error: 'Erro no servidor',
            details: 'Erro no banco de dados'
          });
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });

    it('deve retornar 400 quando dados obrigatórios estiverem faltando', (done) => {
      const mockAnimal = {
        nome: 'Test Animal',
        raca: 'Test Breed',
        idade: 2,
        genero: 'M',
        peso: 10.5,
        // id_usuario faltando
        id_especie: 1
      };
      mockRequest.body = mockAnimal;

      AnimalController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        try {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });

    it('deve retornar 400 quando idade for inválida', (done) => {
      const mockAnimal = {
        nome: 'Test Animal',
        raca: 'Test Breed',
        idade: -1, // idade inválida
        genero: 'M',
        peso: 10.5,
        id_usuario: 1,
        id_especie: 1
      };
      mockRequest.body = mockAnimal;

      AnimalController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        try {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(responseObject).toEqual({ error: 'Idade inválida' });
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });

    it('deve retornar 400 quando peso for inválido', (done) => {
      const mockAnimal = {
        nome: 'Test Animal',
        raca: 'Test Breed',
        idade: 2,
        genero: 'M',
        peso: -1, // peso inválido
        id_usuario: 1,
        id_especie: 1
      };
      mockRequest.body = mockAnimal;

      AnimalController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        try {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(responseObject).toEqual({ error: 'Peso inválido' });
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os animais com sucesso', (done) => {
      const mockAnimals = [
        { id: 1, nome: 'Animal 1' },
        { id: 2, nome: 'Animal 2' }
      ];

      (AnimalRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, mockAnimals);
      });

      AnimalController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        try {
          expect(AnimalRepositorie.findAll).toHaveBeenCalledWith(expect.any(Function));
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(responseObject).toEqual(mockAnimals);
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      (AnimalRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      AnimalController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        try {
          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(responseObject).toEqual({ error: 'Erro no servidor' });
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });

    it('deve retornar lista vazia quando não houver animais', (done) => {
      (AnimalRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, []);
      });

      AnimalController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        try {
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(responseObject).toEqual([]);
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });
  });

  describe('findByID', () => {
    it('deve encontrar um animal por ID com sucesso', (done) => {
      const mockAnimal = { ID_animal: 1, nome: 'Test Animal' };
      mockRequest.params = { ID_animal: '1' };

      (AnimalRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, [mockAnimal]);
      });

      AnimalController.findByID(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(AnimalRepositorie.findById).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockAnimal);
        done();
      }, 0);
    });

    it('deve retornar 404 quando animal não for encontrado', (done) => {
      mockRequest.params = { ID_animal: '999' };

      (AnimalRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, []);
      });

      AnimalController.findByID(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Animal não encontrado' });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_animal: '1' };

      (AnimalRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      AnimalController.findByID(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_animal: 'invalid' };

      AnimalController.findByID(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });
  });

  describe('update', () => {
    it('deve atualizar um animal com sucesso', (done) => {
      const mockUpdate = {
        nome: 'Updated Animal',
        raca: 'Updated Breed',
        idade: 3,
        genero: 'F',
        peso: 12.5,
        id_especie: 2
      };
      mockRequest.params = { ID_animal: '1' };
      mockRequest.body = mockUpdate;

      (AnimalRepositorie.update as jest.Mock).mockImplementation((id, nome, raca, idade, genero, peso, id_especie, callback) => {
        callback(null, { affectedRows: 1 });
      });

      AnimalController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(AnimalRepositorie.update).toHaveBeenCalledWith(
          1,
          'Updated Animal',
          'Updated Breed',
          3,
          'F',
          12.5,
          2,
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Animal atualizado com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_animal: '1' };
      mockRequest.body = {
        nome: 'Updated Animal',
        raca: 'Updated Breed',
        idade: 3,
        genero: 'F',
        peso: 12.5,
        id_especie: 2
      };

      (AnimalRepositorie.update as jest.Mock).mockImplementation((id, nome, raca, idade, genero, peso, id_especie, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      AnimalController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({
          error: 'Erro no servidor',
          details: new Error('Erro no banco de dados')
        });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_animal: 'invalid' };
      mockRequest.body = {
        nome: 'Updated Animal',
        raca: 'Updated Breed',
        idade: 3,
        genero: 'F',
        peso: 12.5,
        id_especie: 2
      };

      AnimalController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando dados obrigatórios estiverem faltando', (done) => {
      mockRequest.params = { ID_animal: '1' };
      mockRequest.body = {
        nome: 'Updated Animal',
        raca: 'Updated Breed',
        idade: 3,
        genero: 'F',
        peso: 12.5,
        // id_especie faltando
      };

      AnimalController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });

    it('deve retornar 404 quando animal não for encontrado', (done) => {
      mockRequest.params = { ID_animal: '999' };
      mockRequest.body = {
        nome: 'Updated Animal',
        raca: 'Updated Breed',
        idade: 3,
        genero: 'F',
        peso: 12.5,
        id_especie: 2
      };

      (AnimalRepositorie.update as jest.Mock).mockImplementation((id, nome, raca, idade, genero, peso, id_especie, callback) => {
        callback(null, { affectedRows: 0 });
      });

      AnimalController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Animal não encontrado' });
        done();
      }, 0);
    });
  });

  describe('delete', () => {
    it('deve deletar um animal com sucesso', (done) => {
      mockRequest.params = { ID_animal: '1' };

      (AnimalRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      AnimalController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(AnimalRepositorie.delete).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Animal deletado com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_animal: '1' };

      (AnimalRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      AnimalController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_animal: 'invalid' };

      AnimalController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 404 quando animal não for encontrado', (done) => {
      mockRequest.params = { ID_animal: '999' };

      (AnimalRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 0 });
      });

      AnimalController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Animal não encontrado' });
        done();
      }, 0);
    });
  });
}); 