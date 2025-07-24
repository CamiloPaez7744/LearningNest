import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}
  populateDatabase() {
    this.carsService.fillWithSeedData(CARS_SEED);
    this.brandsService.fillWithSeedData(BRANDS_SEED);
    return { cars: CARS_SEED, brands: BRANDS_SEED };
  }
}
