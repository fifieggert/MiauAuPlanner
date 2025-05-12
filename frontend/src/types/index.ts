export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Pet {
  id: string;
  name: string;
  age: number;
  species: string;
  breed?: string;
  weight?: number;
  height?: number;
  observations?: string;
  ownerId: string;
}

export interface Care {
  id: string;
  petId: string;
  type: string;
  date: Date;
  description: string;
  observations?: string;
}

export interface Reminder {
  id: string;
  petId: string;
  type: string;
  date: Date;
  description: string;
  completed: boolean;
} 