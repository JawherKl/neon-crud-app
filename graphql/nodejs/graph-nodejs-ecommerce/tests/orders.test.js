const request = require('supertest');
const app = require('../src/app');
const { connect, close } = require('../testDatabase');
//const { connect, close, clear } = require('../testDatabase');

beforeAll(async () => await connect());
afterAll(async () => await close());
//afterEach(async () => await clear());

describe('Order APIs', () => {
  it('should create an order', async () => {
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
  
    const mutationProduct = `
     mutation {
          createProduct(name: "Tests Product", description: "test product description", price: 200) {  
            id
          }
        }
    `;
    
    const responseProduct = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: mutationProduct });
    
    const productId = responseProduct.body.data.createProduct.id;
    expect(productId).toBeDefined();
    
    const mutationOrder = `
     mutation {
          createOrder(products: [{ productId: "${productId}", quantity: 1 }], totalAmount: 200) {
            id
            totalAmount
            products {
              quantity
            }
          }
        }
    `;
    
    
    const responseOrder = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: mutationOrder });
    
    
    expect(responseOrder.status).toBe(200);
    expect(responseOrder.body.data.createOrder).toBeDefined();
    expect(responseOrder.body.data.createOrder.totalAmount).toBe(200);
  });
});
