import api from './api';

interface LoginResponse {
  token: string;
  usuario: {
    ID_usuario: number;
    nome: string;
    email: string;
  };
}

export const authService = {
  async login(email: string, senha: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('api/login', { email, senha });
    return response.data;
  },

  async register(userData: {
    nome: string;
    telefone: string;
    cpf: string;
    email: string;
    senha: string;
  }) {
    const response = await api.post('/usuario', userData);
    return response.data;
  }
}; 