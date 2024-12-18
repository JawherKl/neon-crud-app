const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { default: wrapServerWithReflection } = require('grpc-node-server-reflection');

// Load .proto files
const inventoryProtoPath = path.resolve(__dirname, '../proto/inventory.proto');
const inventoryProto = grpc.loadPackageDefinition(protoLoader.loadSync(inventoryProtoPath)).inventory;

// Mock inventory data
const inventory = {
  'item1': { available: true, quantity: 10 },
  'item2': { available: false, quantity: 0 }
};

const checkAvailability = (call, callback) => {
  const item = inventory[call.request.item];
  if (item) {
    callback(null, { available: item.available, quantity: item.quantity });
  } else {
    callback({ code: grpc.status.NOT_FOUND, details: "Item not found" });
  }
};

// Start the server
const server = wrapServerWithReflection(new grpc.Server());
server.addService(inventoryProto.InventoryService.service, { CheckAvailability: checkAvailability });
server.bindAsync('127.0.0.1:50052', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Inventory Service running at 127.0.0.1:50052');
  server.start();
});
