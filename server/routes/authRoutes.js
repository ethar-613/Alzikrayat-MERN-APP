/**
 * this file responsible for define authentication routes, like login, register, logout
 * so it receive requests and routes them to the appropriate controller function
*/

const express = require('express');
const {register , login, getMe} = require('../controllers/authController');
const requireAuth = require('../middleware/auth');
const {validate, registerSchema, loginSchema} = require('../middleware/validation');

// creating new Router useing express
const router = express.Router();
// creating route that accept post requests at /register, 
// then check the validate of the data in the request, if it valid then coninue to the register function on authController
router.post('/register', validate(registerSchema), register);
// route for login
router.post('/login', validate(loginSchema), login);
// route to get the current user from the token (protected)
router.get('/me', requireAuth, getMe);


// export router to use it on server.js
module.exports = router;
