const grpc = require('@grpc/grpc-js'); // Modern library
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { default: wrapServerWithReflection } = require('grpc-node-server-reflection');

// Load .proto file
const PROTO_PATH = path.join(__dirname, '../proto/payment.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const paymentProto = grpc.loadPackageDefinition(packageDefinition).payment;

// Service implementation
const processPayment = (call, callback) => {
  const { order_id, amount } = call.request;

  if (!order_id || amount <= 0) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Invalid payment amount or order_id.",
    });
  }

  console.log(`Processing payment for order_id: ${order_id}, amount: $${amount}`);
  callback(null, {
    success: true,
    message: 'Payment processed successfully',
  });
};

// Create and start the gRPC server
const server = wrapServerWithReflection(new grpc.Server());

// Add services
server.addService(paymentProto.PaymentService.service, { ProcessPayment: processPayment });

// Start the server
const PORT = 50054;
server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error("Failed to start server:", err);
    return;
  }
  console.log(`Payment gRPC server running on port ${port}`);
  server.start();
});
