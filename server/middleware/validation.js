/**
 * this file is to validate the data came from user to server before it reaches the controller
*/

const Joi = require('joi');

// creating the validation schema for register
const registerSchema = Joi.object({
    firstName: Joi.string().trim().max(50).required(),
    lastName: Joi.string().trim().max(50).required(),
    email: Joi.string().trim().email({tlds:{allow: false}}).required() , 
    password: Joi.string().min(6).max(100).required() , 
    location: Joi.string().trim().allow(''),
    description: Joi.string().trim().allow('') , 
    occupation: Joi.string().trim().allow('') 
});

// creating the validation schema for login
const loginSchema = Joi.object({
    email: Joi.string().trim().email({tlds:{allow: false}}).required() ,
    password: Joi.string().required() 
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
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.details.map((d)=> d.message),
        });
    }
    req.body = value; 
    next();
};

// exporting the function and schema
module.exports = {validate, registerSchema, loginSchema};