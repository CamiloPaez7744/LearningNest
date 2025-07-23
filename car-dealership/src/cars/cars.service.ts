import { Injectable, NotFoundException } from '@nestjs/common';
import type { Car } from './interfaces/cars.interface';
import { v4 as uuidv4 } from 'uuid';
import type { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private readonly cars: Car[] = [
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
      year: 2021,
      price: 22000,
    },
    {
      id: uuidv4(),
      brand: 'Ford',
      model: 'Focus',
      year: 2019,
      price: 18000,
    },
  ];

  getAllCars() {
    return this.cars;
  }

  getCarById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  create(car: CreateCarDto): Car {
    const newCar = { id: uuidv4(), ...car };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, car: Partial<CreateCarDto>): Car {
    const index = this.cars.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    const updatedCar = { ...this.cars[index], ...car };
    this.cars[index] = updatedCar;
    return updatedCar;
  }

  delete(id: string): void {
    const index = this.cars.findIndex((car) => car.id === id);
    if (index === -1) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    this.cars.splice(index, 1);
  }
}
