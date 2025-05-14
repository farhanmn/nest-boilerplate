import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserController } from './user.controller';

describe('UsersService', () => {
  let service: UsersService;
  let idTesting: number;
  const testing = {
    name: 'Testing',
    email: 'only4Test1@testing.com',
    password: 'passwordTesting'
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
      exports: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await service.deleteTestingUser([testing.email]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be successfully create user', async () => {
    const result = await service.create(testing);
    idTesting = result.id;
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(testing.name);
    expect(result.email).toBe(testing.email);
  });

  it('should be successfully get all users', async () => {
    const testingUser = {
      id: expect.any(Number) as number,
      name: testing.name,
      email: testing.email
    };
    const paginate = {
      page: 1,
      limit: 5
    };
    const result = await service.findAll({
      paginationDto: paginate
    });
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('meta');
    expect(result.data).toEqual(
      expect.arrayContaining([expect.objectContaining(testingUser)])
    );
  });

  it('should be get testing users', async () => {
    const result = await service.findOne(idTesting);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
  });

  it('should be successfully update user', async () => {
    const dto = {
      name: 'Testing change name'
    };
    const result = await service.update(idTesting, dto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
  });

  it('should be successfully delete user', async () => {
    const result = await service.remove(idTesting);
    expect(result).toEqual(true);
  });
});
