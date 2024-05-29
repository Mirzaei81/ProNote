import {appTesting as app, appTesting} from '../Testsetup.js'; // Replace with the actual path to your Express app

describe('User Routes', () => {
  it('register a duplicated user', async () => {
    const response = await app
      .post('/user/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });

  it('should log in an existing user', async () => {
    const response = await app
      .post('/user/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('Token');
  });

  it('should return an error for non-existing user login', async () => {
    const response = await app
      .post('/user/login')
      .send({
        username: 'nonexistentuser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
});
