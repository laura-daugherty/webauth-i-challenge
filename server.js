const express = require('express');
// const bcrypt = require('bcryptjs');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session) //pass the session so knexSessionStore knows what session 

const UsersRouter = require('./users/users_router.js');
const knexConnection = require('./data/db-config')

const server = express();

const sessionOptions = {
  name: 'cookiecookie',
  secret: process.env.COOKIE_SECRET || 'keep it secret', //for encryption?
  cookie: {
    secure: false, //do we want to send over only secure HTTPS? (false only for dev)
    maxAge: 1000*60*60, //how long session is good for
    httpOnly: true,// client JS has no access to the cookie - Cannnot be accessed with javascript

  },
  resave: false, //
  saveUninitialized: true, //needs to be set to current GDPR regs - it's a thing?
  store: new knexSessionStore({//we are saving the session to the DB => DB is defined through dbConfig via knexConnection
    knex: knexConnection,
    createTable: true, //if there is no table, it will create one
    clearInterval: 1000*60*60, //how long before we clear out the session in milliseconds
  })
}


server.use(express.json());
server.use(cors())
server.use(session(sessionOptions))

server.use('/api/users', UsersRouter)

server.get('/', (req, res) => {
  res.json({ api: 'up', session: req.session })
});

module.exports = server;