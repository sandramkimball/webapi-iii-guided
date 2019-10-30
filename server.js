const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//tres amigos
function dateLogger(req, res, next){
  console.log(new Date().toISOString());

  next();
}

function visitedLogger(req, res, next){
  console.log(`GET/${}`);

  next();
}

//global middleware
server.use(helmet());//third party
server.use(express.json());//built in
server.use(dateLogger)//custom middleware
server.use(visitedLogger)//custom middleware

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Cici's Hubs API</p>
    `);
});

module.exports = server;
