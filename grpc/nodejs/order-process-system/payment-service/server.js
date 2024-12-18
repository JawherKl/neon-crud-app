const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load .proto files
const paymentProtoPath = path.resolve(__dirname, '../proto/payment.proto');
const paymentProto = grpc.loadPackageDefinition(protoLoader.loadSync(paymentProtoPath)).payment;

const processPayment = (call, callback) => {
  if (call.request.amount > 0) {
    callback(null, { success: true, message: 'Payment processed successfully' });
  } else {
    callback({ code: grpc.status.INVALID_ARGUMENT, details: "Invalid payment amount" });
  }
};

// Start the server
const server = new grpc.Server();
server.addService(paymentProto.PaymentService.service, { ProcessPayment: processPayment });
server.bindAsync('127.0.0.1:50053', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Payment Service running at 127.0.0.1:50053');
  server.start();
});
