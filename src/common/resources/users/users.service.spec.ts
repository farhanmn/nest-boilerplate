import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { KnexModule } from '../../../config/database/knex.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule],
      providers: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
