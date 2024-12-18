const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load .proto files
const inventoryProtoPath = path.resolve(__dirname, '../proto/inventory.proto');
const inventoryProto = grpc.loadPackageDefinition(protoLoader.loadSync(inventoryProtoPath)).inventory;

// Create a client
const client = new inventoryProto.InventoryService('127.0.0.1:50052', grpc.credentials.createInsecure());

// Test CheckAvailability
client.CheckAvailability({ item: 'item1' }, (err, response) => {
  if (err) return console.error('CheckAvailability Error:', err);
  console.log('CheckAvailability Response:', response);
});
