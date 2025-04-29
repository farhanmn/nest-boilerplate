import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @IsEmail()
  @ApiProperty({ example: 'mail@mail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password: string;
}
