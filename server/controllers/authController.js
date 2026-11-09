/**
 * this file responisple for controlling authentication process, the Login and Register
*/

const bcrypt = require('bcrypt');
const User = require('../models/User');

// this function use to convert the user data into general data that can be sent to the frontend
// so it doesnot have password
const toPublicUser = (user)=>({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    description: user.description,
    occupation: user.occupation,
});

// this function responsiple for the registeration for users
// create new user after encrypting the password and checking if no user registered by this email before
// if there document with that email then stop execution and send error message 
// but if everything worked fine then sending successful response state to frontend with the general user data
// if anything happened wrong then will catched in catch{} and display error in console and send server error message with its status
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

        res.status(201).json({message: 'User registered Successfully' }, toPublicUser(user)); 

    } catch(err){
        next(err);
    }
};


// function used for user login
// checks the email and password and return error of anything wrong and send the response status if it ok or not
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
        res.status(200).json({message: 'Login Successfully'}, toPublicUser(user));
    }catch(err){
        next(err);
    }
}




// export functions to use it outside this file
module.exports = {register, toPublicUser, login};
