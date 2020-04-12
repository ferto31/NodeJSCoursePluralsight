const http = require('http');

const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(res);
  console.dir(req,{depth:0});
  console.dir(req,{depth:0});
  res.end('Hello World\n');
});

server.listen(4242, () => {
  console.log('Server is running...');
});


// node doesnt reload automatically the changes, but we can install nodemon to do it. ONLY FOR DEVELOPMENT NOT FOR PRODUCTION
// npm i -g nodemon 

// and we have to run it by nodemon instead of node
// nodemon 1-hello-world.js 