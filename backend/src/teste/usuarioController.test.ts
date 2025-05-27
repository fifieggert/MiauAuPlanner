import { Request, Response } from 'express';
import usuarioController from '../controllers/usuarioController';
import usuarioRepositorie from '../repositories/usuarioRepositories';
import bcrypt from 'bcrypt';

// Mock das dependências
jest.mock('../repositories/usuarioRepositories');
jest.mock('bcrypt');

describe('UsuarioController', () => {
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
    it('deve criar um usuário com sucesso', (done) => {
      const mockUser = {
        nome: 'Test User',
        telefone: '123456789',
        cpf: '12345678900',
        email: 'test@test.com',
        senha: 'password123'
      };
      mockRequest.body = mockUser;

      (bcrypt.hash as jest.Mock).mockImplementation((password, salt, callback) => {
        callback(null, 'hashedPassword');
      });

      (usuarioRepositorie.create as jest.Mock).mockImplementation((nome, telefone, cpf, email, senha, callback) => {
        callback(null, { insertId: 1 });
      });

      usuarioController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10, expect.any(Function));
        expect(usuarioRepositorie.create).toHaveBeenCalledWith(
          'Test User',
          '123456789',
          '12345678900',
          'test@test.com',
          'hashedPassword',
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(responseObject).toEqual({
          message: 'Usuário criado com sucesso',
          result: { insertId: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar erro 500 quando houver erro na criptografia', (done) => {
      const mockUser = {
        nome: 'Test User',
        telefone: '123456789',
        cpf: '12345678900',
        email: 'test@test.com',
        senha: 'password123'
      };
      mockRequest.body = mockUser;

      (bcrypt.hash as jest.Mock).mockImplementation((password, salt, callback) => {
        callback(new Error('Erro na criptografia'), null);
      });

      usuarioController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro ao criptografar senha' });
        done();
      }, 0);
    });

    it('deve retornar erro 500 quando houver erro no repositório', (done) => {
      const mockUser = {
        nome: 'Test User',
        telefone: '123456789',
        cpf: '12345678900',
        email: 'test@test.com',
        senha: 'password123'
      };
      mockRequest.body = mockUser;

      (bcrypt.hash as jest.Mock).mockImplementation((password, salt, callback) => {
        callback(null, 'hashedPassword');
      });

      (usuarioRepositorie.create as jest.Mock).mockImplementation((nome, telefone, cpf, email, senha, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      usuarioController.create(mockRequest as Request, mockResponse as Response);

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
      const mockUser = {
        nome: 'Test User',
        telefone: '123456789',
        // cpf faltando
        email: 'test@test.com',
        senha: 'password123'
      };
      mockRequest.body = mockUser;

      usuarioController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários com sucesso', (done) => {
      const mockUsers = [
        { id: 1, nome: 'User 1' },
        { id: 2, nome: 'User 2' }
      ];

      (usuarioRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, mockUsers);
      });

      usuarioController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(usuarioRepositorie.findAll).toHaveBeenCalledWith(expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockUsers);
        done();
      }, 0);
    });

    it('deve retornar lista vazia quando não houver usuários', (done) => {
      (usuarioRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, []);
      });

      usuarioController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual([]);
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      (usuarioRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      usuarioController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });
  });

  describe('findById', () => {
    it('deve encontrar um usuário por ID com sucesso', (done) => {
      const mockUser = { ID_usuario: 1, nome: 'Test User' };
      mockRequest.params = { ID_usuario: '1' };

      (usuarioRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, [mockUser]);
      });

      usuarioController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(usuarioRepositorie.findById).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockUser);
        done();
      }, 0);
    });

    it('deve retornar 404 quando usuário não for encontrado', (done) => {
      mockRequest.params = { ID_usuario: '999' };

      (usuarioRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, []);
      });

      usuarioController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Usuário não encontrado' });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_usuario: '1' };

      (usuarioRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      usuarioController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_usuario: 'invalid' };

      usuarioController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário com sucesso', (done) => {
      const mockUpdate = {
        nome: 'Updated User',
        telefone: '987654321',
        email: 'updated@test.com'
      };
      mockRequest.params = { ID_usuario: '1' };
      mockRequest.body = mockUpdate;

      (usuarioRepositorie.update as jest.Mock).mockImplementation((id, nome, telefone, email, callback) => {
        callback(null, { affectedRows: 1 });
      });

      usuarioController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(usuarioRepositorie.update).toHaveBeenCalledWith(
          1,
          'Updated User',
          '987654321',
          'updated@test.com',
          expect.any(Function)
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Usuário atualizado com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_usuario: '1' };
      mockRequest.body = {
        nome: 'Updated User',
        telefone: '987654321',
        email: 'updated@test.com'
      };

      (usuarioRepositorie.update as jest.Mock).mockImplementation((id, nome, telefone, email, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      usuarioController.update(mockRequest as Request, mockResponse as Response);

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
      mockRequest.params = { ID_usuario: 'invalid' };
      mockRequest.body = {
        nome: 'Updated User',
        telefone: '987654321',
        email: 'updated@test.com'
      };

      usuarioController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando dados obrigatórios estiverem faltando', (done) => {
      mockRequest.params = { ID_usuario: '1' };
      mockRequest.body = {
        nome: 'Updated User',
        // telefone faltando
        email: 'updated@test.com'
      };

      usuarioController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Dados obrigatórios faltando' });
        done();
      }, 0);
    });
  });

  describe('delete', () => {
    it('deve deletar um usuário com sucesso', (done) => {
      mockRequest.params = { ID_usuario: '1' };

      (usuarioRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      usuarioController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(usuarioRepositorie.delete).toHaveBeenCalledWith(1, expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          message: 'Usuário deletado com sucesso',
          result: { affectedRows: 1 }
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.params = { ID_usuario: '1' };

      (usuarioRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      usuarioController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      mockRequest.params = { ID_usuario: 'invalid' };

      usuarioController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'ID inválido' });
        done();
      }, 0);
    });

    it('deve retornar 404 quando usuário não for encontrado', (done) => {
      mockRequest.params = { ID_usuario: '999' };

      (usuarioRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 0 });
      });

      usuarioController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject).toEqual({ error: 'Usuário não encontrado' });
        done();
      }, 0);
    });
  });
}); 