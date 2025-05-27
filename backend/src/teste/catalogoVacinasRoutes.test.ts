import request from 'supertest';
import express from 'express';
import catalogoVacinasRoutes from '../routes/catalogoVacinasRoutes';
import catalogoVacinasController from '../controllers/catalogoVacinasController';

// Mock do controller
jest.mock('../controllers/catalogoVacinasController', () => ({
  create: jest.fn((req, res) => res.status(201).json({ message: 'Vacina criada' })),
  findAll: jest.fn((req, res) => res.status(200).json({ message: 'Lista de vacinas' })),
  findById: jest.fn((req, res) => res.status(200).json({ message: 'Vacina encontrada' })),
  update: jest.fn((req, res) => res.status(200).json({ message: 'Vacina atualizada' })),
  delete: jest.fn((req, res) => res.status(200).json({ message: 'Vacina deletada' }))
}));

describe('CatalogoVacinasRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(catalogoVacinasRoutes);
    jest.clearAllMocks();
  });

  describe('POST /catalogo', () => {
    it('deve criar uma nova vacina', async () => {
      const response = await request(app)
        .post('/catalogo')
        .send({
          nome_vacina: 'Vacina Teste',
          fabricante: 'Fabricante Teste'
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Vacina criada' });
      expect(catalogoVacinasController.create).toHaveBeenCalled();
    });
  });

  describe('GET /catalogo', () => {
    it('deve retornar todas as vacinas', async () => {
      const response = await request(app)
        .get('/catalogo');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Lista de vacinas' });
      expect(catalogoVacinasController.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /catalogo/:ID_catalogo', () => {
    it('deve retornar uma vacina específica', async () => {
      const response = await request(app)
        .get('/catalogo/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Vacina encontrada' });
      expect(catalogoVacinasController.findById).toHaveBeenCalled();
    });
  });

  describe('PUT /catalogo/:ID_catalogo', () => {
    it('deve atualizar uma vacina', async () => {
      const response = await request(app)
        .put('/catalogo/1')
        .send({
          nome_vacina: 'Vacina Teste Atualizada',
          fabricante: 'Fabricante Teste Atualizado'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Vacina atualizada' });
      expect(catalogoVacinasController.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /catalogo/:ID_catalogo', () => {
    it('deve deletar uma vacina', async () => {
      const response = await request(app)
        .delete('/catalogo/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Vacina deletada' });
      expect(catalogoVacinasController.delete).toHaveBeenCalled();
    });
  });
}); 