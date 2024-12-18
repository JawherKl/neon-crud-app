### Project: **E-Commerce GraphQL API**

#### Core Features:
1. **Product Management**:
   - Query: Fetch a list of products with filtering, sorting, and pagination options.
   - Mutation: Add, update, or delete a product.
   - Fields: `id`, `name`, `description`, `price`, `category`, `stock`, `images`.

2. **User Authentication**:
   - Mutation: Register a user, log in, and log out.
   - Query: Fetch the current authenticated user's details.
   - Fields: `id`, `username`, `email`, `token`.

3. **Shopping Cart**:
   - Query: Fetch items in the cart for the authenticated user.
   - Mutation: Add an item to the cart, remove an item, update quantities.
   - Fields: `id`, `productId`, `quantity`, `price`.

4. **Orders**:
   - Query: Fetch a user’s order history.
   - Mutation: Create an order (checkout).
   - Fields: `id`, `products`, `total`, `status`, `createdAt`.

5. **Reviews**:
   - Query: Fetch reviews for a product.
   - Mutation: Add, edit, or delete a review.
   - Fields: `id`, `userId`, `productId`, `rating`, `comment`, `createdAt`.

#### Advanced Features:
1. **Real-Time Updates**:
   - Subscription: Notify users about product stock updates or order status changes.

2. **Dynamic Pricing**:
   - Query: Calculate discounts or special offers dynamically during checkout.

3. **Recommendations**:
   - Query: Fetch product recommendations based on user purchase history.

#### Tech Stack:
- **Node.js**: Backend runtime.
- **Apollo Server**: GraphQL implementation for building the API.
- **MongoDB**: Database for storing products, users, orders, and reviews.
- **JWT**: Authentication and authorization.

#### Folder Structure:
```
graphql-nodejs-ecommerce/
├── src/
│   ├── schema/
│   │   ├── typeDefs.js  # Define GraphQL schema
│   │   └── resolvers.js # Implement resolvers
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── services/
│   │   ├── authService.js
│   │   └── productService.js
│   └── index.js         # Entry point
├── package.json
└── .env
```

### Testing the Application:
Run the following mutations/queries in Apollo Studio or Postman to test:

#### **Register a User**
```graphql
mutation {
  register(name: "Jhon Doe", email: "jhon@example.com", password: "securepassword", role: "admin") {
    user {
      id
      name
      email
      role
    }
    token
  }
}
```

#### **Login a User**
```graphql
mutation {
  login(email: "john@example.com", password: "securepassword") {
    user {
      id
      name
    }
    token
  }
}
```

#### **Create a Product**
Include the token in the header (`Authorization: Bearer <token>`):
```graphql
mutation {
  createProduct(name: "Product A", description: "Description A", price: 19.99) {
    id
    name
    price
  }
}
```
### Command Execution:
`npm install`

`npm run start` or
`npm run dev` or
`npm run test`
