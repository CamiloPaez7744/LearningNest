import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Title of the product',
    example: 'Nike Air Max',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'A comfortable and stylish pair of running shoes.',
    nullable: true,
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 199.99,
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    description: 'Slug of the product',
    example: 'nike_air_max',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    description: 'Stock of the product',
    example: 10,
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    description: 'Sizes available for the product',
    example: ['S', 'M', 'L'],
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    description: 'Gender for the product',
    example: 'male',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    description: 'Tags associated with the product',
    example: ['shoes', 'nike', 'sports'],
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({ type: () => ProductImage, isArray: true })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlug() {
    if (!this.slug) {
      this.slug = this.title
        .toLowerCase()
        .replaceAll(/ /g, '_')
        .replaceAll(/['"]/g, '');
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(/ /g, '_')
      .replaceAll(/['"]/g, '');
  }

  @BeforeUpdate()
  updateSlug() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(/ /g, '_')
      .replaceAll(/['"]/g, '');
  }
}
