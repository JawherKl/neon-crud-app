const request = require('supertest');
const app = require('../src/app');
const { connect, close } = require('../testDatabase');
//const { connect, close, clear } = require('../testDatabase');

beforeAll(async () => await connect());
afterAll(async () => await close());
//afterEach(async () => await clear());

describe('Order APIs', () => {
  it('should create an order', async () => {
    const mutation = `
     mutation {
          createProduct(name: "Tests Product", description: "test product description", price: 200) {  
            id
          }
        }
    `;
    
    const product = await request(app)
      .post('/graphql')
      .send({ query: mutation });
    
    const productId = product.body.data.createProduct.id;
    
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
    
    
    const response = await request(app)
      .post('/graphql')
      .send({ query: mutationOrder });
    
    
    expect(response.status).toBe(200);
    expect(response.body.data.createOrder).toBeDefined();
    expect(response.body.data.createOrder.totalAmount).toBe(200);
  });
});
