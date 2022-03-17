import supertest from 'supertest';
import app from '@/app';

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = supertest(app);
});

describe('GET /api/ping/', () => {
  test('get ping', async () => {
    const response = await request.get('/api/ping');
    expect(response.status).toBe(200);
  });
});
