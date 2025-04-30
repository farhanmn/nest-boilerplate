import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategies';

describe('AuthController', () => {
  let controller: AuthController;
  let userService: UsersService;
  const testing = {
    name: 'Testing',
    email: 'email4Testing4@testing.com',
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

    controller = module.get<AuthController>(AuthController);
    userService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await userService.deleteTestingUser([testing.email]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be successfully signUp user', async () => {
    const result = await controller.register(testing);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('id');
    expect(result.data).toHaveProperty('email');
    expect(result.data).toHaveProperty('name');
  });

  it('should be successfully signIn user', async () => {
    const result = await controller.login(testing);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('id');
    expect(result.data).toHaveProperty('email');
    expect(result.data).toHaveProperty('name');
    expect(result.data).toHaveProperty('token');
  });
});
