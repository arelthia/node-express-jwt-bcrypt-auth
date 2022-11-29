// require('dotenv').config();
const express = require('express');
const route = express.Router();


const {addUser, loginUser } = require('../controller/users_controller');

route.post('/register', addUser )

route.post('/login', loginUser );

module.exports = route;