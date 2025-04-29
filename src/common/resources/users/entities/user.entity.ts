import { IsEmail, IsNumber, IsString } from 'class-validator';

export class User {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
