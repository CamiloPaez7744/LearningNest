import { IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(4)
  name: string;
}
