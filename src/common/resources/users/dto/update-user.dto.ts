import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends CreateUserDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}
