import api from './api';

export interface TipoCompromisso {
  ID_tipo: number;
  nome_tipo: string;
}

export const tipoCompromissoService = {
  getAll: async (): Promise<TipoCompromisso[]> => {
    const response = await api.get('/tipos');
    return response.data;
  },

  getById: async (id: number): Promise<TipoCompromisso> => {
    const response = await api.get(`/tipos/${id}`);
    return response.data;
  },

  create: async (tipo: Omit<TipoCompromisso, 'ID_tipo'>): Promise<TipoCompromisso> => {
    const response = await api.post('/tipos', tipo);
    return response.data;
  },

  update: async (id: number, tipo: Partial<TipoCompromisso>): Promise<TipoCompromisso> => {
    const response = await api.put(`/tipos/${id}`, tipo);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tipos/${id}`);
  }
}; 