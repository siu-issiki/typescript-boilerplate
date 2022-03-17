import { generateSessionToken } from '@/libs/generate_session_token';
import { PrismaClient, User } from '@prisma/client';
import { generatePasswordHash, validatePassword } from '../libs/generate_password_hash';
const prisma = new PrismaClient();

export const userCreate = async (name: string, email: string, rawPassword: string): Promise<User> => {
  const { passwordHash, passwordSalt } = generatePasswordHash(rawPassword);
  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      passwordSalt,
      sessionToken: await generateSessionToken(),
    },
  });
};

export const userLogin = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user && validatePassword(password, user.passwordSalt, user.passwordHash)) {
    const tokenUpdatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        sessionToken: await generateSessionToken(),
      },
    });
    return tokenUpdatedUser;
  } else {
    throw new AuthenticationError();
  }
};

export class AuthenticationError extends Error {
  name = 'AuthenticationError';
  message = '認証情報が正しくありません';
}
