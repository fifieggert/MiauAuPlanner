import axios from 'axios';
import { Especie } from '../types/Especie';

const API_URL = 'http://localhost:3000';

export const especiesService = {
  // Get all species
  getAll: async (): Promise<Especie[]> => {
    const response = await axios.get(`${API_URL}/especie`);
    return response.data;
  },

  // Get species by ID
  getById: async (id: number): Promise<Especie> => {
    const response = await axios.get(`${API_URL}/especie/${id}`);
    return response.data;
  },

  // Create new species
  create: async (especie: Omit<Especie, 'id'>): Promise<Especie> => {
    const response = await axios.post(`${API_URL}/especie`, especie);
    return response.data;
  },

  // Update species
  update: async (id: number, especie: Partial<Especie>): Promise<Especie> => {
    const response = await axios.put(`${API_URL}/especie/${id}`, especie);
    return response.data;
  },

  // Delete species
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/especie/${id}`);
  }
};
