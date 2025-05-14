// src/user/dto/user-pagination.dto.ts
import { IsOptional, IsPositive } from 'class-validator';

export class UserPaginationDto {
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  limit?: number = 10;
}
