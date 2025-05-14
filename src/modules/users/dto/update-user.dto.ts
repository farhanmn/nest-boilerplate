import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ example: 'name' })
  name?: string;

  @IsOptional()
  @ApiProperty({ example: 'password' })
  password?: string;
}
