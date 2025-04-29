import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class registerDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'mail@mail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password: string;
}
