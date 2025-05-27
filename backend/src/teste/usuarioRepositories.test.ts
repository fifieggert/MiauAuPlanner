import usuarioRepositorie from '../repositories/usuarioRepositories';
import connection from '../config/bd';
import bcrypt from 'bcrypt';

// Mock das dependências
jest.mock('../config/bd');
jest.mock('bcrypt');

describe('UsuarioRepositorie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um usuário com sucesso', (done) => {
      const mockResult = { insertId: 1 };
      const mockHash = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockImplementation((password, salt, callback) => {
        callback(null, mockHash);
      });
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      usuarioRepositorie.create(
        'Test User',
        '1234567890',
        '123.456.789-00',
        'test@example.com',
        'password123',
        (err: Error | null, result?: any) => {
          expect(err).toBeNull();
          expect(result).toEqual(mockResult);
          expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10, expect.any(Function));
          expect(connection.query).toHaveBeenCalledWith(
            'INSERT INTO usuario (nome, telefone, cpf, email, senha) VALUES (?, ?, ?, ?, ?)',
            ['Test User', '1234567890', '123.456.789-00', 'test@example.com', mockHash],
            expect.any(Function)
          );
          done();
        }
      );
    });

    it('deve retornar erro quando houver falha no hash da senha', (done) => {
      const mockError = new Error('Erro no hash da senha');
      (bcrypt.hash as jest.Mock).mockImplementation((password, salt, callback) => {
        callback(mockError, null);
      });

      usuarioRepositorie.create(
        'Test User',
        '1234567890',
        '123.456.789-00',
        'test@example.com',
        'password123',
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          expect(connection.query).not.toHaveBeenCalled();
          done();
        }
      );
    });

    it('deve retornar erro quando houver falha no banco de dados', (done) => {
      const mockHash = 'hashedPassword';
      const mockError = new Error('Erro no banco de dados');
      (bcrypt.hash as jest.Mock).mockImplementation((password, salt, callback) => {
        callback(null, mockHash);
      });
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      usuarioRepositorie.create(
        'Test User',
        '1234567890',
        '123.456.789-00',
        'test@example.com',
        'password123',
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários com sucesso', (done) => {
      const mockUsuarios = [
        { ID_usuario: 1, email: 'test1@example.com', nome: 'Test User 1' },
        { ID_usuario: 2, email: 'test2@example.com', nome: 'Test User 2' }
      ];
      (connection.query as jest.Mock).mockImplementation((query, callback) => {
        callback(null, mockUsuarios);
      });

      usuarioRepositorie.findAll((err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockUsuarios);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM usuario',
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

      usuarioRepositorie.findAll((err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findById', () => {
    it('deve encontrar um usuário por ID com sucesso', (done) => {
      const mockUsuario = { ID_usuario: 1, email: 'test@example.com', nome: 'Test User' };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, [mockUsuario]);
      });

      usuarioRepositorie.findById(1, (err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual([mockUsuario]);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM usuario WHERE ID_usuario = ?',
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

      usuarioRepositorie.findById(1, (err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('findByEmail', () => {
    it('deve encontrar um usuário por email com sucesso', (done) => {
      const mockUsuario = { ID_usuario: 1, email: 'test@example.com', nome: 'Test User', senha: 'hashedPassword' };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, [mockUsuario]);
      });

      usuarioRepositorie.findByEmail('test@example.com', (err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockUsuario);
        expect(connection.query).toHaveBeenCalledWith(
          'SELECT * FROM usuario WHERE email = ?',
          ['test@example.com'],
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

      usuarioRepositorie.findByEmail('test@example.com', (err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      usuarioRepositorie.update(
        1,
        'New Name',
        '9876543210',
        'new@example.com',
        (err: Error | null, result?: any) => {
          expect(err).toBeNull();
          expect(result).toEqual(mockResult);
          expect(connection.query).toHaveBeenCalledWith(
            'UPDATE usuario SET nome = ?, telefone = ?, email = ? WHERE ID_usuario = ?',
            ['New Name', '9876543210', 'new@example.com', 1],
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

      usuarioRepositorie.update(
        1,
        'New Name',
        '9876543210',
        'new@example.com',
        (err: Error | null, result?: any) => {
          expect(err).toEqual(mockError);
          expect(result).toBeUndefined();
          done();
        }
      );
    });
  });

  describe('delete', () => {
    it('deve deletar um usuário com sucesso', (done) => {
      const mockResult = { affectedRows: 1 };
      (connection.query as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      usuarioRepositorie.delete(1, (err: Error | null, result?: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(connection.query).toHaveBeenCalledWith(
          'DELETE FROM usuario WHERE ID_usuario = ?',
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

      usuarioRepositorie.delete(1, (err: Error | null, result?: any) => {
        expect(err).toEqual(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
}); 