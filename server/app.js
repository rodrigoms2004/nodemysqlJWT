require('dotenv-safe').config();

const express = require('express');
const app = express();         
const bodyParser = require('body-parser');

// middleware for db
const pool = require('./db/pool-factory');
const connectionMiddleware = require('./middleware/connection-middleware');

// configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// middleware, used to show where user is going...
app.use( (req, res, next) => {
      // don't work under npm test
  if(process.env.NODE_ENV !== "test") {
    console.log('I was here: ', req.url)
  }
  next()
})

// calling db middleware
app.use(connectionMiddleware(pool));

// routes
app.use(require('./routes'))  // routes/index.js

// middleware to deal with 404 error
app.use((req, res, next) => {
    let err = {
      message: 'route does not exist',
      status: 404
    }
    //let err = new Error('route does not exist');
    //err.status(404);
    next(err);  // send error to next middleware
  });
  
  // receives error from last middleware
  app.use((err, req, res, next) => {
    // if error 404, sends back message 'route does not exist'
    // otherwise it sends Murphy's message
    console.log(err.status);
    res.status(err.status || 500).send(err.message || `Don't force it; get a larger hammer.`);
  });
  
  // if use {app} get error in /server/bin/www.js
  module.exports = app;


// definindo rotas 
// const router = express.Router()
// router.get('/', (req, res) => res.json({ message: 'Funcionando!' }))
// app.use('/', router)

