const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load .proto files
const orderProtoPath = path.resolve(__dirname, '../proto/order.proto');
const orderProto = grpc.loadPackageDefinition(protoLoader.loadSync(orderProtoPath)).order;

// Create a client
const client = new orderProto.OrderService('127.0.0.1:50051', grpc.credentials.createInsecure());

// Test CreateOrder
client.CreateOrder({ customer_id: '123', items: ['item1', 'item2'] }, (err, response) => {
  if (err) return console.error('CreateOrder Error:', err);
  console.log('CreateOrder Response:', response);

  // Test GetOrderStatus
  client.GetOrderStatus({ order_id: response.order_id }, (err, statusResponse) => {
    if (err) return console.error('GetOrderStatus Error:', err);
    console.log('GetOrderStatus Response:', statusResponse);
  });
});
