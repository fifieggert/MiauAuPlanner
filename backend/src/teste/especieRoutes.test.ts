import request from 'supertest';
import express from 'express';
import especieRoutes from '../routes/especieRoutes';
import especieController from '../controllers/especieController';

// Mock do controller
jest.mock('../controllers/especieController', () => ({
  create: jest.fn((req, res) => res.status(201).json({ message: 'Espécie criada' })),
  findAll: jest.fn((req, res) => res.status(200).json({ message: 'Lista de espécies' })),
  findById: jest.fn((req, res) => res.status(200).json({ message: 'Espécie encontrada' })),
  update: jest.fn((req, res) => res.status(200).json({ message: 'Espécie atualizada' })),
  delete: jest.fn((req, res) => res.status(200).json({ message: 'Espécie deletada' }))
}));

describe('EspecieRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(especieRoutes);
    jest.clearAllMocks();
  });

  describe('POST /especie', () => {
    it('deve criar uma nova espécie', async () => {
      const response = await request(app)
        .post('/especie')
        .send({
          especie: 'Cachorro'
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Espécie criada' });
      expect(especieController.create).toHaveBeenCalled();
    });
  });

  describe('GET /especie', () => {
    it('deve retornar todas as espécies', async () => {
      const response = await request(app)
        .get('/especie');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Lista de espécies' });
      expect(especieController.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /especie/:ID_especie', () => {
    it('deve retornar uma espécie específica', async () => {
      const response = await request(app)
        .get('/especie/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Espécie encontrada' });
      expect(especieController.findById).toHaveBeenCalled();
    });
  });

  describe('PUT /especie/:ID_especie', () => {
    it('deve atualizar uma espécie', async () => {
      const response = await request(app)
        .put('/especie/1')
        .send({
          especie: 'Cachorro Atualizado'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Espécie atualizada' });
      expect(especieController.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /especie/:ID_especie', () => {
    it('deve deletar uma espécie', async () => {
      const response = await request(app)
        .delete('/especie/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Espécie deletada' });
      expect(especieController.delete).toHaveBeenCalled();
    });
  });
}); 