import { Request, Response } from 'express';
import catalogoVacinasController from '../controllers/catalogoVacinasController';
import catalogoVacinasRepositories from '../repositories/catalogoVacinasRepositories';

// Mock das dependências
jest.mock('../repositories/catalogoVacinasRepositories');

describe('CatalogoVacinasController', () => {
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
    it('deve criar uma vacina no catálogo com sucesso', (done) => {
      const mockVacina = {
        nome: 'Test Vaccine',
        descricao: 'Test Description',
        id_especie: 1
      };
      mockRequest.body = mockVacina;

      (catalogoVacinasRepositories.create as jest.Mock).mockImplementation((nome, descricao, id_especie, callback) => {
        callback(null, { insertId: 1 });
      });

      catalogoVacinasController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(catalogoVacinasRepositories.create).toHaveBeenCalledWith(
          'Test Vaccine',
          'Test Description',
          1,
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(responseObject).toEqual({
          message: 'Vacina criada com sucesso',
          result: { insertId: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar erro 500 quando houver erro no repositório', (done) => {
      const mockVacina = {
        nome: 'Test Vaccine',
        descricao: 'Test Description',
        id_especie: 1
      };
      mockRequest.body = mockVacina;

      (catalogoVacinasRepositories.create as jest.Mock).mockImplementation((nome, descricao, id_especie, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      catalogoVacinasController.create(mockRequest as Request, mockResponse as Response);

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
      const mockVacina = {
        nome: 'Test Vaccine',
        // descricao faltando
        id_especie: 1
      };
      mockRequest.body = mockVacina;

      catalogoVacinasController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as vacinas do catálogo com sucesso', (done) => {
      const mockVacinas = [
        { ID_vacina: 1, nome: 'Vaccine 1', descricao: 'Description 1', id_especie: 1 },
        { ID_vacina: 2, nome: 'Vaccine 2', descricao: 'Description 2', id_especie: 2 }
      ];

      (catalogoVacinasRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, mockVacinas);
      });

      catalogoVacinasController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(catalogoVacinasRepositories.findAll).toHaveBeenCalledWith(expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockVacinas);
        done();
      }, 0);
    });

    it('deve retornar lista vazia quando não houver vacinas no catálogo', (done) => {
      (catalogoVacinasRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, []);
      });

      catalogoVacinasController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual([]);
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      (catalogoVacinasRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      catalogoVacinasController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });
  });

  describe('findById', () => {
    it('deve encontrar uma vacina do catálogo por ID com sucesso', (done) => {
      const mockVacina = { ID_vacina: 1, nome: 'Test Vaccine', descricao: 'Test Description', id_especie: 1 };
      mockRequest.params = { ID_vacina: '1' };

      (catalogoVacinasRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, [mockVacina]);
      });

      catalogoVacinasController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(catalogoVacinasRepositories.findById).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockVacina);
        done();
      }, 0);
    });

    it('deve retornar 404 quando vacina não for encontrada', (done) => {
      mockRequest.params = { ID_vacina: '999' };

      (catalogoVacinasRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, []);
      });

      catalogoVacinasController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Vacina não encontrada' });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_vacina: '1' };

      (catalogoVacinasRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      catalogoVacinasController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_vacina: 'invalid' };

      catalogoVacinasController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });
  });

  describe('update', () => {
    it('deve atualizar uma vacina do catálogo com sucesso', (done) => {
      const mockUpdate = {
        nome: 'Updated Vaccine',
        descricao: 'Updated Description',
        id_especie: 2
      };
      mockRequest.params = { ID_vacina: '1' };
      mockRequest.body = mockUpdate;

      (catalogoVacinasRepositories.update as jest.Mock).mockImplementation((id, nome, descricao, id_especie, callback) => {
        callback(null, { affectedRows: 1 });
      });

      catalogoVacinasController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(catalogoVacinasRepositories.update).toHaveBeenCalledWith(
          1,
          'Updated Vaccine',
          'Updated Description',
          2,
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Vacina atualizada com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_vacina: '1' };
      mockRequest.body = {
        nome: 'Updated Vaccine',
        descricao: 'Updated Description',
        id_especie: 2
      };

      (catalogoVacinasRepositories.update as jest.Mock).mockImplementation((id, nome, descricao, id_especie, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      catalogoVacinasController.update(mockRequest as Request, mockResponse as Response);

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
      mockRequest.params = { ID_vacina: 'invalid' };
      mockRequest.body = {
        nome: 'Updated Vaccine',
        descricao: 'Updated Description',
        id_especie: 2
      };

      catalogoVacinasController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando dados obrigatórios estiverem faltando', (done) => {
      mockRequest.params = { ID_vacina: '1' };
      mockRequest.body = {
        nome: 'Updated Vaccine',
        // descricao faltando
        id_especie: 2
      };

      catalogoVacinasController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('delete', () => {
    it('deve deletar uma vacina do catálogo com sucesso', (done) => {
      mockRequest.params = { ID_vacina: '1' };

      (catalogoVacinasRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      catalogoVacinasController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(catalogoVacinasRepositories.delete).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Vacina deletada com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_vacina: '1' };

      (catalogoVacinasRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      catalogoVacinasController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_vacina: 'invalid' };

      catalogoVacinasController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 404 quando vacina não for encontrada', (done) => {
      mockRequest.params = { ID_vacina: '999' };

      (catalogoVacinasRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 0 });
      });

      catalogoVacinasController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Vacina não encontrada' });
        done();
      }, 0);
    });
  });
}); 