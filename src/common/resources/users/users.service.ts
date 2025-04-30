import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { User as UserWithPass } from '../../models/user';
import { prismaClient } from '../../../application/database';
import { toUser, toUserList } from './mappers/user.mapper';
import { UserPaginationDto } from './dto/user-pagination.dto';
import { metaPagination } from '../../../utils/response';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await prismaClient.user.create({
      data: createUserDto
    });

    return toUser(user);
  }

  async findAll({
    name,
    paginationDto
  }: {
    name?: string;
    paginationDto?: UserPaginationDto;
  }): Promise<{
    data: User[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const page = Number(paginationDto?.page) || 1;
    const limit = Number(paginationDto?.limit) || 10;
    const users = await prismaClient.user.findMany({
      where: {
        ...(name
          ? {
              name: {
                startsWith: `%${name}%`,
                mode: 'insensitive'
              }
            }
          : {})
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        name: 'asc'
      }
    });

    const count = await prismaClient.user.count({
      where: {
        ...(name
          ? {
              name: {
                startsWith: `%${name}%`,
                mode: 'insensitive'
              }
            }
          : {})
      }
    });

    return {
      data: toUserList(users),
      meta: metaPagination(count, page, limit)
    };
  }

  async findOne(id: number): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      return null;
    }

    return toUser(user);
  }

  async findEmail(email: string): Promise<UserWithPass | null> {
    return prismaClient.user.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        salt: true
      }
    });
  }

  async update(id: number, updateUserInput: UpdateUserDto): Promise<User> {
    const user = await prismaClient.user.update({
      data: updateUserInput,
      where: {
        id
      }
    });

    return toUser(user);
  }

  async remove(id: number) {
    const user = await prismaClient.user.delete({
      where: {
        id
      }
    });

    if (!user) {
      return false;
    }

    return true;
  }

  async deleteTestingUser(email: string[]) {
    const user = await prismaClient.user.deleteMany({
      where: {
        email: {
          in: email
        }
      }
    });

    if (!user) {
      return false;
    }

    return true;
  }
}
