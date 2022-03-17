import supertest from 'supertest';
import app from '@/app';
import { userCreate } from '@/services/user_service';
import { User } from '@prisma/client';

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = supertest(app);
});

describe('POST /api/posts/', () => {
  let user: User;
  const email = 'test@example.com';
  const password = 'password';
  beforeEach(async () => {
    user = await userCreate('test', email, password);
  });

  test('create post', async () => {
    const response = await request.post('/api/posts').set('Authorization', `Bearer ${user.sessionToken}`);
    expect(response.status).toBe(200);
  });
});
