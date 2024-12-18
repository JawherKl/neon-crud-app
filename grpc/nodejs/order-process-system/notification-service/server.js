const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load .proto files
const notificationProtoPath = path.resolve(__dirname, '../proto/notification.proto');
const notificationProto = grpc.loadPackageDefinition(protoLoader.loadSync(notificationProtoPath)).notification;

const sendNotification = (call, callback) => {
  console.log(`Sending notification for order ${call.request.order_id}: ${call.request.message}`);
  callback(null, { success: true });
};

// Start the server
const server = new grpc.Server();
server.addService(notificationProto.NotificationService.service, { SendNotification: sendNotification });
server.bindAsync('127.0.0.1:50054', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Notification Service running at 127.0.0.1:50054');
  server.start();
});
