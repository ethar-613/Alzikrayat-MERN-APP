/**
 * this file is to verify the user id before let them access to specific route in the application
*/

const mongoose = require('mongoose');
const User = require('../models/User');

// this function 
// parameters;  req it have the request data that came from the user
//              res useing it to send response to the user
//              next allow the navigate to the next middleware or controller
// used async func cuz needed here to search for user on the database and it will take time
// 
const requireUser = async(req, res, next) => {
    try{
        const userID = req.header('x-user-id');

        if (!userID || !mongoose.isValidObjectId(userID)){
            return res.status(401).json({message: 'Login required to do this'});
        }
        
        const user = await User.findById(userID);
        if(!user){
            return res.status(401).json({message: 'Login required to do this'});
        }

        req.user = user;

        next();

    } catch(err){
        console.error('requiredUser error:' , err.message);
        res.status(500).json({message: 'Server Error'});
    }
};


module.exports = requireUser;

