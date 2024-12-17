const request = require('supertest');
const app = require('../src/app');
const { connect, close } = require('../testDatabase');
const Product = require('../src/models/Product');

beforeAll(async () => await connect());
afterAll(async () => await close());

describe('Product APIs', () => {
  it('should create a new product', async () => {
    const mutation = `
      mutation {
        login(email: "test@test.com", password: "123456") {
          token
        }
      }
    `;
    
    const response1 = await request(app)
      .post('/graphql')
      .send({ query: mutation });
    
    console.log('GraphQL response:', response1.body);
    const token = response1.body.data.login.token;
    
    const mutationProduct = `
     mutation {
        createProduct(name: "Test Product", description: "A sample product", price: 100) {
          name
          description
          price
        }
      }
    `;
    
    const response = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: mutationProduct });

    expect(response.status).toBe(200);
    expect(response.body.data.createProduct).toBeDefined();
    expect(response.body.data.createProduct.name).toBe('Test Product');
    expect(response.body.data.createProduct.price).toBe(100);
  });

  it('should fetch all products', async () => {
    await Product.create({ name: 'Test Product 1', price: 50 });
    await Product.create({ name: 'Test Product 2', price: 150 });

    const response = await request(app).post('/graphql').send({
      query: `
        query {
          getProducts {
            id
            name
            price
          }
        }
      `,
    });

    expect(response.body.data.getProducts).toHaveLength(2);
  });
});
