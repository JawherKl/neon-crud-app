const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { default: wrapServerWithReflection } = require('grpc-node-server-reflection');
const db = require('./models'); // Adjust path if necessary

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
const createOrder = async (call, callback) => {
  const { customer_id, items } = call.request;

  try {
    const newOrder = await db.Order.create({
      id: `order-${Date.now()}`,
      customer_id,
      status: "PENDING",
    });

    callback(null, { order_id: newOrder.id, status: newOrder.status });
  } catch (error) {
    console.error(error);
    callback({ code: grpc.status.INTERNAL, message: "Failed to create order" });
  }
};

// Implement GetOrderStatus RPC
const getOrderStatus = async (call, callback) => {
  const { order_id } = call.request;

  try {
    const order = await db.Order.findByPk(order_id);

    if (order) {
      callback(null, { order_id: order.id, status: order.status });
    } else {
      callback({ code: grpc.status.NOT_FOUND, message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    callback({ code: grpc.status.INTERNAL, message: "Failed to fetch order status" });
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
