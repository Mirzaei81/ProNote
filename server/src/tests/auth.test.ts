import { appTesting } from "src/setup";

describe('Testing /login endpoint', () => {
  test('Should return 401 for invalid email', async () => {
    const response = await appTesting
      .post('/login')
      .send({ email: 'invalid_email', password: 'test' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 401 for invalid password', async () => {
    const response = await appTesting
      .post('/login')
      .send({ email: 'user@example.com', password: 'invalid_password' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 200 for valid credentials', async () => {
    const response = await appTesting
      .post('/login')
      .send({ email: 'user@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});
