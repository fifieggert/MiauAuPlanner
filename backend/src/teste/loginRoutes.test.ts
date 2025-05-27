import request from 'supertest';
import express from 'express';
import loginRoutes from '../routes/loginRoutes';
import loginController from '../controllers/loginController';

// Mock das dependências
jest.mock('../controllers/loginController');

describe('LoginRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/login', loginRoutes);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('POST /login', () => {
    it('deve fazer login com sucesso', (done) => {
      const mockLoginData = {
        email: 'test@example.com',
        senha: 'password123'
      };

      (loginController.login as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json({
          token: 'mock-token',
          user: {
            id: 1,
            nome: 'Test User',
            email: 'test@example.com'
          }
        });
      });

      request(app)
        .post('/login')
        .send(mockLoginData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(loginController.login).toHaveBeenCalled();
          expect(res.body).toEqual({
            token: 'mock-token',
            user: {
              id: 1,
              nome: 'Test User',
              email: 'test@example.com'
            }
          });
          done();
        });
    });

    it('deve retornar erro 400 quando dados estiverem faltando', (done) => {
      const mockLoginData = {
        email: 'test@example.com'
        // senha faltando
      };

      request(app)
        .post('/login')
        .send(mockLoginData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual({ error: 'Email e senha são obrigatórios' });
          done();
        });
    });

    it('deve retornar erro 400 quando email for inválido', (done) => {
      const mockLoginData = {
        email: 'invalid-email',
        senha: 'password123'
      };

      request(app)
        .post('/login')
        .send(mockLoginData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual({ error: 'Email inválido' });
          done();
        });
    });

    it('deve retornar erro 401 quando credenciais forem inválidas', (done) => {
      const mockLoginData = {
        email: 'test@example.com',
        senha: 'wrong-password'
      };

      (loginController.login as jest.Mock).mockImplementation((req, res) => {
        res.status(401).json({ error: 'Credenciais inválidas' });
      });

      request(app)
        .post('/login')
        .send(mockLoginData)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(loginController.login).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Credenciais inválidas' });
          done();
        });
    });

    it('deve retornar erro 500 quando houver erro no servidor', (done) => {
      const mockLoginData = {
        email: 'test@example.com',
        senha: 'password123'
      };

      (loginController.login as jest.Mock).mockImplementation((req, res) => {
        res.status(500).json({ error: 'Erro no servidor' });
      });

      request(app)
        .post('/login')
        .send(mockLoginData)
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(loginController.login).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Erro no servidor' });
          done();
        });
    });
  });
}); 