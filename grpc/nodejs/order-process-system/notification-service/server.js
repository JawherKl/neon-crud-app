const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { default: wrapServerWithReflection } = require('grpc-node-server-reflection');

// Load .proto files
const PROTO_PATH = path.join(__dirname, '../proto/notification.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

// Mock data storage for notifications
const notifications = {};

// Service implementation
const sendNotification = (call, callback) => {
  const { order_id, message } = call.request;

  if (!order_id || !message) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "order_id and message are required fields.",
    });
  }

  // Simulate storing the notification
  notifications[order_id] = { message, timestamp: Date.now() };

  console.log(`Notification sent for order_id: ${order_id}, message: ${message}`);
  callback(null, { success: true });
};

// Create a new gRPC server
const server = wrapServerWithReflection(new grpc.Server());

// Add services
server.addService(notificationProto.NotificationService.service, {
  SendNotification: sendNotification
});


// Start the server
const PORT = 50053;
server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error("Failed to start server:", err);
    return;
  }
  console.log(`Notification gRPC server running on port ${port}`);
  server.start();
});