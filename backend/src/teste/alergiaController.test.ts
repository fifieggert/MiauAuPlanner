import { Request, Response } from 'express';
import alergiaController from '../controllers/alergiaController';
import alergiaRepositories from '../repositories/alergiaRepositories';

// Mock das dependências
jest.mock('../repositories/alergiaRepositories');

describe('AlergiaController', () => {
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
    it('deve criar uma alergia com sucesso', (done) => {
      const mockAlergia = {
        nome: 'Alergia a Penicilina',
        descricao: 'Reação alérgica a penicilina',
        id_animal: 1
      };
      mockRequest.body = mockAlergia;

      (alergiaRepositories.create as jest.Mock).mockImplementation((nome, descricao, id_animal, callback) => {
        callback(null, { insertId: 1 });
      });

      alergiaController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(alergiaRepositories.create).toHaveBeenCalledWith(
          'Alergia a Penicilina',
          'Reação alérgica a penicilina',
          1,
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(responseObject).toEqual({
          message: 'Alergia criada com sucesso',
          result: { insertId: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar erro 500 quando houver erro no repositório', (done) => {
      const mockAlergia = {
        nome: 'Alergia a Penicilina',
        descricao: 'Reação alérgica a penicilina',
        id_animal: 1
      };
      mockRequest.body = mockAlergia;

      (alergiaRepositories.create as jest.Mock).mockImplementation((nome, descricao, id_animal, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      alergiaController.create(mockRequest as Request, mockResponse as Response);

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
      const mockAlergia = {
        nome: 'Alergia a Penicilina',
        // descricao faltando
        id_animal: 1
      };
      mockRequest.body = mockAlergia;

      alergiaController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as alergias com sucesso', (done) => {
      const mockAlergias = [
        { ID_alergia: 1, nome: 'Alergia 1', descricao: 'Descrição 1', id_animal: 1 },
        { ID_alergia: 2, nome: 'Alergia 2', descricao: 'Descrição 2', id_animal: 2 }
      ];

      (alergiaRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, mockAlergias);
      });

      alergiaController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(alergiaRepositories.findAll).toHaveBeenCalledWith(expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockAlergias);
        done();
      }, 0);
    });

    it('deve retornar lista vazia quando não houver alergias', (done) => {
      (alergiaRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, []);
      });

      alergiaController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual([]);
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      (alergiaRepositories.findAll as jest.Mock).mockImplementation((callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      alergiaController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });
  });

  describe('findById', () => {
    it('deve encontrar uma alergia por ID com sucesso', (done) => {
      const mockAlergia = { ID_alergia: 1, nome: 'Alergia 1', descricao: 'Descrição 1', id_animal: 1 };
      mockRequest.params = { ID_alergia: '1' };

      (alergiaRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, [mockAlergia]);
      });

      alergiaController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(alergiaRepositories.findById).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockAlergia);
        done();
      }, 0);
    });

    it('deve retornar 404 quando alergia não for encontrada', (done) => {
      mockRequest.params = { ID_alergia: '999' };

      (alergiaRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, []);
      });

      alergiaController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Alergia não encontrada' });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_alergia: '1' };

      (alergiaRepositories.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      alergiaController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_alergia: 'invalid' };

      alergiaController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });
  });

  describe('update', () => {
    it('deve atualizar uma alergia com sucesso', (done) => {
      const mockUpdate = {
        nome: 'Alergia Atualizada',
        descricao: 'Descrição Atualizada',
        id_animal: 2
      };
      mockRequest.params = { ID_alergia: '1' };
      mockRequest.body = mockUpdate;

      (alergiaRepositories.update as jest.Mock).mockImplementation((id, nome, descricao, id_animal, callback) => {
        callback(null, { affectedRows: 1 });
      });

      alergiaController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(alergiaRepositories.update).toHaveBeenCalledWith(
          1,
          'Alergia Atualizada',
          'Descrição Atualizada',
          2,
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Alergia atualizada com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_alergia: '1' };
      mockRequest.body = {
        nome: 'Alergia Atualizada',
        descricao: 'Descrição Atualizada',
        id_animal: 2
      };

      (alergiaRepositories.update as jest.Mock).mockImplementation((id, nome, descricao, id_animal, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      alergiaController.update(mockRequest as Request, mockResponse as Response);

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
      mockRequest.params = { ID_alergia: 'invalid' };
      mockRequest.body = {
        nome: 'Alergia Atualizada',
        descricao: 'Descrição Atualizada',
        id_animal: 2
      };

      alergiaController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando dados obrigatórios estiverem faltando', (done) => {
      mockRequest.params = { ID_alergia: '1' };
      mockRequest.body = {
        nome: 'Alergia Atualizada',
        // descricao faltando
        id_animal: 2
      };

      alergiaController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('delete', () => {
    it('deve deletar uma alergia com sucesso', (done) => {
      mockRequest.params = { ID_alergia: '1' };

      (alergiaRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      alergiaController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(alergiaRepositories.delete).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Alergia deletada com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_alergia: '1' };

      (alergiaRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      alergiaController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_alergia: 'invalid' };

      alergiaController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 404 quando alergia não for encontrada', (done) => {
      mockRequest.params = { ID_alergia: '999' };

      (alergiaRepositories.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 0 });
      });

      alergiaController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Alergia não encontrada' });
        done();
      }, 0);
    });
  });
}); 