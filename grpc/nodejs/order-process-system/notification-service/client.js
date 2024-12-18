const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load .proto files
const notificationProtoPath = path.resolve(__dirname, '../proto/notification.proto');
const notificationProto = grpc.loadPackageDefinition(protoLoader.loadSync(notificationProtoPath)).notification;

// Create a client
const client = new notificationProto.NotificationService('127.0.0.1:50054', grpc.credentials.createInsecure());

// Test SendNotification
client.SendNotification({ order_id: 'order-123', message: 'Your order is ready for pickup!' }, (err, response) => {
  if (err) return console.error('SendNotification Error:', err);
  console.log('SendNotification Response:', response);
});
