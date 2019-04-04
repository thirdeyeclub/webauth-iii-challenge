//imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const Auth = require('../auth/auth');
const Users = require('../users/user');
const sessionConfig = require('../auth/session-config.js');
//required to make it all work
const server = express();
//middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
//routes
server.use('/', Auth);
server.use('/', Users);
//exports
module.exports = server;
