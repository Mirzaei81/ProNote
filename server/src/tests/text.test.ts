import { appTesting } from "src/setup";

describe('Testing /text endpoint', () => {
  test('Should return 400 for missing title', async () => {
    const response = await appTesting
      .post('/text')
      .send({ tags: 'test' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 400 for missing tags', async () => {
    const response = await appTesting
      .post('/text')
      .send({ title: 'test' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 201 for valid title and tags', async () => {
    const response = await appTesting
      .post('/text')
      .send({ title: 'test', tags: 'test' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
  });
});
