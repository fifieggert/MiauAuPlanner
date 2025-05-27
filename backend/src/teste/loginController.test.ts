import { Request, Response } from 'express';
import loginController from '../controllers/loginController';
import usuarioRepositorie from '../repositories/usuarioRepositories';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock das dependências
jest.mock('../repositories/usuarioRepositories');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('LoginController', () => {
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

  describe('login', () => {
    it('deve realizar login com sucesso', (done) => {
      const mockUser = {
        ID_usuario: 1,
        nome: 'Test User',
        email: 'test@test.com',
        senha: 'hashedPassword'
      };
      mockRequest.body = {
        email: 'test@test.com',
        senha: 'password123'
      };

      (usuarioRepositorie.findByEmail as jest.Mock).mockImplementation((email, callback) => {
        callback(null, mockUser);
      });

      (bcrypt.compare as jest.Mock).mockImplementation((password, hash, callback) => {
        callback(null, true);
      });

      (jwt.sign as jest.Mock).mockReturnValue('mockToken');

      loginController.login(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(usuarioRepositorie.findByEmail).toHaveBeenCalledWith('test@test.com', expect.any(Function));
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
        expect(jwt.sign).toHaveBeenCalledWith(
          { id: 1 },
          expect.any(String),
          { expiresIn: '1h' }
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({
          token: 'mockToken',
          usuario: mockUser
        });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro no repositório', (done) => {
      mockRequest.body = {
        email: 'test@test.com',
        senha: 'password123'
      };

      (usuarioRepositorie.findByEmail as jest.Mock).mockImplementation((email, callback) => {
        callback(new Error('Erro no banco de dados'), null);
      });

      loginController.login(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro no servidor' });
        done();
      }, 0);
    });

    it('deve retornar 401 quando usuário não for encontrado', (done) => {
      mockRequest.body = {
        email: 'nonexistent@test.com',
        senha: 'password123'
      };

      (usuarioRepositorie.findByEmail as jest.Mock).mockImplementation((email, callback) => {
        callback(null, null);
      });

      loginController.login(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(responseObject).toEqual({ error: 'Usuário não encontrado' });
        done();
      }, 0);
    });

    it('deve retornar 401 quando senha estiver incorreta', (done) => {
      const mockUser = {
        ID_usuario: 1,
        nome: 'Test User',
        email: 'test@test.com',
        senha: 'hashedPassword'
      };
      mockRequest.body = {
        email: 'test@test.com',
        senha: 'wrongPassword'
      };

      (usuarioRepositorie.findByEmail as jest.Mock).mockImplementation((email, callback) => {
        callback(null, mockUser);
      });

      (bcrypt.compare as jest.Mock).mockImplementation((password, hash, callback) => {
        callback(null, false);
      });

      loginController.login(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(responseObject).toEqual({ error: 'Senha inválida' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando email estiver faltando', (done) => {
      mockRequest.body = {
        senha: 'password123'
      };

      loginController.login(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Email e senha são obrigatórios' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando senha estiver faltando', (done) => {
      mockRequest.body = {
        email: 'test@test.com'
      };

      loginController.login(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Email e senha são obrigatórios' });
        done();
      }, 0);
    });

    it('deve retornar 400 quando email for inválido', (done) => {
      mockRequest.body = {
        email: 'invalid-email',
        senha: 'password123'
      };

      loginController.login(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseObject).toEqual({ error: 'Email inválido' });
        done();
      }, 0);
    });

    it('deve retornar 500 quando houver erro na geração do token', (done) => {
      const mockUser = {
        ID_usuario: 1,
        nome: 'Test User',
        email: 'test@test.com',
        senha: 'hashedPassword'
      };
      mockRequest.body = {
        email: 'test@test.com',
        senha: 'password123'
      };

      (usuarioRepositorie.findByEmail as jest.Mock).mockImplementation((email, callback) => {
        callback(null, mockUser);
      });

      (bcrypt.compare as jest.Mock).mockImplementation((password, hash, callback) => {
        callback(null, true);
      });

      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw new Error('Erro ao gerar token');
      });

      loginController.login(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject).toEqual({ error: 'Erro ao gerar token' });
        done();
      }, 0);
    });
  });
}); 