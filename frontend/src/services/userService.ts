import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust this to match your backend URL

export interface Usuario {
  ID_usuario?: number;
  nome: string;
  telefone: string;
  cpf: string;
  email: string;
}

export const userService = {
  findAll: async (): Promise<Usuario[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  create: async (user: Omit<Usuario, 'ID_usuario'>): Promise<Usuario> => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  },

  update: async (id: number, user: Omit<Usuario, 'ID_usuario'>): Promise<Usuario> => {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/users/${id}`);
  }
};
