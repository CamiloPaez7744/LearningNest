import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private readonly cars: {
    id: number;
    make: string;
    model: string;
    year: number;
  }[] = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2021,
    },
    {
      id: 3,
      make: 'Ford',
      model: 'Focus',
      year: 2019,
    },
  ];

  getAllCars() {
    return this.cars;
  }

  getCarById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }
}
