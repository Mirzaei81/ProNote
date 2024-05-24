import { appTesting, TestServer } from "../setup.ts"

describe('Testing /login endpoint', () => {
  afterAll(async () => {
    await TestServer.close()
  })
  test('Should return 401 for invalid email', async () => {

    const response = await appTesting
      .post('/login')
      .send({username: 'invalid_email', password: 'test' })
    
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 401 for invalid password', async () => {
    const response = await appTesting
      .post('/login')
      .send({username: 'user@example.com', password: 'invalid_password' })

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 200 for valid credentials', async () => {
    const response = await appTesting
      .post('/login')
      .send({ username: 'example', password: 'password' })
    console.log(response.body.Token)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});
describe('tesing /register',()=>{
  test('Should return 401 for Duplicate', async () => {
    const response = await appTesting
      .post('/register')
      .send({ email: 'aam.miraei@gmail.com',username:"MthBest", password: '@M1r@rsh1@' })
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
  });
})