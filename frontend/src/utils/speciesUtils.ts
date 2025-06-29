import { ESPECIES_FIXAS } from '../constants/especies';

export interface Species {
  ID_especie: number;
  especie: string;
}

/**
 * Get all species as Species interface
 */
export const getAllSpecies = (): Species[] => {
  return ESPECIES_FIXAS.map(especie => ({
    ID_especie: especie.id,
    especie: especie.nome
  }));
};

/**
 * Get species by ID
 */
export const getSpeciesById = (id: number): Species | undefined => {
  const especie = ESPECIES_FIXAS.find(e => e.id === id);
  if (!especie) return undefined;
  
  return {
    ID_especie: especie.id,
    especie: especie.nome
  };
};

/**
 * Get species name by ID
 */
export const getSpeciesName = (id: number): string => {
  const especie = ESPECIES_FIXAS.find(e => e.id === id);
  return especie ? especie.nome : 'Espécie não encontrada';
};

/**
 * Check if species exists
 */
export const speciesExists = (id: number): boolean => {
  return ESPECIES_FIXAS.some(e => e.id === id);
}; 