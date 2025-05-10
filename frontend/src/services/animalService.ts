import api from './api';

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  gender: string;
  observations?: string;
}

// Map species to id_especie
const speciesToIdMap: Record<string, number> = {
  'dog': 1, // Cachorro
  'cat': 2, // Gato
  'bird': 3, // Pássaro
  'other': 4, // Outro
};

export const animalService = {
  getAll: async () => {
    const response = await api.get('/animal');
    return response.data;
  },

  create: async (pet: Omit<Pet, 'id'>) => {
    const response = await api.post('/animal', {
      nome: pet.name,
      raca: pet.breed,
      idade: pet.age,
      genero: pet.gender,
      peso: pet.weight,
      id_usuario: 1, // TODO: Get from auth context
      id_especie: speciesToIdMap[pet.species] || 4, // Default to 'other' if species not found
    });
    return response.data;
  },

  update: async (id: string, pet: Omit<Pet, 'id'>) => {
    const response = await api.put(`/animal/${id}`, {
      nome: pet.name,
      raca: pet.breed,
      idade: pet.age,
      genero: pet.gender,
      peso: pet.weight,
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/animal/${id}`);
    return response.data;
  },
}; 