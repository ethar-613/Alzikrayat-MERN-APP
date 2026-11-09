/**
 * this file is to validate the data came from user to server before it reaches the controller
*/

const Joi = require('joi');
const fs = require('fs');

// creating the validation schema for register
const registerSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'first name can not be less than 2 characters',
        'string.max': 'first name can not be more than 50 characters',
    }),
    lastName: Joi.string().trim().min(2).max(50).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'last name can not be less than 2 characters',
        'string.max': 'last name can not be more than 50 characters',
    }),
    email: Joi.string().trim().email({tlds:{allow: false}}).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter valid email address',
    }) , 
    password: Joi.string().min(6).max(100).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'string.max': 'password can not be more than 100 characters'
    }) , 
    location: Joi.string().trim().allow('').optional(),
    description: Joi.string().trim().allow('').optional() , 
    occupation: Joi.string().trim().allow('').optional() 
});

// creating the validation schema for login
const loginSchema = Joi.object({
    email: Joi.string().trim().email({tlds:{allow: false}}).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter valid email address',
    }) ,
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }) 
});


const photoSchema = Joi.object({
    title: Joi.string().trim().max(200).required(),
    description: Joi.string().trim().max(1000).allow('') ,
});



// creating middleware to check the validation of the data
// its the function that the requests pass on it before it reach the controller
// put it on var so i can use it with more than one schema to use the same middleware for validate the data
// parameters; schema is the schema that use teh middleware,
//              req it have the request data that came from the user
//              res useing it to send response to the user
//              next allow the navigate to the next middleware or controller
// Returns funcion checks the req.body
// if there any data was invalid then the function return error message conatin all the problems on teh request and stop the middleware
// if no errors replace the request data with the data that Joi returned after validation so controller get the cleaned data
// and then validate was successful then go to next step /controller
const validate = (schema) => (req, res, next) => {
    const {error, value} = schema.validate(req.body, {abortEarly: false});//abortEarly use to let Joi coninue checking and collect all errors
    if(error){
        if(req.file) fs.unlink(req.file.path , ()=>{});
        next(error);
    }
    req.body = value; 
    next();
};

// exporting the function and schema
module.exports = {validate, registerSchema, loginSchema , photoSchema};