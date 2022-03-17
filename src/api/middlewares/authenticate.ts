import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.headers.authorization?.match(/Bearer\s(.*)/)[1] as string;
  const user = await prisma.user.findFirst({
    where: {
      sessionToken,
    },
  });

  res.locals.user = user;
  return next();
};
