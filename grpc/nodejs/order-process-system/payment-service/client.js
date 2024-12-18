const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load .proto files
const paymentProtoPath = path.resolve(__dirname, '../proto/payment.proto');
const paymentProto = grpc.loadPackageDefinition(protoLoader.loadSync(paymentProtoPath)).payment;

// Create a client
const client = new paymentProto.PaymentService('127.0.0.1:50053', grpc.credentials.createInsecure());

// Test ProcessPayment
client.ProcessPayment({ order_id: 'order-123', amount: 100.0 }, (err, response) => {
  if (err) return console.error('ProcessPayment Error:', err);
  console.log('ProcessPayment Response:', response);
});
