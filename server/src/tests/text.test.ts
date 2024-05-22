import { appTesting } from "../setup"

describe('Testing /text endpoint', () => {
  test('Should return 400 for missing title', async () => {
    const response = await appTesting
      .post('/text')
      .send({ tags: 'test' ,id:1,body:"test1"});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 400 for missing tags', async () => {
    const response = await appTesting
      .post('/text')
      .send({ title: 'test' ,id:1,body:"tag is Not defeined"});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 201 for valid title and tags', async () => {
    const response = await appTesting
      .post('/text')
      .send({ title: 'test', tags: 'test',body:"tesing",id:1 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});
