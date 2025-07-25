import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @IsInt()
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  @IsInt()
  offset?: number;
}
