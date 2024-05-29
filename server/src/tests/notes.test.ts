import { after } from "node:test";
import { appTesting } from "src/Testsetup.js";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwicGFzc0hhc2hlZCI6InRlc3RwYXNzd29yZCIsImlkIjo4LCJpYXQiOjE3MTcwMTYzMTl9.fUQHLqUzD0KB3gKKyDXwA9_bGhbWa8MEq4F7HzQbCEc"
describe('Note Routes', () => {
    it('should not create a duplicate note title', async () => {
      const response = await appTesting
        .post('/note')
        .set('Authorization', 'Bearer ' + token)
        .send({ title: 'My New Note', body: 'This is the content of my note.' });
  
      expect(response.status).toBe(409);
      expect(response.body.message).toBe('This username has Send the same Title.');
    });
  
    it('should update an existing note', async () => {
      const response = await appTesting
        .put('/note/2') // Replace with the actual note ID
        .set('Authorization', 'Bearer ' + token)
        .send({ title: 'Updated Note', body: 'Updated content.' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Succesfull');
    });
  
    it('should delete a Testednote', async () => {
       await appTesting
        .post('/note')
        .set('Authorization', 'Bearer ' + token)
        .send({ title: 'My Deleted Note', body: 'This is the content of my note.' });
      const response = await appTesting.delete('/note/My Deleted Note') // Replace with the actual note ID
        .set('Authorization', 'Bearer ' + token);
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Succesfull');
    });
  });

describe('GET Single Note', () => {
    it('should retrieve a single note by ID', async () => {
      const response = await appTesting.get(`/note/My New Note`) // Replace with your actual route path
        .set('Authorization', 'Bearer ' + token)
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Succesfull');
      expect(Array.isArray(response.body.data)).toBe(true); // Ensure data is an array (single note)
    });
  });

describe('GET All Notes', () => {
  it('should retrieve all notes for a user', async () => {
    const response = await appTesting.get('/note')
        .set('Authorization', 'Bearer ' + token)

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Succesfull');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});