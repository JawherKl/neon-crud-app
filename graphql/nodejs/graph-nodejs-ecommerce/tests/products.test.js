const request = require('supertest');
const app = require('../src/app');
const { connect, close } = require('../testDatabase');
const Product = require('../src/models/Product');

beforeAll(async () => await connect());
afterAll(async () => await close());

describe('Product APIs', () => {
  it('should create a new product', async () => {
    // Register user
    const mutationRegister = `
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
    const responseRegister = await request(app).post('/graphql').send({ query: mutationRegister });
  
    expect(responseRegister.status).toBe(200);
    const token = responseRegister.body.data.register.token;
    expect(token).toBeDefined();
  
    // Create product
    const mutationProduct = `
      mutation {
        createProduct(name: "Test Product", description: "A sample product", price: 100) {
          name
          price
        }
      }
    `;
    const responseProduct = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: mutationProduct });
  
    expect(responseProduct.status).toBe(200);
    expect(responseProduct.body.data.createProduct).toBeDefined();
  });
  

  it('should fetch all products', async () => {
    await Product.create({ name: 'Test Product 1', price: 50 });
    await Product.create({ name: 'Test Product 2', price: 150 });

    const query = `
      {
        getProducts {
          id
          name
          price
        }
      }
    `;
    const response = await request(app)
      .post('/graphql')
      .send({ query: query });

    expect(response.body.data.getProducts).toHaveLength(3);
  });
});
