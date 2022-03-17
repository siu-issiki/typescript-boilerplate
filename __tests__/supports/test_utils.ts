import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class TestUtils {
  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }
  }

  async cleanAll() {
    // await prisma.member.deleteMany();
  }
}
