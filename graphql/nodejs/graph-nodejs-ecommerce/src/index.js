const server = require('./server');

server.listen(4000).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
