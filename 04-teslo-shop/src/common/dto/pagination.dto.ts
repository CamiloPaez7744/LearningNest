import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Number of items to return',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: 'Number of items to skip',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
