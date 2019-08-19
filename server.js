const express = require('express');
const bcrypt = require('bcryptjs')

const UsersRouter = require('./users/users_router.js');

const server = express();

server.use(express.json());
server.use('/api/users', UsersRouter)

module.exports = server;