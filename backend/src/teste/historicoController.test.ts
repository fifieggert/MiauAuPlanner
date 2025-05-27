import { Request, Response } from 'express';
import HistoricoController from '../controllers/hitoricoController';
import HistoricoRepositorie from '../repositories/historicoRepositories';

// Mock das dependências
jest.mock('../repositories/historicoRepositories');

describe('HistoricoController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };
    responseObject = {};
  });

  describe('create', () => {
    it('deve criar um histórico com sucesso', (done) => {
      const mockHistorico = {
        data_historico: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Consulta de rotina'
      };

      mockRequest.body = mockHistorico;
      (HistoricoRepositorie.create as jest.Mock).mockImplementation((data_historico, ID_animal, observacoes, callback) => {
        callback(null, { insertId: 1 });
      });

      HistoricoController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(responseObject.message).toBe('Historico criado com sucesso');
        done();
      }, 0);
    });

    it('deve retornar erro ao falhar na criação', (done) => {
      const mockHistorico = {
        data_historico: '2024-03-20',
        ID_animal: 1,
        observacoes: 'Consulta de rotina'
      };

      mockRequest.body = mockHistorico;
      (HistoricoRepositorie.create as jest.Mock).mockImplementation((data_historico, ID_animal, observacoes, callback) => {
        callback(new Error('Erro no servidor'), null);
      });

      HistoricoController.create(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseObject.error).toBe('Erro no servidor');
        done();
      }, 0);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os históricos', (done) => {
      const mockHistoricos = [
        { id: 1, data_historico: '2024-03-20', ID_animal: 1, observacoes: 'Consulta de rotina' },
        { id: 2, data_historico: '2024-03-21', ID_animal: 2, observacoes: 'Vacinação' }
      ];

      (HistoricoRepositorie.findAll as jest.Mock).mockImplementation((callback) => {
        callback(null, mockHistoricos);
      });

      HistoricoController.findAll(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockHistoricos);
        done();
      }, 0);
    });
  });

  describe('findById', () => {
    it('deve retornar um histórico específico', (done) => {
      const mockHistorico = { id: 1, data_historico: '2024-03-20', ID_animal: 1, observacoes: 'Consulta de rotina' };
      mockRequest.params = { ID_historico: '1' };

      (HistoricoRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, mockHistorico);
      });

      HistoricoController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual(mockHistorico);
        done();
      }, 0);
    });

    it('deve retornar 404 quando histórico não encontrado', (done) => {
      mockRequest.params = { ID_historico: '999' };

      (HistoricoRepositorie.findById as jest.Mock).mockImplementation((id, callback) => {
        callback(null, null);
      });

      HistoricoController.findById(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseObject.error).toBe('Historico não encontrado');
        done();
      }, 0);
    });
  });

  describe('update', () => {
    it('deve atualizar um histórico com sucesso', (done) => {
      const mockUpdate = {
        data_historico: '2024-03-25',
        observacoes: 'Consulta de emergência'
      };

      mockRequest.params = { ID_historico: '1' };
      mockRequest.body = mockUpdate;

      (HistoricoRepositorie.update as jest.Mock).mockImplementation((id, data_historico, observacoes, callback) => {
        callback(null, { affectedRows: 1 });
      });

      HistoricoController.update(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject.message).toBe('Vacina atualizado com sucesso');
        done();
      }, 0);
    });
  });

  describe('delete', () => {
    it('deve deletar um histórico com sucesso', (done) => {
      mockRequest.params = { ID_historico: '1' };

      (HistoricoRepositorie.delete as jest.Mock).mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      HistoricoController.delete(mockRequest as Request, mockResponse as Response);

      setTimeout(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject.message).toBe('Historico deletado com sucesso');
        done();
      }, 0);
    });
  });
}); 