import { Request, Response } from 'express';
import especieController from '../controllers/especieController';
import especieRepositories from '../repositories/especieRepositories';

// Mock das dependências
jest.mock('../repositories/especieRepositories');

describe('EspecieController', () => {
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
    it('deve criar uma espécie com sucesso', (done) => {
      const mockEspecie = {
        nome: 'Cachorro',
        descricao: 'Animal doméstico'
      };
      mockRequest.body = mockEspecie;

      (especieRepositories.create as jest.Mock).mockImplementation((nome, descricao, callback) => {
        callback(null, { insertId: 1 });
      });

      especieController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(especieRepositories.create).toHaveBeenCalledWith(
          'Cachorro',
          'Animal doméstico',
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(responseObject).toEqual({
          message: 'Espécie criada com sucesso',
          result: { insertId: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar erro 500 quando houver erro no repositório', (done) => {
      const mockEspecie = {
        nome: 'Cachorro',
        descricao: 'Animal doméstico'
      };
      mockRequest.body = mockEspecie;

      (especieRepositories.create as jest.Mock).mockImplementation((nome, descricao, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      especieController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({
          error: 'Erro no servidor',
          details: new Error('Erro no banco de dados')
        });
        done();
      }, 0);
    });

    it('deve retornar erro 400 quando dados obrigatórios estiverem faltando', (done) => {
      const mockEspecie = {
        nome: 'Cachorro'
        // descricao faltando
      };
      mockRequest.body = mockEspecie;

      especieController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as espécies com sucesso', (done) => {
      const mockEspecies = [
        { ID_especie: 1, nome: 'Cachorro', descricao: 'Animal doméstico' },
        { ID_especie: 2, nome: 'Gato', descricao: 'Animal doméstico' }
      ];

      (especieRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, mockEspecies);
      });

      especieController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(especieRepositories.findAll).toHaveBeenCalledWith(expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockEspecies);
        done();
      }, 0);
    });

    it('deve retornar lista vazia quando não houver espécies', (done) => {
      (especieRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, []);
      });

      especieController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual([]);
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      (especieRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      especieController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });
  });

  describe('findById', () => {
    it('deve encontrar uma espécie por ID com sucesso', (done) => {
      const mockEspecie = { ID_especie: 1, nome: 'Cachorro', descricao: 'Animal doméstico' };
      mockRequest.params = { ID_especie: '1' };

      (especieRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, [mockEspecie]);
      });

      especieController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(especieRepositories.findById).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockEspecie);
        done();
      }, 0);
    });

    it('deve retornar 404 quando espécie não for encontrada', (done) => {
      mockRequest.params = { ID_especie: '999' };

      (especieRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, []);
      });

      especieController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Espécie não encontrada' });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_especie: '1' };

      (especieRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      especieController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_especie: 'invalid' };

      especieController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });
  });

  describe('update', () => {
    it('deve atualizar uma espécie com sucesso', (done) => {
      const mockUpdate = {
        nome: 'Cachorro Atualizado',
        descricao: 'Animal doméstico atualizado'
      };
      mockRequest.params = { ID_especie: '1' };
      mockRequest.body = mockUpdate;

      (especieRepositories.update as jest.Mock).mockImplementation((id, nome, descricao, callback) => {
        callback(null, { affectedRows: 1 });
      });

      especieController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(especieRepositories.update).toHaveBeenCalledWith(
          1,
          'Cachorro Atualizado',
          'Animal doméstico atualizado',
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Espécie atualizada com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_especie: '1' };
      mockRequest.body = {
        nome: 'Cachorro Atualizado',
        descricao: 'Animal doméstico atualizado'
      };

      (especieRepositories.update as jest.Mock).mockImplementation((id, nome, descricao, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      especieController.update(mockRequest as Request, mockResponse as Response);

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
      mockRequest.params = { ID_especie: 'invalid' };
      mockRequest.body = {
        nome: 'Cachorro Atualizado',
        descricao: 'Animal doméstico atualizado'
      };

      especieController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando dados obrigatórios estiverem faltando', (done) => {
      mockRequest.params = { ID_especie: '1' };
      mockRequest.body = {
        nome: 'Cachorro Atualizado'
        // descricao faltando
      };

      especieController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('delete', () => {
    it('deve deletar uma espécie com sucesso', (done) => {
      mockRequest.params = { ID_especie: '1' };

      (especieRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      especieController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(especieRepositories.delete).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Espécie deletada com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_especie: '1' };

      (especieRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      especieController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_especie: 'invalid' };

      especieController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 404 quando espécie não for encontrada', (done) => {
      mockRequest.params = { ID_especie: '999' };

      (especieRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 0 });
      });

      especieController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Espécie não encontrada' });
        done();
      }, 0);
    });
  });
}); 