const express = require('express');
// const bcrypt = require('bcryptjs');
const cors = require('cors');


const UsersRouter = require('./users/users_router.js');

const server = express();

server.use(express.json());
server.use('/api/users', UsersRouter)

module.exports = server;