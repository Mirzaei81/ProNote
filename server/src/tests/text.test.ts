import { appTesting, TestServer } from "../setup.js"

describe('Testing /note endpoint', () => {
  const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJwYXNzSGFzaGVkIjoicGFzc3dvcmQiLCJpZCI6MTQsImlhdCI6MTcxNjQ1MDE2MX0.uY0veQShleTlbbHWxWe1qj2E-YGLhjOK3pADKNaH3XQ'
  afterAll(async()=>{
    TestServer.unref()
    await TestServer.close
  })
  test('Should return 400 for missing title', async () => {
    const response = await appTesting
      .post('/note')
      .set('Authorization', 'Bearer ' + Token)    
      .send({ tags: 'test',body:"test1"})

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 400 for missing tags', async () => {
    const response = await appTesting
      .post('/note')
      .set('Authorization', 'Bearer ' + Token)    
      .send({ title: 'test' ,body:"tag is Not defeined"})

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 201 for valid title and tags but Duplicated', async () => {
    const response = await appTesting
      .post('/note')
      .set('Authorization', 'Bearer ' + Token)
      .send({ title: 'test', tags: 'test', body: "tesing", id: 14 })

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
  });

  test('Should return 200 for getting all Notes ', async () => {
    const response = await appTesting
      .get('/note/')
      .set('Authorization', 'Bearer ' + Token)    

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.data[0].tags).toBe('test');
    expect(response.body.data[0].user_id).toBe(14);
    
  });
});