import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private readonly cars: string[] = ['Toyota', 'Honda', 'Ford'];

  @Get()
  getAllCars() {
    return this.cars;
  }

  @Get('/:id')
  getCarById(@Param('id') id: string) {
    return this.cars[+id] || 'Car not found';
  }
}
