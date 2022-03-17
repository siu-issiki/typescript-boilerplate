import supertest from 'supertest';
import app from '@/app';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = supertest(app);
});

describe('POST /api/users/', () => {
  const email = 'test@example.com';
  const password = 'password';
  test('create user', async () => {
    const response = await request.post('/api/users').send({
      name: 'test',
      email,
      password,
    });
    expect(response.status).toBe(200);
    expect(response.body.sessionToken).not.toBeNull();

    const user = await prisma.user.findFirst({
      where: {
        sessionToken: response.body.sessionToken,
      },
    });
    expect(user.email).toEqual(email);
  });

  test('login user', async () => {
    // create user
    const userCreateResponse = await request.post('/api/users').send({
      name: 'test',
      email,
      password,
    });
    const firstSessionToken = userCreateResponse.body.sessionToken;
    // login user
    const response = await request.post('/api/users/login').send({
      email,
      password,
    });
    expect(response.status).toBe(200);
    expect(response.body.sessionToken).not.toBeNull();
    expect(response.body.sessionToken).not.toEqual(firstSessionToken);

    const user = await prisma.user.findFirst({
      where: {
        sessionToken: response.body.sessionToken,
      },
    });
    expect(user.email).toEqual(email);
  });
});
