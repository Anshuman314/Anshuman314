// tests/userController.test.js

const request = require('supertest');
const app = require('../app');

describe('User API Tests', () => {
  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject(userData);
  });

  it('should get a user by id', async () => {
    const newUser = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' });

    const res = await request(app).get(`/users/${newUser.body.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Alice');
  });

  it('should update a user by id', async () => {
    const newUser = await request(app)
      .post('/users')
      .send({ name: 'Bob', email: 'bob@example.com' });

    const res = await request(app)
      .put(`/users/${newUser.body.id}`)
      .send({ name: 'Updated Bob' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated Bob');
  });

  it('should delete a user by id', async () => {
    const newUser = await request(app)
      .post('/users')
      .send({ name: 'Jane', email: 'jane@example.com' });

    const res = await request(app).delete(`/users/${newUser.body.id}`);
    expect(res.statusCode).toEqual(204);

    const getUser = await request(app).get(`/users/${newUser.body.id}`);
    expect(getUser.statusCode).toEqual(404);
  });
});
