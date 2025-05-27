import request from 'supertest';
import express from 'express';
import historicoRoutes from '../routes/historicoRoutes';
import historicoController from '../controllers/hitoricoController';

// Mock do controller
jest.mock('../controllers/hitoricoController', () => ({
  create: jest.fn((req, res) => res.status(201).json({ message: 'Histórico criado' })),
  findAll: jest.fn((req, res) => res.status(200).json({ message: 'Lista de históricos' })),
  findById: jest.fn((req, res) => res.status(200).json({ message: 'Histórico encontrado' })),
  update: jest.fn((req, res) => res.status(200).json({ message: 'Histórico atualizado' })),
  delete: jest.fn((req, res) => res.status(200).json({ message: 'Histórico deletado' }))
}));

describe('HistoricoRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(historicoRoutes);
    jest.clearAllMocks();
  });

  describe('POST /historico', () => {
    it('deve criar um novo histórico', async () => {
      const response = await request(app)
        .post('/historico')
        .send({
          data_historico: '2024-03-20',
          ID_animal: 1,
          observacoes: 'Consulta de rotina'
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Histórico criado' });
      expect(historicoController.create).toHaveBeenCalled();
    });
  });

  describe('GET /historico', () => {
    it('deve retornar todos os históricos', async () => {
      const response = await request(app)
        .get('/historico');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Lista de históricos' });
      expect(historicoController.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /historico/:ID_historico', () => {
    it('deve retornar um histórico específico', async () => {
      const response = await request(app)
        .get('/historico/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Histórico encontrado' });
      expect(historicoController.findById).toHaveBeenCalled();
    });
  });

  describe('PUT /historico/:ID_historico', () => {
    it('deve atualizar um histórico', async () => {
      const response = await request(app)
        .put('/historico/1')
        .send({
          data_historico: '2024-03-21',
          observacoes: 'Consulta de emergência'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Histórico atualizado' });
      expect(historicoController.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /historico/:ID_historico', () => {
    it('deve deletar um histórico', async () => {
      const response = await request(app)
        .delete('/historico/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Histórico deletado' });
      expect(historicoController.delete).toHaveBeenCalled();
    });
  });
}); 