import api from './api';

export interface Pet {
  id: number;
  name: string;
  species: number;
  breed: string;
  age: number;
  weight: number;
  gender: string;
  observations?: string;
}

export const animalService = {
  getAll: async () => {
    const response = await api.get('/animal');
    return response.data.map((pet: any) => ({
      id: pet.ID_animal,
      name: pet.nome,
      species: pet.id_especie,
      breed: pet.raca,
      age: pet.idade,
      weight: pet.peso,
      gender: pet.genero,
      observations: pet.observacoes
    }));
  },

  create: async (pet: Omit<Pet, 'id'>) => {
    const response = await api.post('/animal', {
      nome: pet.name,
      raca: pet.breed,
      idade: pet.age,
      genero: pet.gender,
      peso: pet.weight,
      id_usuario: 1, // TODO: Get from auth context
      id_especie: pet.species,
      observacoes: pet.observations
    });
    return response.data;
  },

  update: async (id: number, pet: Omit<Pet, 'id'>) => {
    const response = await api.put(`/animal/${id}`, {
      nome: pet.name,
      raca: pet.breed,
      idade: pet.age,
      genero: pet.gender,
      peso: pet.weight,
      id_especie: pet.species,
      observacoes: pet.observations
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/animal/${id}`);
    return response.data;
  },
}; 