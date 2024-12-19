const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { expect } = require('chai');

const orderProtoPath = path.resolve(__dirname, '../../proto/order.proto');
const orderProto = grpc.loadPackageDefinition(protoLoader.loadSync(orderProtoPath)).order;

describe('Order Service', () => {
  const client = new orderProto.OrderService('127.0.0.1:50051', grpc.credentials.createInsecure());

  it('should create an order successfully', (done) => {
    client.CreateOrder({ customer_id: '123', items: ['item1', 'item2'] }, (err, response) => {
      expect(err).to.be.null;
      expect(response).to.have.property('order_id');
      expect(response.status).to.equal('Pending');
      done();
    });
  });

  it('should retrieve order status', (done) => {
    const orderId = 'order-123';
    client.GetOrderStatus({ order_id: orderId }, (err, response) => {
      if (err) return done(err);
      expect(response).to.have.property('order_id', orderId);
      done();
    });
  });
});
