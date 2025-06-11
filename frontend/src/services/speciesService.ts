import api from './api';

export interface Species {
  ID_especie: number;
  especie: string;
}

export const speciesService = {
  getAll: async (): Promise<Species[]> => {
    const response = await api.get('/especie');
    return response.data;
  },

  getById: async (id: number): Promise<Species> => {
    const response = await api.get(`/especie/${id}`);
    return response.data;
  },

  create: async (species: Omit<Species, 'ID_especie'>): Promise<Species> => {
    const response = await api.post('/especie', species);
    return response.data;
  },

  update: async (id: number, species: Partial<Species>): Promise<Species> => {
    const response = await api.put(`/especie/${id}`, species);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/especie/${id}`);
  },
}; 