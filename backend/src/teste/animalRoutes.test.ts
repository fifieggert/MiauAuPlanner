import request from 'supertest';
import express from 'express';
import animalRoutes from '../routes/animalRoutes';
import AnimalController from '../controllers/animalController';

// Mock do controller
jest.mock('../controllers/animalController', () => ({
  create: jest.fn((req, res) => res.status(201).json({ message: 'Animal criado' })),
  findAll: jest.fn((req, res) => res.status(200).json({ message: 'Lista de animais' })),
  findByID: jest.fn((req, res) => res.status(200).json({ message: 'Animal encontrado' })),
  update: jest.fn((req, res) => res.status(200).json({ message: 'Animal atualizado' })),
  delete: jest.fn((req, res) => res.status(200).json({ message: 'Animal deletado' }))
}));

describe('AnimalRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(animalRoutes);
    jest.clearAllMocks();
  });

  describe('POST /animal', () => {
    it('deve criar um novo animal', async () => {
      const response = await request(app)
        .post('/animal')
        .send({
          nome: 'Rex',
          ID_especie: 1,
          ID_usuario: 1,
          data_nascimento: '2020-01-01',
          peso: 10.5,
          sexo: 'M'
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Animal criado' });
      expect(AnimalController.create).toHaveBeenCalled();
    });
  });

  describe('GET /animal', () => {
    it('deve retornar todos os animais', async () => {
      const response = await request(app)
        .get('/animal');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Lista de animais' });
      expect(AnimalController.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /animal/:ID_animal', () => {
    it('deve retornar um animal específico', async () => {
      const response = await request(app)
        .get('/animal/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Animal encontrado' });
      expect(AnimalController.findByID).toHaveBeenCalled();
    });
  });

  describe('PUT /animal/:ID_animal', () => {
    it('deve atualizar um animal', async () => {
      const response = await request(app)
        .put('/animal/1')
        .send({
          nome: 'Rex Atualizado',
          peso: 11.5
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Animal atualizado' });
      expect(AnimalController.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /animal/:ID_animal', () => {
    it('deve deletar um animal', async () => {
      const response = await request(app)
        .delete('/animal/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Animal deletado' });
      expect(AnimalController.delete).toHaveBeenCalled();
    });
  });
}); 