import request from 'supertest';
import express from 'express';
import alergiaRoutes from '../routes/alergiaRoutes';
import alergiaController from '../controllers/alergiaController';

// Mock do controller
jest.mock('../controllers/alergiaController', () => ({
  create: jest.fn((req, res) => res.status(201).json({ message: 'Alergia criada' })),
  findAll: jest.fn((req, res) => res.status(200).json({ message: 'Lista de alergias' })),
  findById: jest.fn((req, res) => res.status(200).json({ message: 'Alergia encontrada' })),
  update: jest.fn((req, res) => res.status(200).json({ message: 'Alergia atualizada' })),
  delete: jest.fn((req, res) => res.status(200).json({ message: 'Alergia deletada' }))
}));

describe('AlergiaRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(alergiaRoutes);
    jest.clearAllMocks();
  });

  describe('POST /alergia', () => {
    it('deve criar uma nova alergia', async () => {
      const response = await request(app)
        .post('/alergia')
        .send({ nome_alergia: 'Teste', ID_animal: 1 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Alergia criada' });
      expect(alergiaController.create).toHaveBeenCalled();
    });
  });

  describe('GET /alergia', () => {
    it('deve retornar todas as alergias', async () => {
      const response = await request(app)
        .get('/alergia');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Lista de alergias' });
      expect(alergiaController.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /alergia/:ID_alergia', () => {
    it('deve retornar uma alergia específica', async () => {
      const response = await request(app)
        .get('/alergia/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Alergia encontrada' });
      expect(alergiaController.findById).toHaveBeenCalled();
    });
  });

  describe('PUT /alergia/:ID_alergia', () => {
    it('deve atualizar uma alergia', async () => {
      const response = await request(app)
        .put('/alergia/1')
        .send({ nome_alergia: 'Teste Atualizado' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Alergia atualizada' });
      expect(alergiaController.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /alergia/:ID_alergia', () => {
    it('deve deletar uma alergia', async () => {
      const response = await request(app)
        .delete('/alergia/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Alergia deletada' });
      expect(alergiaController.delete).toHaveBeenCalled();
    });
  });
}); 