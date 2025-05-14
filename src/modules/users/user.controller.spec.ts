import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UsersService;
  let idTesting: number;
  const testing = {
    name: 'Testing',
    email: 'only4Test2@testing.com',
    password: 'passwordTesting'
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
      exports: [UsersService]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await service.deleteTestingUser([testing.email]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be successfully create user', async () => {
    const result = await controller.create(testing);
    console.log(result);
    if (result.success) {
      idTesting = Number(result.data.id);
    }
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
  });

  it('should be successfully get all users', async () => {
    const paginate = {
      page: 1,
      limit: 5
    };
    const result = await controller.findAll(paginate);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
  });

  it('should be successfully get testing user', async () => {
    const result = await controller.findOne(idTesting);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
  });

  it('should be successfully update user', async () => {
    const dto = {
      name: `${testing.name} change name`
    };
    const result = await controller.update(idTesting, dto);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
  });

  it('should be successfully delete user', async () => {
    const result = await controller.remove(idTesting);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
  });
});
