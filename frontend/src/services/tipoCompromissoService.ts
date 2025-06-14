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
  }
}; 