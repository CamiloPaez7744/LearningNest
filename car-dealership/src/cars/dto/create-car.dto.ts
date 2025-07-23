/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @IsString()
  @MinLength(2)
  readonly brand: string;

  @IsString()
  @MinLength(3)
  readonly model: string;

  @Type(() => Number)
  @IsNumber()
  readonly year: number;

  @Type(() => Number)
  @IsNumber()
  readonly price: number;
}
