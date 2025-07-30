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
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  description?: string;

  @IsPositive()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  @MinLength(1, { each: true })
  sizes: string[];

  @IsIn(['male', 'female', 'unisex', 'kid', 'baby'])
  gender: string[];

  @IsString({ each: true })
  @IsArray()
  @MinLength(1, { each: true })
  tags: string[];

  @IsString({ each: true })
  @IsArray()
  @MinLength(1, { each: true })
  images?: string[];
}
