const CubejsServer = require('@cubejs-backend/server');

const logger = (msg, params) => {
  const { error, ...restParams } = params;
  if (process.env.NODE_ENV !== 'production') {
    console.log(msg);
    //console.log(`${msg}: ${JSON.stringify(restParams)}${error ? `\n${error}` : ''}`);
  } else {
    console.log(msg);
    //console.log(JSON.stringify({ message: msg, ...params }));
  }
};

const server = new CubejsServer({logger: logger});

server.listen().then(({ port }) => {
  console.log(`🚀 Cube.js server is listening on ${port}`);
});
