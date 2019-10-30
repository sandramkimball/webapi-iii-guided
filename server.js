const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan'); //for logging(?)

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//tres amigos
function logger(req, res, next){
  console.log(`My Logging Func:[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

function dateLogger(req, res, next){
  console.log(new Date().toISOString());

  next();
}

function gateKeeper(req, res, next){
  const password = req.headers.password || '';
  //NEW WAY TO READ CLIENT'S DATA!!!
  //data comes in body, url params, query string, headers
  //Password not put/post (for body only) but in header(get) because it's more secure.

  if(password === null){
    res.status(400).json({message: 'Password required to enter.'})
  } else if (password.toLowerCase() === 'melon'){
    next()
  } else {
    res.status().json({you: 'Gate still locked.'})
  }
}

//global middleware
server.use(gateKeeper);//custome
server.use(helmet());//third party
server.use(express.json());//built in
server.use(logger)//custom middleware
server.use(dateLogger)//custom middleware
server.use(morgan('dev'));//third party

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Carnival of Hubs API</h2>
    <p>Welcome, ${nameInsert}, to the FreakShow</p>
    `);
});

module.exports = server;
