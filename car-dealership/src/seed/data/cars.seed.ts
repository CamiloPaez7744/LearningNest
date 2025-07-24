import type { Car } from 'src/cars/interfaces/cars.interface';
import { v4 as uuidv4 } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuidv4(),
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    price: 20000,
  },
  {
    id: uuidv4(),
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    price: 18000,
  },
  {
    id: uuidv4(),
    brand: 'Ford',
    model: 'Focus',
    year: 2021,
    price: 22000,
  },
];
