import { User as PrismaUser } from '@prisma/client';

export function toUser(user: PrismaUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

export function toUserList(users: PrismaUser[]) {
  return users.map(toUser);
}
