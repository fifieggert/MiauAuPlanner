import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    nome: string;
    telefone: string;
    cpf: string;
    email: string;
    senha: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      const userData = {
        id: response.usuario.ID_usuario,
        name: response.usuario.nome,
        email: response.usuario.email
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Falha na autenticação');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = async (userData: {
    nome: string;
    telefone: string;
    cpf: string;
    email: string;
    senha: string;
  }) => {
    try {
      await authService.register(userData);
      // Após o registro, fazer login automaticamente
      await login(userData.email, userData.senha);
    } catch (error) {
      throw new Error('Falha no registro');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 