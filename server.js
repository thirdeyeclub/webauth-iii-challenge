const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const Auth = require('../auth/auth');
const Users = require('../users/user');
const sessionConfig = require('../auth/session-config.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', auth);
server.use('/api/users', users);

module.exports = server;
