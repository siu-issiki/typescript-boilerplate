import { randomBytes, scryptSync } from 'crypto';

export const PASSWORD_HASH_LENGTH = 64;
export const SALT_LENGTH = 16;

export const generatePasswordHash = (password: string): { passwordHash: string; passwordSalt: string } => {
  const passwordSalt = createPasswordSalt();
  const passwordHash = scryptSync(password, passwordSalt, PASSWORD_HASH_LENGTH).toString('hex');
  return {
    passwordHash,
    passwordSalt,
  };
};

export const validatePassword = (password: string, passwordSalt: string, passwordHash: string): boolean => {
  const challengeHash = scryptSync(password, passwordSalt, PASSWORD_HASH_LENGTH).toString('hex');
  return challengeHash === passwordHash;
};

const createPasswordSalt = (): string => randomBytes(SALT_LENGTH).toString('base64');

export const passwordVerify = (challengePassword: string, passwordHash: string, salt: string): boolean => {
  const challengePasswordHash = scryptSync(challengePassword, salt, PASSWORD_HASH_LENGTH).toString('hex');
  return challengePasswordHash === passwordHash;
};
