const request = require('supertest');
const app = require('../dist/app').default;

describe('MediSmart API smoke tests', () => {
  test('health endpoint is public', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('medicine search is public', async () => {
    const response = await request(app).get('/api/v1/medicines?search=augmentin');
    expect(response.status).toBe(200);
    expect(response.body.data[0].id).toBe('augmentin-625');
  });

  test('registration validates input and issues a token', async () => {
    const email = `test-${Date.now()}@example.com`;
    const response = await request(app).post('/api/v1/auth/register').send({ name: 'Test Patient', email, password: 'Password#2026', role: 'patient' });
    expect(response.status).toBe(201);
    expect(response.body.token).toEqual(expect.any(String));
  });

  test('admin routes reject unauthenticated requests', async () => {
    const response = await request(app).get('/api/v1/admin/audit-logs');
    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('AUTH_REQUIRED');
  });
});
