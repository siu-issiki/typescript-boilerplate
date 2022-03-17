import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

export const generateSessionToken = async (): Promise<string> => {
  const MAX_RETRY_COUNT = 3;
  let retryCount = 0;
  let sessionToken: string;
  while (retryCount <= MAX_RETRY_COUNT) {
    sessionToken = randomBytes(16).toString('hex');
    const existSessionToken = await prisma.user.findFirst({
      where: {
        sessionToken,
      },
    });
    if (existSessionToken) {
      retryCount++;
      continue;
    } else {
      break;
    }
  }
  if (!sessionToken) throw new Error("Can't create sessionToken");
  return sessionToken;
};
