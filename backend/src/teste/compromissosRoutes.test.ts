import request from 'supertest';
import express from 'express';
import compromissosRoutes from '../routes/compromissosRoutes';
import compromissoController from '../controllers/compromissoController';

// Mock das dependências
jest.mock('../controllers/compromissoController');

describe('CompromissosRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/compromissos', compromissosRoutes);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('POST /compromissos', () => {
    it('deve criar um compromisso com sucesso', (done) => {
      const mockCompromisso = {
        data_compromissos: '2024-03-20',
        hora: '14:00',
        tipo: 'Consulta',
        id_animal: 1,
        id_veterinario: 1,
        observacoes: 'Consulta de rotina'
      };

      (compromissoController.create as jest.Mock).mockImplementation((req, res) => {
        res.status(201).json({
          message: 'Compromisso criado com sucesso',
          result: { insertId: 1 }
        });
      });

      request(app)
        .post('/compromissos')
        .send(mockCompromisso)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.create).toHaveBeenCalled();
          expect(res.body).toEqual({
            message: 'Compromisso criado com sucesso',
            result: { insertId: 1 }
          });
          done();
        });
    });

    it('deve retornar erro 400 quando dados estiverem faltando', (done) => {
      const mockCompromisso = {
        data_compromissos: '2024-03-20',
        hora: '14:00',
        // tipo faltando
        id_animal: 1,
        id_veterinario: 1
      };

      request(app)
        .post('/compromissos')
        .send(mockCompromisso)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual({ error: 'Dados obrigatórios faltando' });
          done();
        });
    });

    it('deve retornar erro 500 quando houver erro no servidor', (done) => {
      const mockCompromisso = {
        data_compromissos: '2024-03-20',
        hora: '14:00',
        tipo: 'Consulta',
        id_animal: 1,
        id_veterinario: 1,
        observacoes: 'Consulta de rotina'
      };

      (compromissoController.create as jest.Mock).mockImplementation((req, res) => {
        res.status(500).json({ error: 'Erro no servidor' });
      });

      request(app)
        .post('/compromissos')
        .send(mockCompromisso)
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.create).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Erro no servidor' });
          done();
        });
    });
  });

  describe('GET /compromissos', () => {
    it('deve retornar todos os compromissos com sucesso', (done) => {
      const mockCompromissos = [
        {
          ID_compromissos: 1,
          data_compromissos: '2024-03-20',
          hora: '14:00',
          tipo: 'Consulta',
          id_animal: 1,
          id_veterinario: 1,
          observacoes: 'Consulta de rotina'
        },
        {
          ID_compromissos: 2,
          data_compromissos: '2024-03-21',
          hora: '15:00',
          tipo: 'Vacinação',
          id_animal: 2,
          id_veterinario: 1,
          observacoes: 'Vacina anual'
        }
      ];

      (compromissoController.findAll as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json(mockCompromissos);
      });

      request(app)
        .get('/compromissos')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.findAll).toHaveBeenCalled();
          expect(res.body).toEqual(mockCompromissos);
          done();
        });
    });

    it('deve retornar 500 quando houver erro no servidor', (done) => {
      (compromissoController.findAll as jest.Mock).mockImplementation((req, res) => {
        res.status(500).json({ error: 'Erro no servidor' });
      });

      request(app)
        .get('/compromissos')
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.findAll).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Erro no servidor' });
          done();
        });
    });
  });

  describe('GET /compromissos/:ID_compromissos', () => {
    it('deve retornar um compromisso específico com sucesso', (done) => {
      const mockCompromisso = {
        ID_compromissos: 1,
        data_compromissos: '2024-03-20',
        hora: '14:00',
        tipo: 'Consulta',
        id_animal: 1,
        id_veterinario: 1,
        observacoes: 'Consulta de rotina'
      };

      (compromissoController.findById as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json(mockCompromisso);
      });

      request(app)
        .get('/compromissos/1')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.findById).toHaveBeenCalled();
          expect(res.body).toEqual(mockCompromisso);
          done();
        });
    });

    it('deve retornar 404 quando compromisso não for encontrado', (done) => {
      (compromissoController.findById as jest.Mock).mockImplementation((req, res) => {
        res.status(404).json({ error: 'Compromisso não encontrado' });
      });

      request(app)
        .get('/compromissos/999')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.findById).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Compromisso não encontrado' });
          done();
        });
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      request(app)
        .get('/compromissos/invalid')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual({ error: 'ID inválido' });
          done();
        });
    });

    it('deve retornar 500 quando houver erro no servidor', (done) => {
      (compromissoController.findById as jest.Mock).mockImplementation((req, res) => {
        res.status(500).json({ error: 'Erro no servidor' });
      });

      request(app)
        .get('/compromissos/1')
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.findById).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Erro no servidor' });
          done();
        });
    });
  });

  describe('PUT /compromissos/:ID_compromissos', () => {
    it('deve atualizar um compromisso com sucesso', (done) => {
      const mockUpdate = {
        data_compromissos: '2024-03-21',
        hora: '15:00',
        tipo: 'Vacinação',
        id_animal: 2,
        id_veterinario: 1,
        observacoes: 'Vacina anual'
      };

      (compromissoController.update as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json({
          message: 'Compromisso atualizado com sucesso',
          result: { affectedRows: 1 }
        });
      });

      request(app)
        .put('/compromissos/1')
        .send(mockUpdate)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.update).toHaveBeenCalled();
          expect(res.body).toEqual({
            message: 'Compromisso atualizado com sucesso',
            result: { affectedRows: 1 }
          });
          done();
        });
    });

    it('deve retornar erro 400 quando dados estiverem faltando', (done) => {
      const mockUpdate = {
        data_compromissos: '2024-03-21',
        hora: '15:00',
        // tipo faltando
        id_animal: 2,
        id_veterinario: 1
      };

      request(app)
        .put('/compromissos/1')
        .send(mockUpdate)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual({ error: 'Dados obrigatórios faltando' });
          done();
        });
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      const mockUpdate = {
        data_compromissos: '2024-03-21',
        hora: '15:00',
        tipo: 'Vacinação',
        id_animal: 2,
        id_veterinario: 1,
        observacoes: 'Vacina anual'
      };

      request(app)
        .put('/compromissos/invalid')
        .send(mockUpdate)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual({ error: 'ID inválido' });
          done();
        });
    });

    it('deve retornar 500 quando houver erro no servidor', (done) => {
      const mockUpdate = {
        data_compromissos: '2024-03-21',
        hora: '15:00',
        tipo: 'Vacinação',
        id_animal: 2,
        id_veterinario: 1,
        observacoes: 'Vacina anual'
      };

      (compromissoController.update as jest.Mock).mockImplementation((req, res) => {
        res.status(500).json({ error: 'Erro no servidor' });
      });

      request(app)
        .put('/compromissos/1')
        .send(mockUpdate)
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.update).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Erro no servidor' });
          done();
        });
    });
  });

  describe('DELETE /compromissos/:ID_compromissos', () => {
    it('deve deletar um compromisso com sucesso', (done) => {
      (compromissoController.delete as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json({
          message: 'Compromisso deletado com sucesso',
          result: { affectedRows: 1 }
        });
      });

      request(app)
        .delete('/compromissos/1')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.delete).toHaveBeenCalled();
          expect(res.body).toEqual({
            message: 'Compromisso deletado com sucesso',
            result: { affectedRows: 1 }
          });
          done();
        });
    });

    it('deve retornar 404 quando compromisso não for encontrado', (done) => {
      (compromissoController.delete as jest.Mock).mockImplementation((req, res) => {
        res.status(404).json({ error: 'Compromisso não encontrado' });
      });

      request(app)
        .delete('/compromissos/999')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.delete).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Compromisso não encontrado' });
          done();
        });
    });

    it('deve retornar 400 quando ID for inválido', (done) => {
      request(app)
        .delete('/compromissos/invalid')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual({ error: 'ID inválido' });
          done();
        });
    });

    it('deve retornar 500 quando houver erro no servidor', (done) => {
      (compromissoController.delete as jest.Mock).mockImplementation((req, res) => {
        res.status(500).json({ error: 'Erro no servidor' });
      });

      request(app)
        .delete('/compromissos/1')
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(compromissoController.delete).toHaveBeenCalled();
          expect(res.body).toEqual({ error: 'Erro no servidor' });
          done();
        });
    });
  });
}); 