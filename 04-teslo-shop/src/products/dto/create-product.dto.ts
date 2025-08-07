import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Title of the product',
    example: 'Nike Air Max',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'A comfortable and stylish pair of running shoes.',
    nullable: true,
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 199.99,
  })
  @IsPositive()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Slug of the product',
    example: 'nike_air_max',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Stock of the product',
    example: 10,
  })
  @IsInt()
  @IsPositive()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Sizes available for the product',
    example: ['S', 'M', 'L'],
  })
  @IsString({ each: true })
  @IsArray()
  @MinLength(1, { each: true })
  sizes: string[];

  @ApiProperty({
    description: 'Gender for the product',
    example: 'male',
  })
  @IsIn(['male', 'female', 'unisex', 'kid', 'baby'])
  gender: string;

  @ApiProperty({
    description: 'Tags associated with the product',
    example: ['shoes', 'nike', 'sports'],
  })
  @IsString({ each: true })
  @IsArray()
  @MinLength(1, { each: true })
  tags: string[];

  @ApiProperty({
    description: 'Images of the product',
    example: ['image1.jpg', 'image2.jpg'],
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @MinLength(1, { each: true })
  images?: string[];
}
