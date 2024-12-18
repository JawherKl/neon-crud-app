const request = require('supertest');
const app = require('../src/app');
//const { connect, close, clear } = require('../testDatabase');
const { connect, close } = require('../testDatabase');

beforeAll(async () => await connect());
afterAll(async () => await close());
//afterEach(async () => await clear());

describe('Review APIs', () => {
  it('should add a review to a product', async () => {
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
          createProduct(name: "Tests Product A", description: "test product description", price: 200) {  
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

    const mutationReview = `
      mutation {
          createReview(productId: "${productId}", rating: 5, comment: "Excellent!") {
            id
            rating
            comment
          }
        }
      `;
    
    const responseReview = await request(app)
    .post('/graphql')
    .set('Authorization', `Bearer ${token}`)
    .send({ query: mutationReview });

    expect(responseReview.status).toBe(200);
    expect(responseReview.body.data.createReview).toBeDefined();
    expect(responseReview.body.data.createReview.comment).toBe('Excellent!');
  });
});
