import { Request, Response } from 'express';
import vacinasAplicadasController from '../controllers/vacinasAplicadasController';
import vacinasAplicadasRepositories from '../repositories/vacinasAplicadasRepositories';

// Mock das dependências
jest.mock('../repositories/vacinasAplicadasRepositories');

describe('VacinasAplicadasController', () => {
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
    it('deve criar uma vacina aplicada com sucesso', (done) => {
      const mockVacinaAplicada = {
        data_aplicacao: '2024-03-20',
        proxima_dose: '2025-03-20',
        id_animal: 1,
        id_vacina: 1,
        id_veterinario: 1
      };
      mockRequest.body = mockVacinaAplicada;

      (vacinasAplicadasRepositories.create as jest.Mock).mockImplementation((data_aplicacao, proxima_dose, id_animal, id_vacina, id_veterinario, callback) => {
        callback(null, { insertId: 1 });
      });

      vacinasAplicadasController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(vacinasAplicadasRepositories.create).toHaveBeenCalledWith(
          '2024-03-20',
          '2025-03-20',
          1,
          1,
          1,
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(responseObject).toEqual({
          message: 'Vacina aplicada criada com sucesso',
          result: { insertId: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar erro 500 quando houver erro no repositório', (done) => {
      const mockVacinaAplicada = {
        data_aplicacao: '2024-03-20',
        proxima_dose: '2025-03-20',
        id_animal: 1,
        id_vacina: 1,
        id_veterinario: 1
      };
      mockRequest.body = mockVacinaAplicada;

      (vacinasAplicadasRepositories.create as jest.Mock).mockImplementation((data_aplicacao, proxima_dose, id_animal, id_vacina, id_veterinario, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      vacinasAplicadasController.create(mockRequest as Request, mockResponse as Response);

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
      const mockVacinaAplicada = {
        data_aplicacao: '2024-03-20',
        // proxima_dose faltando
        id_animal: 1,
        id_vacina: 1,
        id_veterinario: 1
      };
      mockRequest.body = mockVacinaAplicada;

      vacinasAplicadasController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as vacinas aplicadas com sucesso', (done) => {
      const mockVacinasAplicadas = [
        { ID_vacina_aplicada: 1, data_aplicacao: '2024-03-20', proxima_dose: '2025-03-20', id_animal: 1, id_vacina: 1, id_veterinario: 1 },
        { ID_vacina_aplicada: 2, data_aplicacao: '2024-03-21', proxima_dose: '2025-03-21', id_animal: 2, id_vacina: 2, id_veterinario: 2 }
      ];

      (vacinasAplicadasRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, mockVacinasAplicadas);
      });

      vacinasAplicadasController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(vacinasAplicadasRepositories.findAll).toHaveBeenCalledWith(expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockVacinasAplicadas);
        done();
      }, 0);
    });

    it('deve retornar lista vazia quando não houver vacinas aplicadas', (done) => {
      (vacinasAplicadasRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, []);
      });

      vacinasAplicadasController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual([]);
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      (vacinasAplicadasRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      vacinasAplicadasController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });
  });

  describe('findById', () => {
    it('deve encontrar uma vacina aplicada por ID com sucesso', (done) => {
      const mockVacinaAplicada = { ID_vacina_aplicada: 1, data_aplicacao: '2024-03-20', proxima_dose: '2025-03-20', id_animal: 1, id_vacina: 1, id_veterinario: 1 };
      mockRequest.params = { ID_vacina_aplicada: '1' };

      (vacinasAplicadasRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, [mockVacinaAplicada]);
      });

      vacinasAplicadasController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(vacinasAplicadasRepositories.findById).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockVacinaAplicada);
        done();
      }, 0);
    });

    it('deve retornar 404 quando vacina aplicada não for encontrada', (done) => {
      mockRequest.params = { ID_vacina_aplicada: '999' };

      (vacinasAplicadasRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, []);
      });

      vacinasAplicadasController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Vacina aplicada não encontrada' });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_vacina_aplicada: '1' };

      (vacinasAplicadasRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      vacinasAplicadasController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_vacina_aplicada: 'invalid' };

      vacinasAplicadasController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });
  });

  describe('update', () => {
    it('deve atualizar uma vacina aplicada com sucesso', (done) => {
      const mockUpdate = {
        data_aplicacao: '2024-03-21',
        proxima_dose: '2025-03-21',
        id_animal: 2,
        id_vacina: 2,
        id_veterinario: 2
      };
      mockRequest.params = { ID_vacina_aplicada: '1' };
      mockRequest.body = mockUpdate;

      (vacinasAplicadasRepositories.update as jest.Mock).mockImplementation((id, data_aplicacao, proxima_dose, id_animal, id_vacina, id_veterinario, callback) => {
        callback(null, { affectedRows: 1 });
      });

      vacinasAplicadasController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(vacinasAplicadasRepositories.update).toHaveBeenCalledWith(
          1,
          '2024-03-21',
          '2025-03-21',
          2,
          2,
          2,
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Vacina aplicada atualizada com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_vacina_aplicada: '1' };
      mockRequest.body = {
        data_aplicacao: '2024-03-21',
        proxima_dose: '2025-03-21',
        id_animal: 2,
        id_vacina: 2,
        id_veterinario: 2
      };

      (vacinasAplicadasRepositories.update as jest.Mock).mockImplementation((id, data_aplicacao, proxima_dose, id_animal, id_vacina, id_veterinario, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      vacinasAplicadasController.update(mockRequest as Request, mockResponse as Response);

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
      mockRequest.params = { ID_vacina_aplicada: 'invalid' };
      mockRequest.body = {
        data_aplicacao: '2024-03-21',
        proxima_dose: '2025-03-21',
        id_animal: 2,
        id_vacina: 2,
        id_veterinario: 2
      };

      vacinasAplicadasController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando dados obrigatórios estiverem faltando', (done) => {
      mockRequest.params = { ID_vacina_aplicada: '1' };
      mockRequest.body = {
        data_aplicacao: '2024-03-21',
        // proxima_dose faltando
        id_animal: 2,
        id_vacina: 2,
        id_veterinario: 2
      };

      vacinasAplicadasController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('delete', () => {
    it('deve deletar uma vacina aplicada com sucesso', (done) => {
      mockRequest.params = { ID_vacina_aplicada: '1' };

      (vacinasAplicadasRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      vacinasAplicadasController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(vacinasAplicadasRepositories.delete).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Vacina aplicada deletada com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_vacina_aplicada: '1' };

      (vacinasAplicadasRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      vacinasAplicadasController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_vacina_aplicada: 'invalid' };

      vacinasAplicadasController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 404 quando vacina aplicada não for encontrada', (done) => {
      mockRequest.params = { ID_vacina_aplicada: '999' };

      (vacinasAplicadasRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 0 });
      });

      vacinasAplicadasController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Vacina aplicada não encontrada' });
        done();
      }, 0);
    });
  });
}); 