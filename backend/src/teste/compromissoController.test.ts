import { Request, Response } from 'express';
import CompromissoController from '../controllers/compromissoController';
import CompromissoRepositorie from '../repositories/compromissosRepositories';

// Mock das dependências
jest.mock('../repositories/compromissosRepositories');

describe('CompromissoController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };
    responseObject = {};
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('deve criar um compromisso com sucesso', (done) => {
      const mockCompromisso = {
        data_compromissos: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Teste de compromisso'
      };
      mockRequest.body = mockCompromisso;

      (CompromissoRepositorie.create as jest.Mock).mockImplementation((data_compromissos, ID_animal, observacoes, callback) => {
        callback(null, { insertId: 1 });
      });

      CompromissoController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(CompromissoRepositorie.create).toHaveBeenCalledWith(
          '2024-03-20',
          1,
          'Teste de compromisso',
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(responseObject).toEqual({
          message: 'Compromisso criado com sucesso',
          result: { insertId: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar erro 500 quando houver erro no repositório', (done) => {
      const mockCompromisso = {
        data_compromissos: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Teste de compromisso'
      };
      mockRequest.body = mockCompromisso;

      (CompromissoRepositorie.create as jest.Mock).mockImplementation((data_compromissos, ID_animal, observacoes, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      CompromissoController.create(mockRequest as Request, mockResponse as Response);

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
      const mockCompromisso = {
        data_compromissos: '2024-03-20',
        // ID_animal faltando
        observacoes: 'Teste de compromisso'
      };
      mockRequest.body = mockCompromisso;

      CompromissoController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os compromissos com sucesso', (done) => {
      const mockCompromissos = [
        { ID_compromissos: 1, data_compromissos: '2024-03-20', ID_animal: 1, observacoes: 'Teste 1' },
        { ID_compromissos: 2, data_compromissos: '2024-03-21', ID_animal: 2, observacoes: 'Teste 2' }
      ];

      (CompromissoRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, mockCompromissos);
      });

      CompromissoController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(CompromissoRepositorie.findAll).toHaveBeenCalledWith(expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockCompromissos);
        done();
      }, 0);
    });

    it('deve retornar lista vazia quando não houver compromissos', (done) => {
      (CompromissoRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, []);
      });

      CompromissoController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual([]);
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      (CompromissoRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      CompromissoController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });
  });

  describe('findById', () => {
    it('deve encontrar um compromisso por ID com sucesso', (done) => {
      const mockCompromisso = { ID_compromissos: 1, data_compromissos: '2024-03-20', ID_animal: 1, observacoes: 'Teste' };
      mockRequest.params = { ID_compromissos: '1' };

      (CompromissoRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, [mockCompromisso]);
      });

      CompromissoController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(CompromissoRepositorie.findById).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockCompromisso);
        done();
      }, 0);
    });

    it('deve retornar 404 quando compromisso não for encontrado', (done) => {
      mockRequest.params = { ID_compromissos: '999' };

      (CompromissoRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, []);
      });

      CompromissoController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Compromisso não encontrado' });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_compromissos: '1' };

      (CompromissoRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      CompromissoController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_compromissos: 'invalid' };

      CompromissoController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });
  });

  describe('update', () => {
    it('deve atualizar um compromisso com sucesso', (done) => {
      const mockUpdate = {
        data_compromissos: '2024-03-21',
        observacoes: 'Teste atualizado'
      };
      mockRequest.params = { ID_compromissos: '1' };
      mockRequest.body = mockUpdate;

      (CompromissoRepositorie.update as jest.Mock).mockImplementation((id, data_compromissos, observacoes, callback) => {
        callback(null, { affectedRows: 1 });
      });

      CompromissoController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(CompromissoRepositorie.update).toHaveBeenCalledWith(
          1,
          '2024-03-21',
          'Teste atualizado',
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Compromisso atualizado com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_compromissos: '1' };
      mockRequest.body = {
        data_compromissos: '2024-03-21',
        observacoes: 'Teste atualizado'
      };

      (CompromissoRepositorie.update as jest.Mock).mockImplementation((id, data_compromissos, observacoes, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      CompromissoController.update(mockRequest as Request, mockResponse as Response);

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
      mockRequest.params = { ID_compromissos: 'invalid' };
      mockRequest.body = {
        data_compromissos: '2024-03-21',
        observacoes: 'Teste atualizado'
      };

      CompromissoController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando dados obrigatórios estiverem faltando', (done) => {
      mockRequest.params = { ID_compromissos: '1' };
      mockRequest.body = {
        data_compromissos: '2024-03-21',
        // observacoes faltando
      };

      CompromissoController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('delete', () => {
    it('deve deletar um compromisso com sucesso', (done) => {
      mockRequest.params = { ID_compromissos: '1' };

      (CompromissoRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      CompromissoController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(CompromissoRepositorie.delete).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Compromisso deletado com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_compromissos: '1' };

      (CompromissoRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      CompromissoController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_compromissos: 'invalid' };

      CompromissoController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 404 quando compromisso não for encontrado', (done) => {
      mockRequest.params = { ID_compromissos: '999' };

      (CompromissoRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 0 });
      });

      CompromissoController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Compromisso não encontrado' });
        done();
      }, 0);
    });
  });
}); 