//imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Auth = require('../auth/auth');
const Users = require('../users/users');
//required to make it all work
const server = express();
//middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
//routes
server.use('/', Auth);
server.use('/', Users);
//exports
module.exports = server;
