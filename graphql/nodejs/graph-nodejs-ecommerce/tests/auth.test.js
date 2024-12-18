const request = require('supertest');
const app = require('../src/app');
const { connect, close } = require('../testDatabase');

beforeAll(async () => await connect());
afterAll(async () => await close());

describe('Auth APIs', () => {
  it('should register a new user', async () => {
    const mutation = `
      mutation {
        register(name: "Test User", email: "test@test.com", password: "123456", role: "admin") {
          user {
            name
            email
            role
          }
          token
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data.register).toBeDefined();
    expect(response.body.data.register.user.email).toBe('test@test.com');
  });

  it('should login an existing user', async () => {
    const mutation = `
      mutation {
        login(email: "test@test.com", password: "123456") {
          token
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data.login).toBeDefined();
    expect(response.body.data.login.token).toBeDefined();
  });
});
