const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { default: wrapServerWithReflection } = require('grpc-node-server-reflection');

// Load .proto files
const PROTO_PATH = path.join(__dirname, '../proto/order.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

// Mock data for orders
let orders = {};

// Implement CreateOrder RPC
const createOrder = (call, callback) => {
  const orderId = `order-${Date.now()}`;
  orders[orderId] = {
    customer_id: call.request.customer_id,
    items: call.request.items,
    status: 'Pending',
  };
  callback(null, { order_id: orderId, status: 'Pending' });
};

// Implement GetOrderStatus RPC
const getOrderStatus = (call, callback) => {
  const order = orders[call.request.order_id];
  if (order) {
    callback(null, { order_id: call.request.order_id, status: order.status });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Order not found',
    });
  }
};

// Create a new gRPC server
const server = wrapServerWithReflection(new grpc.Server());

// Add services
server.addService(orderProto.OrderService.service, {
  CreateOrder: createOrder,
  GetOrderStatus: getOrderStatus,
});

// Start the server
const port = '127.0.0.1:50051';
server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Order Service running at ${port}`);
  server.start();
});
