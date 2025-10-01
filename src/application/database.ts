import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'event',
      level: 'error'
    },
    {
      emit: 'event',
      level: 'info'
    },
    {
      emit: 'event',
      level: 'warn'
    }
  ]
});

prismaClient.$on('error', (e) => {
  logger.error(e.message);
});

prismaClient.$on('warn', (e) => {
  logger.warn(e.message);
});

prismaClient.$on('info', (e) => {
  logger.info(e.message);
});

prismaClient.$on('query', (e) => {
  logger.info(e.query);
});

export { prismaClient };
