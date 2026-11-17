/**
 * this file responisple for controlling authentication process, the Login and Register
 * and Prepare user data that can be sent to the front end without the password
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// this function use to convert the user data into general data that can be sent to the frontend
// need it cuz the user data contains the password, and we don’t want to send it to the frontend
// parameter "user" is object containing the user data retrieved from the database
// Returns object containing: user ID, first name, last name, email, location, description, and occupation. does not contain the password
const toPublicUser = (user)=>({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    description: user.description,
    occupation: user.occupation,
});

// this function creates the JWT for a user after register or login
// the payload contains only the user id (never put the password inside the token)
// the token is signed with JWT_SECRET from .env and expires after JWT_EXPIRES_IN (default 1 day)
// parameter "user" is the user document from the database
// Returns the signed token string
const signToken = (user) =>
    jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });

// this function responsiple for the registeration for users [creating new account]
// create new user after encrypting the password and checking if no user registered by this email before
// if there document with that email then stop execution and send error message 
// but if everything worked fine then sending successful response state to frontend with the general user data
// if anything happened wrong then will catched in catch and display error in console and send server error message with its status
// parameters;  req it have the request data that came from the user
//              res useing it to send response to the user
//              next allow the navigate to the next middleware or controller
// returns ; Do not return value directly, 
//           it send an HTTP response to the user: 201 Account created successfully. 409 Email already in use. 
//           If any other error occurs, it is passed to next(err)
const register = async (req, res, next) => {
    try{
        const {firstName, lastName, email, password, location, description, occupation} = req.body;

        // checking if the email is registed before 
        const existingEmail = await User.findOne({email: email.toLowerCase()});
        if(existingEmail){
            return res.status(409).json({errors:['Email already used']})
        }

        const rounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, rounds); //encrypt the password with 10 rounds using hashing

        const user = await User.create({firstName, lastName, email, password: hashedPassword, location, description, occupation});

        res.status(201).json({
                message: 'User registered Successfully',
                token: signToken(user),
                user: toPublicUser(user),
                });

    } catch(err){
        next(err);
    }
};
 

// function used for user login by email and password verification
// checks the email and password and return error of anything wrong and send the response status if it ok or not
// parameters;  req it have the request data that came from the user
//              res useing it to send response to the user
//              next allow the navigate to the next middleware or controller
// returns ; Do not return value directly, 
//            200: Login successful. 401: Invalid email or password. Other errors are passed to next(err)
const login = async(req, res, next)=>{
    try{
        const{email, password} = req.body;
        const user = await User.findOne({email: email.toLowerCase()});

        if(!user){
            return res.status(401).json({errors: ['invalid email or password']});
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).json({errors: ['invalid email or password']});
        }
        res.status(200).json({
                    message: 'Login Successfully',
                    token: signToken(user),
                    user: toPublicUser(user),
                    });
    }catch(err){
        next(err);
    }
}




// export functions to use it outside this file
// function that returns the current logged in user, the route is protected by requireAuth
// the client uses it when the app starts to check that the stored token is still valid
const getMe = (req, res) => {
    res.status(200).json({ user: toPublicUser(req.user) });
};

module.exports = {register, toPublicUser, login, getMe};
