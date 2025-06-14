import api from './api';

export interface Compromisso {
  ID_compromissos?: number;
  data_compromissos: string;
  horario_compromissos: string;
  ID_animal: number;
  ID_tipo: number;
  observacoes: string;
}

export const compromissoService = {
  getAll: async (): Promise<Compromisso[]> => {
    const response = await api.get('/compromisso');
    return response.data;
  },

  create: async (compromisso: Omit<Compromisso, 'ID_compromissos'>): Promise<Compromisso> => {
    const response = await api.post('/compromisso', compromisso);
    return response.data;
  },

  update: async (id: number, compromisso: Partial<Compromisso>): Promise<Compromisso> => {
    const response = await api.put(`/compromisso/${id}`, compromisso);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/compromisso/${id}`);
  }
}; 