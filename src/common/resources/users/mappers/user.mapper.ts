import { User as PrismaUser } from '@prisma/client';
import { User } from '../entities/user.entity';

export function toUser(user: PrismaUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

export function toUserList(users: PrismaUser[]): User[] {
  return users.map(toUser);
}
