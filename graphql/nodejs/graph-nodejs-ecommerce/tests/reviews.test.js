const request = require('supertest');
const app = require('../src/app');
//const { connect, close, clear } = require('../testDatabase');
const { connect, close } = require('../testDatabase');

beforeAll(async () => await connect());
afterAll(async () => await close());
//afterEach(async () => await clear());

describe('Review APIs', () => {
  it('should add a review to a product', async () => {
    const product = await request(app).post('/graphql').send({
      query: `
        mutation {
          createProduct(name: "Test Product", price: 200) {
            id
          }
        }
      `,
    });

    const productId = product.body.data.createProduct.id;

    const response = await request(app).post('/graphql').send({
      query: `
        mutation {
          createReview(productId: "${productId}", rating: 5, comment: "Excellent!") {
            id
            rating
            comment
          }
        }
      `,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.createReview).toBeDefined();
    expect(response.body.data.createReview.comment).toBe('Excellent!');
  });
});
