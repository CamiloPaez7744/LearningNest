import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.getAllCars();
  }

  @Get('/:id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.getCarById(id);
  }

  @Post()
  createCar(@Body() body: any) {
    // This method would handle car creation logic
    // For now, we can return a placeholder response
    return body;
  }

  @Patch('/:id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    // This method would handle car update logic
    // For now, we can return a placeholder response
    return body;
  }

  @Delete('/:id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    // This method would handle car deletion logic
    // For now, we can return a placeholder response
    return { message: 'Car deletion logic not implemented yet', id };
  }
}
