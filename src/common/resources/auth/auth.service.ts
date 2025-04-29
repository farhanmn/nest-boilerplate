import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { verifyPassword } from '../../../utils/user';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User as UserWithPass,
  UserData
} from '../../models/user';
import { User } from '../users/entities/user.entity';
import { hash } from '../../../utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(request: RegisterRequest): Promise<User> {
    const user = await this.usersService.findEmail(request.email);

    if (user) {
      throw new Error('Email already exists');
    }

    const hashPassword = hash(request.password);
    const newUser = {
      ...request,
      password: hashPassword.pwd,
      salt: hashPassword.salt
    };

    return await this.usersService.create(newUser);
  }

  async signIn(request: LoginRequest): Promise<LoginResponse> {
    const user: UserWithPass | null = await this.usersService.findEmail(
      request.email
    );

    if (!user) {
      throw new Error('Invalid email');
    }

    const verifyPass: UserData | null = verifyPassword(user, {
      email: request.email,
      password: request.password
    });

    if (!verifyPass) {
      throw new UnauthorizedException();
    }

    const token: string = this.jwtService.sign(verifyPass);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }
}
