const express = require("express")
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors')

const carsRouter= require('./cars/cars-router')

const server = express()
server.use(logger('dev'));

server.use(express.json());
server.use(helmet());
server.use(cors()) // cors() returns a (req, res, nex) => { // stuff and then next() }

server.use('/api/accounts', carsRouter)

server.get('/', (req, res) => {
    res.send('Hello, I am doing db1')
  })

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = server;
