import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertNewUsers();
    await this.insertNewProducts(adminUser);
    return 'Seed executed successfully';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
    return true;
  }

  private async insertNewUsers() {
    const users = initialData.users.map((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
      return this.userRepository.create(user);
    });
    const dbUsers = await this.userRepository.save(users);
    return dbUsers[0];
  }

  private async insertNewProducts(adminUser: User) {
    await this.productsService.deleteAllProducts();
    const products = initialData.products;
    const insertPromises = products.map((product) =>
      this.productsService.create(product, adminUser),
    );
    await Promise.all(insertPromises);
    return true;
  }
}
