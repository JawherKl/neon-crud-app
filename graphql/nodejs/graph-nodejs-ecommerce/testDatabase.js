const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connect = async () => {
  if (mongoose.connection.readyState === 0) {  // Check if no connection is active
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB in-memory server connected...');
  } else {
    console.log('Already connected to MongoDB');
  }
};

const close = async () => {
  if (mongoose.connection.readyState !== 0) {  // Check if a connection is active
    await mongoose.disconnect();
    console.log('MongoDB in-memory server disconnected...');
  }
};

// module.exports = { connect, close };
module.exports = { connect, close };
