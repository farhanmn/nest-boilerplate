import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategies/jwt.strategies';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  const testing = {
    name: 'Testing',
    email: 'email4Testing3@testing.com',
    password: 'passwordTesting'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' }
        })
      ],
      providers: [UsersService, AuthService, JwtStrategy],
      controllers: [AuthController],
      exports: [JwtModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await userService.deleteTestingUser([testing.email]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully signUp user', async () => {
    const result = await service.signUp(testing);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('name');
  });

  it('should successfully signIn user', async () => {
    const login = {
      email: testing.email,
      password: testing.password
    };
    const result = await service.signIn(login);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('token');
  });
});
